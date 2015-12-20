/**
 * Created by Deepak.Pundir on 12/6/2015.
 */
var server = require('./server');
var ds = server.dataSources['mysql-ds'];
var lbTables = ['Member', 'Address', 'Loan', 'M2mMemberLoan', 'MemberAddressView', 'MemberDeposit',
  'SocietyConfig', 'SocietyExpense', 'TransactionHistory'];
ds.autoupdate(lbTables, function(er) {
  if (er) throw er;
  console.log('Looback tables [' + lbTables + '] created in ', ds.adapter.name);
  ds.disconnect();
});