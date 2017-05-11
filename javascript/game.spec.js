"use strict"

var Game = require('./game.js');
var gameRunner = require('./game-runner')

var expect = require('chai').expect;
var approvals = require('approvals')
approvals.mocha()
let _ = require('lodash')
describe("The test environment", function () {
    it("should pass", function () {

        var loggedLines = []
        var oldLog = console.log
        console.log = function (arg) {
            loggedLines.push(arg);
        }
        let randomInt = function (maxInt) {
            return maxInt;
        }

        _.range(10).forEach((runIndex) => {
            gameRunner(randomInt)

        })

        console.log = oldLog

        this.verifyAsJSON(loggedLines)

    });

});
