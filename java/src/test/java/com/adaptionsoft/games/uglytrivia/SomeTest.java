package com.adaptionsoft.games.uglytrivia;

import static org.junit.Assert.*;

import org.junit.Test;

import java.util.List;

public class SomeTest {

	private static final String[] players = new String[]{"Wong", "Sher", "Mark", "Judd", "Tony", "Roman"};
	private static final String[] categories = new String[]{"Pop", "Science", "Sports", "Rock"};

	private Game gameWithPlayers(int count) {
		Game game1 = new Game();
		for (int i = 0; i < count; i++) game1.add(players[i]);
		return game1;
	}

	@Test
	public void test_game_atleastTwoPlayers() {
		assertFalse(gameWithPlayers(1).isPlayable());
		assertTrue(gameWithPlayers(2).isPlayable());
	}

	@Test
	public void test_game_atMostSixPlayers() {
		assertFalse(gameWithPlayers(6).add("Loki"));
	}

	@Test
	public void test_game_playerInPrisonCantGetOut() {
		Game game = gameWithPlayers(2);
		assertFalse(game.turn(() -> 1, () -> 7));
		assertFalse(game.turn(() -> 2, () -> 2));
		assertFalse(game.roll(1));
	}

	@Test
	public void test_game_everyPlayersInPrison() {
		Game game = gameWithPlayers(2);
		assertTrue(game.roll(2));
		game.handleAnswer(7);
		assertTrue(game.roll(2));
		assertFalse(game.everyPlayerInPrison());
		game.handleAnswer(7);
		assertFalse(game.roll(2));
		assertTrue(game.everyPlayerInPrison());
	}

	@Test
	public void test_game_didPlayerWin() {
		Game game = gameWithPlayers(2);
		assertFalse(game.turn(() -> 2, () -> 7));
		for (int i = 0; i < 2; i++)
			assertFalse(game.turn(() -> 2, () -> 2));
		assertFalse(game.turn(() -> 2, () -> 2));
		assertFalse(game.didPlayerWin());
		for (int i = 0; i < 7; i++) {
			assertFalse(game.turn(() -> 2, () -> 2));
			assertFalse(game.didPlayerWin());
		}
		assertTrue(game.turn(() -> 2, () -> 2));
		assertTrue(game.didPlayerWin());
	}

	@Test
	public void test_game_playerLocations() {
		Game game = gameWithPlayers(2);
		assertEquals(0, game.currentPlayerPlace());
		assertFalse(game.turn(() -> 2, () -> 2));
		assertEquals(0, game.currentPlayerPlace());
		assertFalse(game.turn(() -> 2, () -> 7));
		assertEquals(2, game.currentPlayerPlace());
		assertFalse(game.turn(() -> 2, () -> 2));
		assertEquals(2, game.currentPlayerPlace());
		assertFalse(game.turn(() -> 2, () -> 2));
		assertEquals(4, game.currentPlayerPlace());
	}

	@Test
	public void test_question_categoriesAvailable() {
		List<String> availableCategories = new Game().availableCategories();
		assertEquals(categories.length, availableCategories.size());
		for (int i = 0; i < categories.length; i++) assertEquals(categories[i], availableCategories.get(i));
	}

	@Test
	public void test_question_createQuestion() {
		Game game = new Game();
		assertEquals("Rock Question 3", game.createQuestion("Rock", 3));
		assertEquals("Science Question 23", game.createQuestion("Science", 23));
		assertEquals("Sports Question 33", game.createQuestion("Sports", 33));
		assertEquals("Pop Question 23", game.createQuestion("Pop", 23));
		assertNull(game.createQuestion("Zumba", 23));
	}

	@Test
	public void test_question_createQuestions() {
		Game game = new Game();
		List<String> availableCategories = new Game().availableCategories();
		assertEquals(availableCategories.size(), game.getQuestions().size());
		int questionPerCategory = 50;
		for (var x : game.getQuestions().entrySet()) {
			assertEquals(questionPerCategory, x.getValue().size());
		}
	}

	@Test
	public void test_question_findQuestions() {
		Game game = gameWithPlayers(4);
		assertEquals("Pop Question 0", game.findQuestion());
		game.turn(() -> 2, () -> 2);
		assertEquals("Pop Question 1", game.findQuestion());
		game.turn(() -> 3, () -> 2);
		assertEquals("Pop Question 2", game.findQuestion());
	}

	@Test
	public void test_question_deckOutOfQuestions() {
		Game game = new Game();
		for (int i = 0; i < 50; i++) game.findQuestion();
		assertEquals("", game.findQuestion());
	}

	@Test
	public void test_question_addCategory() {
		Game game = gameWithPlayers(2);
		List<String> availableCategories = game.availableCategories();
		for (int i = 0; i < categories.length; i++) assertEquals(categories[i], availableCategories.get(i));
		game.addCategory("Cookery");
		assertEquals(5, game.availableCategories().size());
	}
}
