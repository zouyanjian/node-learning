"use strict";

var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var favicon = require('serve-favicon');
var mongoose = require('mongoose');
var errorhandler = require('errorhandler')

var port = process.env.PORT = process.env.PORT || 3030
process.env.NODE_ENV='development';


var app = express();
if (process.env.NODE_ENV === 'development') {
    app.use(errorhandler())
}
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser());
app.use(favicon(__dirname + '/public/favicon.ico'))

mongoose.connect('mongodb://test:test@novus.modulusmongo.net:27017/yGir5obo');
var Bear = require(__dirname + '/app/models/bear');

var route = express.Router();

route.route("/bears")
    .get(function (req, res) {

        Bear.find(function (err, bears) {
            if (err) {
                res.send(err)
            }
            res.json(bears);
        });
    })
    .post(function (req, res) {
        var bear = new Bear();
        console.log(req.body)
        bear.name = req.body.name;
        bear.save(function (err) {
            if (err) res.send(err);
            res.json({message: "SUCCESS"});
        });
    });
/*
 Bear.get('/', function(req,res){
 res.json({message:"welcome"});
 });
 */
//curl -i -H "Accept: application/json" -H "Content-Type: application/json" -X POST -d '{"id":"IDVALUE","name":"Mike"}' "http://localhost:3030/api/bears"

app.use('/api', route);

app.listen(port);

console.log("listening on " + port);