exports = typeof window !== "undefined" && window !== null ? window : global;

exports.Game = function() {

  const maxNumberOfPlayers = 6;

  var players          = new Array();
  var places           = new Array(maxNumberOfPlayers);
  var purses           = new Array(maxNumberOfPlayers);
  var inPenaltyBox     = new Array(maxNumberOfPlayers);

  var popQuestions     = new Array();
  var scienceQuestions = new Array();
  var sportsQuestions  = new Array();
  var rockQuestions    = new Array();

  var currentPlayer    = 0;
  var isGettingOutOfPenaltyBox = false;

  var didPlayerWin = function(){
    return !(purses[currentPlayer] == maxNumberOfPlayers)
  };

  var currentCategory = function(){
    if(places[currentPlayer] == 0)
      return 'Pop';
    if(places[currentPlayer] == 4)
      return 'Pop';
    if(places[currentPlayer] == 8)
      return 'Pop';
    if(places[currentPlayer] == 1)
      return 'Science';
    if(places[currentPlayer] == 5)
      return 'Science';
    if(places[currentPlayer] == 9)
      return 'Science';
    if(places[currentPlayer] == 2)
      return 'Sports';
    if(places[currentPlayer] == 6)
      return 'Sports';
    if(places[currentPlayer] == 10)
      return 'Sports';
    return 'Rock';
  };

  this.createRockQuestion = function(index){
    return "Rock Question "+index;
  };

  for(var i = 0; i < 50; i++){
    popQuestions.push("Pop Question "+i);
    scienceQuestions.push("Science Question "+i);
    sportsQuestions.push("Sports Question "+i);
    rockQuestions.push(this.createRockQuestion(i));
  };

  this.isPlayable = function(){
    return players.length >= 2;
  };

  this.add = function(playerName){
      console.log(`Adding ${playerName} current number of players is ${this.howManyPlayers()}`)
      if (this.canAddNewPlayer(this.howManyPlayers())) {
          players.push(playerName);
          places[this.howManyPlayers() - 1] = 0;
          purses[this.howManyPlayers() - 1] = 0;
          inPenaltyBox[this.howManyPlayers() - 1] = false;

          console.log(playerName + " was added");
          console.log("They're player number " + players.length);

          return true;
      } else {
          console.log(`There are ${players.length} in this game, the max is 6`)
          console.log(`Couldn't add ${playerName}, There are too many players in this game!`);
          return false
      }
  };

  this.getCurrentPlayer = function() {
    return players[currentPlayer];
  };

  this.howManyPlayers = function(){
    return players.length;
  };

  this.canAddNewPlayer = function (currentCount) {
      return currentCount < maxNumberOfPlayers;
  }

  var askQuestion = function(){
    if(currentCategory() == 'Pop')
      console.log(popQuestions.shift());
    if(currentCategory() == 'Science')
      console.log(scienceQuestions.shift());
    if(currentCategory() == 'Sports')
      console.log(sportsQuestions.shift());
    if(currentCategory() == 'Rock')
      console.log(rockQuestions.shift());
  };

  /*
  * playRound()
  * responsible for:
  * - rolling dice for current player
  * - asking the question
  * - accepting the answer
  * - determining if there is a winner \ has the game ended?
  * -- no? setting the next player
  * -- yes? end the game
  *
  * */

  this.roll = function(roll){

    if (this.isPlayable()) {
      console.log(players[currentPlayer] + " is the current player");
      console.log("They have rolled a " + roll);

      if(inPenaltyBox[currentPlayer]){
        if(roll % 2 != 0){
          isGettingOutOfPenaltyBox = true;

          console.log(players[currentPlayer] + " is getting out of the penalty box");
          places[currentPlayer] = places[currentPlayer] + roll;
          if(places[currentPlayer] > 11){
            places[currentPlayer] = places[currentPlayer] - 12;
          }

          console.log(players[currentPlayer] + "'s new location is " + places[currentPlayer]);
          console.log("The category is " + currentCategory());
          askQuestion();
        }else{
          console.log(players[currentPlayer] + " is not getting out of the penalty box");
          isGettingOutOfPenaltyBox = false;
        }
      }else{

        places[currentPlayer] = places[currentPlayer] + roll;
        if(places[currentPlayer] > 11){
          places[currentPlayer] = places[currentPlayer] - 12;
        }

        console.log(players[currentPlayer] + "'s new location is " + places[currentPlayer]);
        console.log("The category is " + currentCategory());
        askQuestion();
      }
      return true;
    } else {
      return false;
    }

  };

  this.wasCorrectlyAnswered = function(){
    if(inPenaltyBox[currentPlayer]){
      if(isGettingOutOfPenaltyBox){
        console.log('Answer was correct!!!!');
        purses[currentPlayer] += 1;
        console.log(players[currentPlayer] + " now has " +
                    purses[currentPlayer]  + " Gold Coins.");

        var winner = didPlayerWin();
        currentPlayer += 1;
        if(currentPlayer == players.length)
          currentPlayer = 0;

        return winner;
      }else{
        currentPlayer += 1;
        if(currentPlayer == players.length)
          currentPlayer = 0;
        return true;
      }



    }else{

      console.log("Answer was correct!!!!");

      purses[currentPlayer] += 1;
      console.log(players[currentPlayer] + " now has " +
                  purses[currentPlayer]  + " Gold Coins.");

      var winner = didPlayerWin();

      currentPlayer += 1;
      if(currentPlayer == players.length)
        currentPlayer = 0;

      return winner;
    }
  };

  this.wrongAnswer = function(){
		console.log('Question was incorrectly answered');
		console.log(players[currentPlayer] + " was sent to the penalty box");
		inPenaltyBox[currentPlayer] = true;

    currentPlayer += 1;
    if(currentPlayer == players.length)
      currentPlayer = 0;
		return true;
  };
};
/*var notAWinner = false;

var game = new Game();

game.add('Chet');
game.add('Pat');
game.add('Sue');

do{

  game.playRound();

  game.roll(Math.floor(Math.random()*6) + 1);

  if(Math.floor(Math.random()*10) == 7){
    notAWinner = game.wrongAnswer();
  }else{
    notAWinner = game.wasCorrectlyAnswered();
  }

}while(!game.isThereAWinner());*/
