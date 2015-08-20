/*global describe, before, it*/
'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var config = require(path.join(__dirname, '../utils/config.js'));

describe('m:controller', function () {

  describe('some', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../controller'))
        .withArguments('some')
        .on('end', done);
    });

    it('file path, module name, controller signature', function () {
      var filePath = 'app/' + config.DEFAULT_MODULE + '/controllers/some-ctrl.js';
      assert.fileContent([
        [filePath, 'angular.module(\'' + config.DEFAULT_MODULE + '\')'],
        [filePath, 'controller(\'SomeCtrl\', function ($log) {']
      ]);
    });
  });

  describe('someCtrl myModule', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../controller'))
        .withArguments('someCtrl myModule')
        .on('end', done);
    });

    it('file path, module name', function () {
      var filePath = 'app/my-module/controllers/some-ctrl.js';
      assert.fileContent([
        [filePath, 'angular.module(\'myModule\')']
      ]);
    });
  });

  describe('someCtrl --template=debug', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../controller'))
        .withArguments('someCtrl')
        .withOptions({ template: 'debug' })
        .on('end', done);
    });

    it('file path, controller signature, debug logic & placeholders', function () {
      var filePath = 'app/main/controllers/some-ctrl.js';
      assert.fileContent([
        [filePath, '$log, Main, Config'],
        [filePath, 'this.someData = Main.'],
        [filePath, 'this.ENV = Config.ENV'],
        [filePath, 'this.BUILD = Config.BUILD'],
        [filePath, 'this.grade = ']
      ]);
    });
  });

  describe('someCtrl myModule --template=debug', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../controller'))
        .withArguments('someCtrl myModule')
        .withOptions({ template: 'debug' })
        .on('end', done);
    });

    it('file path, controller signature, debug logic & placeholders', function () {
      var filePath = 'app/my-module/controllers/some-ctrl.js';
      assert.fileContent([
        [filePath, '$log, MyModule, MyModuleConfig'],
        [filePath, 'this.someData = MyModule.'],
        [filePath, 'this.ENV = MyModuleConfig.ENV'],
        [filePath, 'this.BUILD = MyModuleConfig.BUILD'],
        [filePath, 'this.grade = ']
      ]);
    });
  });
});
