/**
 * Ablage+ - 1.Versuch :)
 */

/*jshint esversion: 6 */

const http = require('http');
const fs = require('fs');
const mysql = require('mysql');
const express = require('express');

const app = express();
app.use(express.static(__dirname));

// create db connection
const db = mysql.createConnection({
	host	:	'localhost',
	user	:	'admin',
	password:	'test',
	database:	'test'
});

// connect to db
db.connect((err) => {
	if(err){
		throw err;
	}
	console.log('MySQL connected...');
});

app.get('/ajaxcall', function(req, res){
	var data = {};
	let sql = `SELECT name, vorname FROM test WHERE ID = '${req.query.id}'`;
	let query = db.query(sql, (err, result) => {
		if(err){
			throw err;
		}
		res.send(result);
	});

});

app.listen('3000', (err) => {
	console.log('Server started on port 3000');
});

