package com.adaptionsoft.games.uglytrivia;

import static org.fest.assertions.api.Assertions.assertThat;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.PrintStream;
import java.util.Random;

import org.junit.Ignore;
import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.TemporaryFolder;

import com.adaptionsoft.games.trivia.runner.GameRunner;

public class GameTest {

    private static final int NB_SMALL_GOLDEN_MASTER = 200;
	private static final int NB_LONG_GOLDEN_MASTER = 2000;
    private static final String REFERENCE_LOCATION = "src/test/resources/golden-master/Trivia_approved.";
	private static final int FIXED_SEED = 287389;
	
	private Random randomizer = new Random(FIXED_SEED);
    @Rule
    public TemporaryFolder tmp = new TemporaryFolder();
    
    @Test
	public void small_golden_master() throws FileNotFoundException, IOException {
    	for (int i = 0; i < NB_SMALL_GOLDEN_MASTER; i++) {
    		testFile(i);
    	}
	}
    
    @Test
    @Ignore
    public void long_golden_master() throws FileNotFoundException, IOException {
    	for (int i = 0; i < NB_LONG_GOLDEN_MASTER; i++) {
    		testFile(i);
    	}
    }
    
    
    protected void testFile(int i) throws IOException, FileNotFoundException {
        File file = tmp.newFile();
        System.setOut(new PrintStream(file));
        GameRunner.playGame(randomizer);
        assertThat(file).hasContentEqualTo(new File(REFERENCE_LOCATION + i));
    }

    public void createApprovalsTriviaFiles() throws FileNotFoundException
    {
       	for (int i = 0; i < NB_LONG_GOLDEN_MASTER; i++) {
       		File file = new File(REFERENCE_LOCATION + i);
       		System.setOut(new PrintStream(file));
       		GameRunner.playGame(randomizer);
    	}

    }
}
