/**
 * Created by Deepak.Pundir on 12/6/2015.
 */
var server = require('./server');
var ds = server.dataSources['mysql-ds'];
var lbTables1 = ['Member', 'Address', 'Loan', 'M2mMemberLoan', 'MemberAddressView', 'MemberDeposit',
  'SocietyConfig', 'SocietyExpense', 'TransactionHistory'];
var lbTables2 = ['User', 'AccessToken', 'ACL', 'RoleMapping', 'Role'];
var lbTables = ['user', 'MemberNominee'];
ds.autoupdate(lbTables, function(er) {
  if (er) throw er;
  console.log('Looback tables [' + lbTables + '] created in ', ds.adapter.name);
  ds.disconnect();
});