package com.adaptionsoft.games.uglytrivia;

import java.io.PrintStream;
import java.util.Random;

import org.approvaltests.Approvals;
import org.approvaltests.reporters.UseReporter;
import org.junit.Test;

import com.adaptionsoft.games.trivia.runner.GameRunner;
import com.adaptionsoft.games.uglytrivia.reporter.MyWinMergeReporter;


@UseReporter(MyWinMergeReporter.class)
public class GameTest {

    private static final int NB_ITERATION = 10;
	private static final int FIXED_SEED = 287389;

	private Random randomizer = new Random(FIXED_SEED);

    @Test
    public void trivia_approvaltests() throws Exception
    {
    	OutputStringStream actualResult = new OutputStringStream();
    	System.setOut(new PrintStream(actualResult));

    	for (int i=0; i < NB_ITERATION; i++)
    	{
    		GameRunner.playGame(randomizer);
    	}

    	Approvals.verify(actualResult.toString());
    }



}