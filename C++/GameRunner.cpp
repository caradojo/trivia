#include <stdlib.h>
#include <time.h>
#include "Game.h"

static bool notAWinner;

int main()
{
	Game aGame;
        srand ((unsigned)time(0));
	// srand(0);
	aGame.add("Chet");
	aGame.add("Pat");
	aGame.add("Sue");

	do
	{

		aGame.roll(rand() % 5 + 1);

		if (rand() % 9 == 7)
		{
			notAWinner = aGame.wrongAnswer();
		}
		else
		{
			notAWinner = aGame.wasCorrectlyAnswered();
		}
	} while (notAWinner);

}
