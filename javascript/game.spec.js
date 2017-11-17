const Game = require('./game.js');
const gameRunner = require('./game-runner');

const expect = require('chai').expect;
const approvals = require('approvals');
approvals.mocha();
const _ = require('lodash');
const {getRandom} = require('./rands');

describe("The test environment", function () {
    it("should pass", function () {

        const loggedLines = [];
        const oldLog = console.log;
        console.log = function (arg) {
            loggedLines.push(arg);
        }

        _.range(15).forEach(() => {
            gameRunner(getRandom)
        });

        console.log = oldLog;

        this.verifyAsJSON(loggedLines)

    });

});
