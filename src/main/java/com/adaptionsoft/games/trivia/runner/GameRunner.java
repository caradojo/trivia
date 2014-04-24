package com.adaptionsoft.games.trivia.runner;

import java.util.Random;

import com.adaptionsoft.games.uglytrivia.Game;

public class GameRunner {

	private static boolean notAWinner;

	public static void main(String[] args) {
		Random rand = new Random();
		playGame(rand);
	}

	public static Game playGame(Random randomizer) {
		Game aGame = new Game();

		aGame.add("Chet");
		aGame.add("Pat");
		aGame.add("Sue");

		do {

			aGame.roll(randomizer.nextInt(5) + 1);

			if (randomizer.nextInt(9) == 7) {
				notAWinner = aGame.wrongAnswer();
			} else {
				notAWinner = aGame.wasCorrectlyAnswered();
			}

		} while (notAWinner);

		return aGame;
	}
}
