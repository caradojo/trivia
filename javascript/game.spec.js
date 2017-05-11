var Game = require('./game.js');
var gameRunner = require('./game-runner')

var expect = require('chai').expect;
var approvals = require('approvals')
approvals.mocha()

describe("The test environment", function () {
    it("should pass", function () {

        var loggedLines = []
        var oldLog = console.log
        console.log = function (arg) {
            loggedLines.push(arg);
        }
        console.log("slkjfsljfd")
        console.log("aaaaaaaslkjfsljfd")
        console.log = oldLog
        this.verifyAsJSON(loggedLines)
        // expect(loggedLines).to.equal("slkjfsljd")
    });

});
