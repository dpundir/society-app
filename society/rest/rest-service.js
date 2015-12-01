/**
 * Created by Deepak.Pundir on 11/14/2015.
 */

var db = require('mysql');
var mysqlUtilities = require('mysql-utilities');
var databaseConfiguration = require('./database-configuration');

var pool = db.createPool(databaseConfiguration);

var fetchData = function (table, fields, where, order, res) {

  pool.getConnection(function(err, connection) {
    mysqlUtilities.upgrade(connection);
    mysqlUtilities.introspection(connection);
    connection.select(table, fields, where, order, function (err, rows, fields) {
      connection.release();
      if (err) throw err;
      if(typeof(res) == 'function'){
        res(rows);
      } else {
        res.send(rows);
      }
    });
  });
};

var createData = function (table, data, res) {
  pool.getConnection(function(err, connection) {
    mysqlUtilities.upgrade(connection);
    mysqlUtilities.introspection(connection);
    connection.insert(table, data, function (err, recordId) {
      connection.release();
      if (err) throw err;
      if(typeof(res) == 'function'){
        res({id: recordId});
      } else {
        res.send({id: recordId});
      }
    });
  });
};

var updateData = function (table, data, where, res) {
  pool.getConnection(function(err, connection) {
    mysqlUtilities.upgrade(connection);
    mysqlUtilities.introspection(connection);
    connection.update(table, data, where, function (err, affectedRows) {
      connection.release();
      if (err) throw err;
      if(typeof(res) == 'function'){
        res({count:affectedRows});
      } else {
        res.send({count:affectedRows});
      }
    });
  });
};

var fetchEntityData = function (entity, fields, filter, sort, res) {
  fetchData(entity, fields, filter, sort, res);
};

var createEntityData = function (entity, data, res) {
  createData(entity, data, res);
};

var updateEntityData = function (entity, data, filter, res) {
  updateData(entity, data, filter, res);
};

var login = function (req, res) {

};

var logout = function (req, res) {

};

module.exports ={
  login: login,
  logout: logout,
  fetchEntityData: fetchEntityData,
  createEntityData: createEntityData,
  updateEntityData: updateEntityData
};