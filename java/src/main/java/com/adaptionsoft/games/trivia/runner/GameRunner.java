
package com.adaptionsoft.games.trivia.runner;

import java.util.Random;

import com.adaptionsoft.games.uglytrivia.Game;

public class GameRunner {

    public static void main(String[] args) {
        Game game = new Game();

        game.add("Chet");
        game.add("Pat");
        game.add("Sue");

        Random rand = new Random();
        boolean winner;
        do {
            winner = game.turn(() -> rand.nextInt(5) + 1,
                    () -> rand.nextInt(9));
        } while (!winner);
    }
}
