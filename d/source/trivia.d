
import game;
import std.random;

bool notAWinner;

void main() {
	auto game = new Game();

	game.add("Chet");
	game.add("Pat");
	game.add("Sue");

	auto rand = new Random();
	rand.seed(unpredictableSeed);

	do {

		game.roll(rand.front() % 5 + 1);
		rand.popFront();

		if (rand.front() % 9 == 7) {
			notAWinner = game.wrongAnswer();
		} else {
			notAWinner = game.wasCorrectlyAnswered();
		}
		rand.popFront();

	} while (notAWinner);

}
