require('./game.js');

describe("The test environment", function() {
  it("should pass", function() {
    expect(true).toBe(true);
  });

  it("should access game", function() {
    expect(Game).toBeDefined();
  });
});

describe("our refactoring tests", function() {
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

});
