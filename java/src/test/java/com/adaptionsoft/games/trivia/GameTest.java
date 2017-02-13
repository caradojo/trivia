package com.adaptionsoft.games.trivia;

import static org.junit.Assert.*;

import com.adaptionsoft.games.trivia.runner.GameRunner;
import org.approvaltests.Approvals;
import org.junit.Test;

import java.io.*;
import java.util.Random;
import java.util.stream.IntStream;

public class GameTest {

	@Test
	public void itsLockedDown() throws Exception {

		Random rand = new Random(12344566);
		ByteArrayOutputStream byteArrayStream = new ByteArrayOutputStream();
		System.setOut(new PrintStream(byteArrayStream));
//		GameRunner.playGame(rand);
		IntStream.range(1, 15).forEach(i -> GameRunner.playGame(rand));
		Approvals.verify(byteArrayStream.toString());

	}
}
