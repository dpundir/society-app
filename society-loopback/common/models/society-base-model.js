/**
 * Created by Deepak.Pundir on 3/26/2016.
 */
module.exports = function(SocietyBaseModel, app) {
    var _ = require('lodash');
    var oldModelInstance, auditMessage;

    SocietyBaseModel.observe('before save', function filterProperties(ctx, next) {
        var isAuditable = ctx.Model.settings.auditable;
        if(isAuditable && !_.get(ctx, 'options.transaction.id')) {
            auditMessage = ctx.data.audit;
            delete ctx.data.audit;
            var filter = {where: ctx.where};
            ctx.Model.findOne(filter, function (err, data) {
                if (err) {
                    oldModelInstance = {};
                }
                oldModelInstance = data.__data;
                next();
            });
        } else{
            next();
        }
    });

    SocietyBaseModel.observe('after save', function filterProperties(ctx, next) {
        var isAuditable = ctx.Model.settings.auditable;
        if(isAuditable && !_.get(ctx, 'options.transaction.id')) {
            var newModelInstance = ctx.instance;
            var newValue = _.omit(newModelInstance.__data, function (v, k) {
                return oldModelInstance && oldModelInstance[k] === v;
            });
            var oldValue = _.omit(oldModelInstance, function (v, k) {
                return newModelInstance.__data[k] === v;
            });
            newValue = _.omit(newValue, function (v, k) {
                return k.includes('Date') || k.includes('date');
            });
            oldValue = _.omit(oldValue, function (v, k) {
                return k.includes('Date') || k.includes('date');
            });
            var entityName = _.snakeCase(ctx.Model.modelName);
			ctx.Model.app.models.Entity.findOne({where: {entityName: entityName}}, function (err, data) {
				if (err) {
                    next();
                } else {
                    var auditData = {
                        id: '',
                        oldValue: JSON.stringify(oldValue),
                        newValue: JSON.stringify(newValue),
                        entityId: data.entityId,
                        contextId: ctx.instance.id,
                        fieldName: _.keys(newValue).join(','),
                        createDate: new Date(),
                        description: auditMessage
                    }
                    ctx.Model.app.models.Audit.create(auditData, function (err, data) {
                        next();
                    });
                }
            });
        } else{
            next();
        }
    });

    SocietyBaseModel.totalByField = function(where, field, cb) {
        var SocietyBaseModel = this;
        SocietyBaseModel.find(where, function (err, data) {
            if (err) {
                cb(err, null);
            }
            var total = _.sum(data, function(obj){
                return obj[field.name];
            });
            cb(null, total);
        });
    };

    SocietyBaseModel.setup = function(){
        SocietyBaseModel.base.setup.call(this);
        var SocietyBase = this;

        SocietyBase.remoteMethod('totalByField', {
            description: 'Total sum of the model matched by where from the data source based on passed field.',
            accepts: [
                {arg: 'where', type: 'object', description: 'Criteria to match model instances'},
                {arg: 'field', type: 'object', description: 'Field on which aggregate function apply on match model instances'}
            ],
            returns: {arg: 'total', type: 'number'},
            http: {verb: 'get', path: '/total'}
        });

        return SocietyBase;
    };

    SocietyBaseModel.setup();
};
