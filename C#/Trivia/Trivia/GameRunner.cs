using System;

namespace Trivia
{
    public class GameRunner
    {
        private static bool winner;

        public static void Main(String[] args)
        {
            for (var i = 0; i < 10; i++)
            {
                var players = new Players();
                players.Add("Chet");
                players.Add("Pat");
                players.Add("Sue");

                var aGame = new Game(players);

                Random rand = new Random(i);

                do
                {
                    aGame.Roll(rand.Next(5) + 1);

                    if (rand.Next(9) == 7)
                    {
                        winner = aGame.WrongAnswer();
                    }
                    else
                    {
                        winner = aGame.WasCorrectlyAnswered();
                    }
                } while (!winner);
            }
        }
    }
}

