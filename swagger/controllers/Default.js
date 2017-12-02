'use strict';

var utils = require('../utils/writer.js');
var Default = require('../service/DefaultService');

module.exports.allGET = function allGET (req, res, next) {
  Default.allGET()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteIdDELETE = function deleteIdDELETE (req, res, next) {
  var id = req.swagger.params['id'].value;
  Default.deleteIdDELETE(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.eatburgerIdPUT = function eatburgerIdPUT (req, res, next) {
  var id = req.swagger.params['id'].value;
  Default.eatburgerIdPUT(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.eatenGET = function eatenGET (req, res, next) {
  Default.eatenGET()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.idGET = function idGET (req, res, next) {
  var id = req.swagger.params['id'].value;
  Default.idGET(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.noteatenGET = function noteatenGET (req, res, next) {
  Default.noteatenGET()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.rootGET = function rootGET (req, res, next) {
  Default.rootGET()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.rootPOST = function rootPOST (req, res, next) {
  Default.rootPOST()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
