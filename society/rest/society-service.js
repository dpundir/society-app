/**
 * Created by Deepak.Pundir on 11/14/2015.
 */

var db = require('mysql');
var restService = require('./rest-service');

module.exports.fetchMemberData = function (req, res) {
  var id = req.params.id;
  var filter = {};
  if(id){
    filter.mid = parseInt(id, 10);
  }
  restService.fetchEntityData('member_address_view', '*', filter, {mid: 'desc'}, res);
};

module.exports.fetchEntityData = function (req, res) {
  var id = req.params.id;
  var entity = req.params.entity;
  var filter = {};
  if(id){
    filter.id = parseInt(id, 10);
  }
  restService.fetchEntityData(entity, '*', filter, {id: 'desc'}, res);
};

module.exports.createEntityData = function (req, res) {
  var data = req.body;
  restService.createEntityData('member', data, res);
};

module.exports.createMemberData = function (req, res) {
  var data = req.body;
  restService.createEntityData('address', data.address, function(resultData){
    data.addressid = resultData.id;
    delete data.address;
    restService.createEntityData('member', data, res);
  });
};

module.exports.updateEntityData = function (req, res) {
  var id = req.params.id;
  var data = req.body;
  var filter = {};
  if(id){
    filter.id = parseInt(id, 10);
  }
  restService.updateEntityData('member', data, filter, res);
};

module.exports.updateMemberData = function (req, res) {
  var id = req.params.id;
  var data = req.body;
  var filter = {};
  if(id){
    filter.id = parseInt(id, 10);
  }
  restService.updateEntityData('address', data.address, filter, function(count){
    data.addressid = data.address.id;
    delete data.address;
    restService.updateEntityData('member', data, filter, res);
  });
};