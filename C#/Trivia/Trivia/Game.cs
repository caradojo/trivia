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

        private Player _currentPlayer;
        bool isGettingOutOfPenaltyBox;

        private void NextPlayer()
        {
            var nextPlayer = _players.IndexOf(_currentPlayer) + 1;
            if (nextPlayer == _players.Count) nextPlayer = 0;
            _currentPlayer = _players[nextPlayer];
        }

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

        public bool Add(string playerName)
        {
            var player = new Player(playerName);
            if (!_players.Any())
            {
                _currentPlayer = player;
            }
            _players.Add(player);

            Console.WriteLine(playerName + " was added");
            Console.WriteLine("They are player number " + _players.Count);
            return true;
        }

        public void Roll(int roll)
        {
            Console.WriteLine(_currentPlayer.Name + " is the current player");
            Console.WriteLine("They have rolled a " + roll);

            if (_currentPlayer.InPenaltyBox)
            {
                if (roll % 2 != 0)
                {
                    isGettingOutOfPenaltyBox = true;

                    Console.WriteLine(_currentPlayer.Name + " is getting out of the penalty box");
                    _currentPlayer.Move(roll);

                    Console.WriteLine(_currentPlayer.Name
                            + "'s new location is "
                            + _currentPlayer.Place);
                    Console.WriteLine("The category is " + CurrentCategory());
                    AskQuestion();
                }
                else
                {
                    Console.WriteLine(_currentPlayer.Name + " is not getting out of the penalty box");
                    isGettingOutOfPenaltyBox = false;
                }

            }
            else
            {
                _currentPlayer.Move(roll);

                Console.WriteLine(_currentPlayer.Name
                        + "'s new location is "
                        + _currentPlayer.Place);
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
            return _categories[_currentPlayer.Place % 4];
        }

        public bool WasCorrectlyAnswered()
        {
            bool winner;
            if (_currentPlayer.InPenaltyBox)
            {
                if (isGettingOutOfPenaltyBox)
                {
                    Console.WriteLine("Answer was correct!!!!");
                    _currentPlayer.WinAGoldCoin();

                    winner = DidPlayerWin();
                    NextPlayer();

                    return winner;
                }

                NextPlayer();
                return true;
            }

            Console.WriteLine("Answer was corrent!!!!");
            _currentPlayer.WinAGoldCoin();

            winner = DidPlayerWin();
            NextPlayer();

            return winner;
        }

        public bool WrongAnswer()
        {
            Console.WriteLine("Question was incorrectly answered");
            Console.WriteLine(_currentPlayer.Name + " was sent to the penalty box");
            _currentPlayer.GoToPenaltyBox();

            NextPlayer();
            return true;
        }


        private bool DidPlayerWin()
        {
            return _currentPlayer.GoldCoins != 6;
        }
    }
}
