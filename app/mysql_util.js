"use strict";

var mysql = require('mysql');
var _ = require('underscore');

var connection = mysql.createConnection({
    host     : '192.168.3.174',
    user     : 'newtaxi',
    password : 'pNPDYLCRjcFwxnG',
    port : '36360',
    database : 'newtaxi'
});


connection.connect();

var map={};
var show = function(){
    for(var property in map){
        if(map.hasOwnProperty(property)){
            console.log(property + "-->["+map[property]+"]");
        }
    }
}

connection.query('SELECT privId, parentId  from Mgr_Privilege', function(err, rows, fields) {
    if (err) throw err;
    rows.forEach(function(a,index){
//        console.log(a);
        if(!a.parentId){
            map[a.privId] = [];
        }else{

            if(!map[a.parentId]){
                var parent = getParentMap(map, a.parentId);
                if(parent === null){
                    map[a.parentId] = [];
                }else{
                    parent.push(a.privId);
                }
            }else{
                map[a.parentId].push(a.privId);
            }
        }
    });


    console.log('done');
    show()
});

function getParentMap(map,id){
    for(var property in map){
        if(map.hasOwnProperty(property)){
            if(_.contains(map[property],id)){
                return map[property];
            }
        }
    }
    return null;
}
connection.end();
