"use strict";
var app = angular.module("abc",[]);

app.controller('ctl',function($scope){

    $scope.data={message:"Hello world!"};

    $scope.reverseMessage = function(message){
        return message.split("").reverse().join("");
    }
});
