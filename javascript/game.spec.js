var Game = require('./game.js');
var expect = require('chai').expect;


describe("The test environment", function () {
    it("should pass", function () {

        var logged = ""
        var oldLog = console.log
        console.log = function (arg) {
            logged = arg;
        }
        console.log("slkjfsljfd")
        console.log = oldLog
        expect(logged).to.equal("slkjfsljd")
    });

});
