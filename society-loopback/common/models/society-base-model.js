/**
 * Created by Deepak.Pundir on 3/26/2016.
 */
module.exports = function(SocietyBaseModel) {
    var _ = require('lodash');

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
