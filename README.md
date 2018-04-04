# society-app
This application is for financial Societies which sum up money and lend money to its members. 

<h2>This application provides:</h2>
<li>interface to view member details
<li>interface to deposit on behalf of member
<li>interface to view member summary
<li>interface to view society deposits and expenditure

<h2>Developer Section:</h2>
This project is already created through expressjs
<li>goto "society" directory
<li>run "npm install"
<li>start application on windows run "set DEBUG=society:* & npm start"

<h2>Application-Database Integration:</h2>
<li>UI should call $http service on "localhost:3000"
<li>REST routes are defined in "/society/routes/users"
<li>routes should be "/rest/\<method\>/\<entity\>" like for "address" full path should be "http://localhost:3000/rest/get/address" 
<li>routes are generic
<br>"/rest/post/\<entity\>"
<br>"/rest/get/\<entity\>" and "/rest/get/\<entity\>/:id"
<br>"/rest/put/\<entity\>" and "/rest/put/\<entity\>/:id"

<h2>Database Section:</h2>
<li>database files are stored in "/society/database" path
<li>society-app.sql contains table/view definition and data