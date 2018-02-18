/**
 * Ablage+ - 1.Versuch :)
 */

/*jshint esversion: 6 */

const http = require('http');
const fs = require('fs');
const mysql = require('mysql');
const express = require('express');

const hostname = '127.0.0.1';
const port = 3000;

// create db connection
const db = mysql.createConnection({
	host	:	'localhost',
	user	:	'admin',
	password:	'test',
	database:	'muwi'
});

// connect to db
db.connect((err) => {
	if(err){
		throw err;
	}
	console.log('MySQL connected...');
});

const app = express();

// SQL creaste db
/*
app.get('/createdb', (req, res) => {
	let sql = 'CREATE DATABASE hatgeklappt';
	db.query(sql, (err, result) => {
		if(err){
			throw err;
		}
		console.log(result);
		res.send('database created...');
	});
});
*/

// SQL create table
/*
app.get('/createtable', (req, res) => {
	let sql = 'CREATE TABLE neu(id AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY(id))';
	db.query(sql, (err, result) => {
		if(err){
			throw err;
		}
		console.log(result);
		res.send('table created...');
	});
});
*/

// SQL inserts
app.get('/', (req, res) => {
	let data = {Name:'Rosinski', Vorname:'Ricardo'};
	let sql = 'INSERT INTO test SET ?';
	let query = db.query(sql, data, (err, result) => {
		if(err){
			throw err;
		}
		console.log(result);
		res.send('line inserted...');
	});
});



app.listen('3000', () => {
	console.log('Server started on port 3000');
})



// start server
/*
fs.readFile('index.html', (err, html) => {
	if(err){
		throw err;
	}
	
	const server = http.createServer((req, res) => {
		res.statusCode = 200;
		res.setHeader('Content-type', 'text/html');
		res.write(html);
		res.end();
	});
	
	server.listen(port, hostname, () => {
		console.log('Server started on port '+port);
	});
});
*/


