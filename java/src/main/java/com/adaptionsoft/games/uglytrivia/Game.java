package com.adaptionsoft.games.uglytrivia;

import java.util.*;

public class Game {

    private final int wrongAnswer;
    private final int deckCount;

    List<String> categories = new ArrayList<>(Arrays.asList("Pop", "Science", "Sports", "Rock"));
    Map<String, LinkedList<String>> questions = new HashMap<>();

    List<String> players = new ArrayList<>();
    int[] places = new int[6];
    int[] purses = new int[6];
    boolean[] inPenaltyBox = new boolean[6];

    int currentPlayer = 0;

    public Game() {
        this(1, 50);
    }

    public Game(int wrongAnswer, int deckCount) {
        this.wrongAnswer = wrongAnswer;
        this.deckCount = deckCount;
        for (String category : categories) {
            LinkedList<String> ques = new LinkedList<>();
            for (int i = 0; i < 50; i++) ques.addLast(createQuestion(category, i));
            questions.put(category, ques);
        }
    }

    List<String> availableCategories() {
        return categories;
    }

    public void addCategory(String category) {
        categories.add(category);
        LinkedList<String> ques = new LinkedList<>();
        for (int i = 0; i < 50; i++) ques.addLast(createQuestion(category, i));
        questions.put(category, ques);
    }

    String createQuestion(String category, int i) {
        if (!categories.contains(category)) return null;
        return String.format("%s Question %d", category, i);
    }

    Map<String, LinkedList<String>> getQuestions() {
        return questions;
    }

    public boolean add(String playerName) {
        int playerIndex = players.size();
        if (playerIndex == 6) {
            notifyPlayerLimitReached();
            return false;
        }
        players.add(playerName);
        places[playerIndex] = 0;
        purses[playerIndex] = 0;
        inPenaltyBox[playerIndex] = false;
        notifyAdd(playerName);
        return true;
    }

    public interface Turn {
        int nextInt();
    }

    public boolean turn(Turn roll, Turn answer) {
        if (everyPlayerInPrison()) {
            notifyNoWinner();
            return true;
        }
        int val = roll.nextInt();
        boolean canPlay = roll(val);
        if (canPlay) {
            nextLocation(val);
            notifyLocationChange();
            askQuestion();
            handleAnswer(answer.nextInt());
            return didPlayerWin();
        }
        return false;
    }

    boolean roll(int roll) {
        if (everyPlayerInPrison()) {
            return false;
        }
        notifyRoll(roll);
        if (inPenaltyBox[currentPlayer]) {
            notifyInPrison();
            nextPlayer();
            return false;
        }
        return true;
    }

    private void askQuestion() {
        System.out.println(findQuestion());
    }

    String findQuestion() {
        LinkedList<String> strings = questions.get(currentCategory());
        if (strings.isEmpty()) return "";
        return strings.removeFirst();
    }

    String currentCategory() {
        return categories.get(places[currentPlayer] % categories.size());
    }

    void handleAnswer(int x) {
        if (everyPlayerInPrison()) {
            return;
        }
        if (x == 7) wrongAnswer();
        else wasCorrectlyAnswered();
        nextPlayer();
    }

    private void wasCorrectlyAnswered() {
        if (inPenaltyBox[currentPlayer]) {
            return;
        }
        purses[currentPlayer]++;
        notifyCorrectAnswer();
    }

    private void wrongAnswer() {
        notifySentToPrison();
        inPenaltyBox[currentPlayer] = true;
    }

    private void notifyPlayerLimitReached() {
        System.out.println("Max limit of players reached.");
    }

    private void notifyAdd(String playerName) {
        System.out.printf("%s was added\n", playerName);
        System.out.printf("They are player number %d\n", players.size());
    }

    private void notifyRoll(int roll) {
        System.out.printf("%s is the current player\n", players.get(currentPlayer));
        System.out.printf("They have rolled a %d\n", roll);
    }

    private void notifySentToPrison() {
        System.out.println("Question was incorrectly answered");
        System.out.printf("%s was sent to the penalty box\n", players.get(currentPlayer));
    }

    private void notifyInPrison() {
        System.out.printf("%s is not getting out of the penalty box\n", players.get(currentPlayer));
    }

    private void notifyCorrectAnswer() {
        System.out.println("Answer was correct!!!!");
        System.out.printf("%s now has %d Gold Coins.\n", players.get(currentPlayer), purses[currentPlayer]);
    }

    private void notifyLocationChange() {
        System.out.printf("%s's new location is %d\n", players.get(currentPlayer), places[currentPlayer]);
        System.out.println("The category is " + currentCategory());
    }

    private void notifyNoWinner() {
        System.out.println("All players in prison. There is no winner.");
    }

    private void nextLocation(int roll) {
        places[currentPlayer] = (places[currentPlayer] + roll) % 12;
    }

    private void nextPlayer() {
        currentPlayer = (currentPlayer + 1) % players.size();
    }

    int currentPlayerPlace() {
        return places[currentPlayer];
    }

    boolean isPlayable() {
        return (players.size() >= 2);
    }

    boolean everyPlayerInPrison() {
        for (int i = 0; i < players.size(); i++) if (!inPenaltyBox[i]) return false;
        return true;
    }

    boolean didPlayerWin() {
        return (purses[(currentPlayer - 1 + players.size()) % players.size()] == 6);
    }
}
