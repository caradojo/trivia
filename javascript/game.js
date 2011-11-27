function Game() {
  this.players          = new Array();
  this.places           = new Array(6);
  this.purses           = new Array(6);
  this.inPenaltyBox     = new Array(6);

  this.popQuestions     = new Array();
  this.scienceQuestions = new Array();
  this.sportsQuestions  = new Array();
  this.rockQuestions    = new Array();

  this.currentPlayer    = 0;
  this.isGettingOutOfPenaltyBox = false;

  game = this;

  var didPlayerWin = function(){
    return !(game.purses[game.currentPlayer] == 6)
  };

  var currentCategory = function(){
    if(game.places[game.currentPlayer] == 0)
      return 'Pop';
    if(game.places[game.currentPlayer] == 4)
      return 'Pop';
    if(game.places[game.currentPlayer] == 8)
      return 'Pop';
    if(game.places[game.currentPlayer] == 1)
      return 'Science';
    if(game.places[game.currentPlayer] == 5)
      return 'Science';
    if(game.places[game.currentPlayer] == 9)
      return 'Science';
    if(game.places[game.currentPlayer] == 2)
      return 'Sports';
    if(game.places[game.currentPlayer] == 6)
      return 'Sports';
    if(game.places[game.currentPlayer] == 10)
      return 'Sports';
    return 'Rock';
  };

  this.createRockQuestion = function(index){
    return "Rock Question "+index;
  };

  for(var i = 0; i < 50; i++){
    this.popQuestions.push("Pop Question "+i);
    this.scienceQuestions.push("Science Question "+i);
    this.sportsQuestions.push("Sports Question "+i);
    this.rockQuestions.push(this.createRockQuestion(i));
  };

  this.isPlayable = function(howManyPlayers){
    howManyPlayers >= 2;
  };

  this.add = function(playerName){
    this.players.push(playerName);
    this.places[this.howManyPlayers() - 1] = 0;
    this.purses[this.howManyPlayers() - 1] = 0;
    this.inPenaltyBox[this.howManyPlayers() - 1] = false;

    console.log(playerName + " was added");
    console.log("They are player number " + this.players.length);

    return true;
  };

  this.howManyPlayers = function(){
    return this.players.length;
  };


  var askQuestion = function(){
    if(currentCategory() == 'Pop')
      console.log(game.popQuestions.shift());
    if(currentCategory() == 'Science')
      console.log(game.scienceQuestions.shift());
    if(currentCategory() == 'Sports')
      console.log(game.sportsQuestions.shift());
    if(currentCategory() == 'Rock')
      console.log(game.rockQuestions.shift());
  };

  this.roll = function(roll){
    console.log(this.players[this.currentPlayer] + " is the current player");
    console.log("They have rolled a " + roll);

    if(this.inPenaltyBox[this.currentPlayer]){
      if(roll % 2 != 0){
        this.isGettingOutOfPenaltyBox = true;

        console.log(this.players[this.currentPlayer] + " is getting out of the penalty box");
        this.places[this.currentPlayer] = this.places[this.currentPlayer] + roll;
        if(this.places[this.currentPlayer] > 11){
          this.places[this.currentPlayer] = this.places[this.currentPlayer] - 12;
        }

        console.log(this.players[this.currentPlayer] + "'s new location is " + this.places[this.currentPlayer]);
        console.log("The category is " + currentCategory());
        askQuestion();
      }else{
        console.log(this.players[this.currentPlayer] + " is not getting out of the penalty box");
        this.isGettingOutOfPenaltyBox = false;
      }
    }else{

      this.places[this.currentPlayer] = this.places[this.currentPlayer] + roll;
      if(this.places[this.currentPlayer] > 11){
        this.places[this.currentPlayer] = this.places[this.currentPlayer] - 12;
      }

      console.log(this.players[this.currentPlayer] + "'s new location is " + this.places[this.currentPlayer]);
      console.log("The category is " + currentCategory());
      askQuestion();
    }
  };

  this.wasCorrectlyAnswered = function(){
    if(this.inPenaltyBox[this.currentPlayer]){
      if(this.isGettingOutOfPenaltyBox){
        console.log('Answer was correct!!!!');
        this.purses[this.currentPlayer] += 1;
        console.log(this.players[this.currentPlayer] + " now has " +
                    this.purses[this.currentPlayer]  + " Gold Coins.");

        var winner = didPlayerWin();
        this.currentPlayer += 1;
        if(this.currentPlayer == this.players.length)
          this.currentPlayer = 0;

        return winner;
      }else{
        this.currentPlayer += 1;
        if(this.currentPlayer == this.players.length)
          this.currentPlayer = 0;
        return true;
      }



    }else{

      console.log("Answer was correct!!!!");

      this.purses[this.currentPlayer] += 1;
      console.log(this.players[this.currentPlayer] + " now has " +
                  this.purses[this.currentPlayer]  + " Gold Coins.");

      var winner = didPlayerWin();

      this.currentPlayer += 1;
      if(this.currentPlayer == this.players.length)
        this.currentPlayer = 0;

      return winner;
    }
  };

  this.wrongAnswer = function(){
		console.log('Question was incorrectly answered');
		console.log(this.players[this.currentPlayer] + " was sent to the penalty box");
		this.inPenaltyBox[this.currentPlayer] = true;

    this.currentPlayer += 1;
    if(this.currentPlayer == this.players.length)
      this.currentPlayer = 0;
		return true;
  };
};

var notAWinner = false;

var game = new Game();

game.add('Chet');
game.add('Pat');
game.add('Sue');

do{

  game.roll(Math.floor(Math.random()*6) + 1);

  if(Math.floor(Math.random()*10) == 7){
    notAWinner = game.wrongAnswer();
  }else{
    notAWinner = game.wasCorrectlyAnswered();
  }

}while(notAWinner);
