
module game;

import std.stdio;
import std.conv;

class Game {
	string[] players;
    int[6] places;
    int[6] purses;
	bool[6] inPenaltyBox;

    string[] popQuestions;
    string[] scienceQuestions;
	string[] sportsQuestions;
	string[] rockQuestions;

    int currentPlayer = 0;
    bool isGettingOutOfPenaltyBox;

    this() {
    	for (int i = 0; i < 50; i++) {
			popQuestions ~= "Pop Question " ~ to!string(i);
			scienceQuestions ~= "Science Question " ~ to!string(i);
			sportsQuestions ~= "Sports Question " ~ to!string(i);
			rockQuestions ~= createRockQuestion(i);
    	}
    }

	string createRockQuestion(int index){
		return "Rock Question " ~ to!string(index);
	}
	
	bool isPlayable() {
		return (howManyPlayers() >= 2);
	}

	bool add(string playerName) {

	    players ~= playerName;
	    places[howManyPlayers()] = 0;
	    purses[howManyPlayers()] = 0;
	    inPenaltyBox[howManyPlayers()] = false;

	    writeln(playerName, " was added");
	    writeln("They are player number ", players.length);
		return true;
	}
	
	int howManyPlayers() {
		return cast(int)players.length;
	}

	void roll(int roll) {
		writeln(players[currentPlayer], " is the current player");
		writefln("They have rolled a %d", roll);
		
		if (inPenaltyBox[currentPlayer]) {
			if (roll % 2 != 0) {
				isGettingOutOfPenaltyBox = true;
				
				writeln(players[currentPlayer], " is getting out of the penalty box");
				places[currentPlayer] = places[currentPlayer] + roll;
				if (places[currentPlayer] > 11) places[currentPlayer] = places[currentPlayer] - 12;
				
				writeln(players[currentPlayer],
						"'s new location is ",
						places[currentPlayer]);
				writeln("The category is ", currentCategory());
				askQuestion();
			} else {
				writeln(players[currentPlayer], " is not getting out of the penalty box");
				isGettingOutOfPenaltyBox = false;
				}
			
		} else {
		
			places[currentPlayer] = places[currentPlayer] + roll;
			if (places[currentPlayer] > 11) places[currentPlayer] = places[currentPlayer] - 12;
			
			writeln(players[currentPlayer],
					"'s new location is ",
					places[currentPlayer]);
			writeln("The category is " ~ currentCategory());
			askQuestion();
		}
		
	}

	private void askQuestion() {
		if (currentCategory() == "Pop") {
			writeln(popQuestions[0]);
			popQuestions = popQuestions[1..$];
		}
		if (currentCategory() == "Science" ) {
			writeln( "*** ",  currentCategory," has ", scienceQuestions.length, "questions left");
			writeln(scienceQuestions[0]);
			scienceQuestions = scienceQuestions[1..$];
		}
		if (currentCategory() == "Sports") {
			writeln(sportsQuestions[0]);
			sportsQuestions = sportsQuestions[1..$];
		}
		if (currentCategory() == "Rock") {
			writeln(rockQuestions[0]);
			rockQuestions = rockQuestions[1..$];
		}
	}
	
	
	private string currentCategory() {
		if (places[currentPlayer] == 0) return "Pop";
		if (places[currentPlayer] == 4) return "Pop";
		if (places[currentPlayer] == 8) return "Pop";
		if (places[currentPlayer] == 1) return "Science";
		if (places[currentPlayer] == 5) return "Science";
		if (places[currentPlayer] == 9) return "Science";
		if (places[currentPlayer] == 2) return "Sports";
		if (places[currentPlayer] == 6) return "Sports";
		if (places[currentPlayer] == 10) return "Sports";
		return "Rock";
	}

	bool wasCorrectlyAnswered() {
		if (inPenaltyBox[currentPlayer]){
			if (isGettingOutOfPenaltyBox) {
				writeln("Answer was correct!!!!");
				purses[currentPlayer]++;
				writeln(players[currentPlayer],
						" now has ",
						purses[currentPlayer],
						" Gold Coins.");
				
				bool winner = didPlayerWin();
				currentPlayer++;
				if (currentPlayer == players.length) currentPlayer = 0;
				
				return winner;
			} else {
				currentPlayer++;
				if (currentPlayer == players.length) currentPlayer = 0;
				return true;
			}
			
			
			
		} else {
		
			writeln("Answer was corrent!!!!");
			purses[currentPlayer] += 1;
			writeln(players[currentPlayer], 
					" now has ",
					purses[currentPlayer],
					" Gold Coins.");
			
			bool winner = didPlayerWin();
			currentPlayer++;
			if (currentPlayer == players.length) currentPlayer = 0;
			
			return winner;
		}
	}
	
	bool wrongAnswer(){
		writeln("Question was incorrectly answered");
		writeln(players[currentPlayer], " was sent to the penalty box");
		inPenaltyBox[currentPlayer] = true;
		
		currentPlayer++;
		if (currentPlayer == players.length) currentPlayer = 0;
		return true;
	}


	private bool didPlayerWin() {
		return !(purses[currentPlayer] == 6);
	}
}
