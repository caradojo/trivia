require('./game.js');

describe('The test environment', function() {
  it('should pass', function() {
    expect(true).toBe(true);
  });

  it("should access game", function() {
    expect(Game).toBeDefined();
  });
});

describe("our player number tests", function() {
  it('should not be playable when initialised', function () {
    const game = new Game;
    expect(game.isPlayable()).toBe(false);
  });

  it('should not be playable when 1 player has been added', function () {
    const game = new Game;

    game.add("Bonzo");

    expect(game.isPlayable()).toBe(false);
  });

  it('should have a minimum of two players to be playable', function () {
    const game = new Game;

    game.add("John");
    game.add("Steve");

    expect(game.isPlayable()).toBe(true);
  });

  it('should not be able to roll if weve not added two players', function () {

    const game = new Game;

    expect(game.getCurrentPlayer()).toBeUndefined();
    const didRollHappen = game.roll(2);

    expect(didRollHappen).toBe(false)

  });

  it('should be able to roll if when we are playable', function () {

    const game = new Game;

    game.add("Jeff");
    game.add("Golum");

    expect(game.getCurrentPlayer()).toBeDefined();

    const didRollHappen = game.roll(2);

    expect(didRollHappen).toBe(true)

  });

  it("game should have a maximum of 6 players", function () {

    const game = new Game;

    for (let i = 1; i < 7; i++) {
      expect(game.add(`${i}`)).toBe(true);
    }

    expect(game.add("7")).toBe(false);
    expect(game.add("8")).toBe(false);

  });



});

describe("Penalty box tests", function() {

  it("Player that is currently in box, answers correctly, is release", function(){

    const game = new Game;

    game.add('Jeff');
    game.add('steve');
    game.getInPenaltyBox()[0] = true;

    game.roll(1);

    game.wasCorrectlyAnswered();
    expect(game.getInPenaltyBox()[0]).toBe(false);
  });
});
