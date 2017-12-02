'use strict';


/**
 * Returns a list of all burgers.
 *
 * no response value expected for this operation
 **/
exports.allGET = function() {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * deletes a particular burgerid
 *
 * id Integer Numeric ID of the burger to get.
 * no response value expected for this operation
 **/
exports.deleteIdDELETE = function(id) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Updates burgers to is_eaten to true in the database
 * Page reloads automagically with jquery from html page,
 *
 * id Integer Numeric ID of the burger to update.
 * no response value expected for this operation
 **/
exports.eatburgerIdPUT = function(id) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Returns a list of all burgers that have been 'eaten'
 *
 * no response value expected for this operation
 **/
exports.eatenGET = function() {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * gets a particular burgerid
 *
 * id Integer Numeric ID of the burger to get.
 * no response value expected for this operation
 **/
exports.idGET = function(id) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Returns a list of all burgers that have been not been 'eaten'
 *
 * no response value expected for this operation
 **/
exports.noteatenGET = function() {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Renders the home page with handlebars
 * pulls all the burgers from the DB and displays them
 *
 * no response value expected for this operation
 **/
exports.rootGET = function() {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Creates a new burger from the form
 * re-renders the home page with new data after a successful post
 *
 * no response value expected for this operation
 **/
exports.rootPOST = function() {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}

