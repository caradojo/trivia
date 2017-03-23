using System;
using System.Collections.Generic;
using System.Linq;

namespace Trivia
{
    public class Game
    {
        private readonly List<Player> _players = new List<Player>();
        private readonly Dictionary<int, string> _categories = new Dictionary<int, string>() {{0, "Pop"}, {1, "Science"}, {2, "Sports"}, {3, "Rock"}};

        LinkedList<string> popQuestions = new LinkedList<string>();
        LinkedList<string> scienceQuestions = new LinkedList<string>();
        LinkedList<string> sportsQuestions = new LinkedList<string>();
        LinkedList<string> rockQuestions = new LinkedList<string>();

        int currentPlayer = 0;
        bool isGettingOutOfPenaltyBox;

        public Game()
        {
            for (var i = 0; i < 50; i++)
            {
                popQuestions.AddLast("Pop Question " + i);
                scienceQuestions.AddLast(("Science Question " + i));
                sportsQuestions.AddLast(("Sports Question " + i));
                rockQuestions.AddLast(CreateRockQuestion(i));
            }
        }

        public string CreateRockQuestion(int index)
        {
            return "Rock Question " + index;
        }

        public bool IsPlayable()
        {
            return (HowManyPlayers() >= 2);
        }

        public bool Add(string playerName)
        {
            _players.Add(new Player(playerName));

            Console.WriteLine(playerName + " was added");
            Console.WriteLine("They are player number " + _players.Count);
            return true;
        }

        public int HowManyPlayers()
        {
            return _players.Count;
        }

        public void Roll(int roll)
        {
            Console.WriteLine(_players[currentPlayer].Name + " is the current player");
            Console.WriteLine("They have rolled a " + roll);

            if (_players[currentPlayer].InPenaltyBox)
            {
                if (roll % 2 != 0)
                {
                    isGettingOutOfPenaltyBox = true;

                    Console.WriteLine(_players[currentPlayer].Name + " is getting out of the penalty box");
                    _players[currentPlayer].Move(roll);

                    Console.WriteLine(_players[currentPlayer].Name
                            + "'s new location is "
                            + _players[currentPlayer].Place);
                    Console.WriteLine("The category is " + CurrentCategory());
                    AskQuestion();
                }
                else
                {
                    Console.WriteLine(_players[currentPlayer].Name + " is not getting out of the penalty box");
                    isGettingOutOfPenaltyBox = false;
                }

            }
            else
            {
                _players[currentPlayer].Move(roll);

                Console.WriteLine(_players[currentPlayer].Name
                        + "'s new location is "
                        + _players[currentPlayer].Place);
                Console.WriteLine("The category is " + CurrentCategory());
                AskQuestion();
            }

        }

        private void AskQuestion()
        {
            if (CurrentCategory() == "Pop")
            {
                Console.WriteLine(popQuestions.First());
                popQuestions.RemoveFirst();
            }
            if (CurrentCategory() == "Science")
            {
                Console.WriteLine(scienceQuestions.First());
                scienceQuestions.RemoveFirst();
            }
            if (CurrentCategory() == "Sports")
            {
                Console.WriteLine(sportsQuestions.First());
                sportsQuestions.RemoveFirst();
            }
            if (CurrentCategory() == "Rock")
            {
                Console.WriteLine(rockQuestions.First());
                rockQuestions.RemoveFirst();
            }
        }


        private string CurrentCategory()
        {
            return _categories[_players[currentPlayer].Place % 4];
        }

        public bool WasCorrectlyAnswered()
        {
            bool winner;
            if (_players[currentPlayer].InPenaltyBox)
            {
                if (isGettingOutOfPenaltyBox)
                {
                    Console.WriteLine("Answer was correct!!!!");
                    _players[currentPlayer].WinAGoldCoin();

                    winner = DidPlayerWin();
                    currentPlayer++;
                    if (currentPlayer == _players.Count) currentPlayer = 0;

                    return winner;
                }

                currentPlayer++;
                if (currentPlayer == _players.Count) currentPlayer = 0;
                return true;
            }

            Console.WriteLine("Answer was corrent!!!!");
            _players[currentPlayer].WinAGoldCoin();

            winner = DidPlayerWin();
            currentPlayer++;
            if (currentPlayer == _players.Count) currentPlayer = 0;

            return winner;
        }

        public bool WrongAnswer()
        {
            Console.WriteLine("Question was incorrectly answered");
            Console.WriteLine(_players[currentPlayer].Name + " was sent to the penalty box");
            _players[currentPlayer].GoToPenaltyBox();

            currentPlayer++;
            if (currentPlayer == _players.Count) currentPlayer = 0;
            return true;
        }


        private bool DidPlayerWin()
        {
            return _players[currentPlayer].GoldCoins != 6;
        }
    }
}
