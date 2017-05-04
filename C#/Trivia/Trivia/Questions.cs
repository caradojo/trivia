using System;
using System.Collections.Generic;
using System.Linq;

namespace Trivia
{
    public class Questions
    {
        private readonly Dictionary<int, string> _categories = new Dictionary<int, string>() { { 0, "Pop" }, { 1, "Science" }, { 2, "Sports" }, { 3, "Rock" } };

        private QuestionsStack popQuestions = new QuestionsStack();
        private QuestionsStack scienceQuestions = new QuestionsStack();
        private QuestionsStack sportsQuestions = new QuestionsStack();
        private QuestionsStack rockQuestions = new QuestionsStack();

        public Questions()
        {
            GenerateQuestions();
        }

        private void GenerateQuestions()
        {
            for (var i = 0; i < 50; i++)
            {
                popQuestions.AddLast("Pop Question " + i);
                scienceQuestions.AddLast(("Science Question " + i));
                sportsQuestions.AddLast(("Sports Question " + i));
                rockQuestions.AddLast("Rock Question " + i);
            }
        }

        public void AskQuestion(int playerPlace)
        {
            Console.WriteLine("The category is " + CurrentCategory(playerPlace));
            if (CurrentCategory(playerPlace) == "Pop")
            {
                popQuestions.AskQuestionAndDiscardIt();
            }
            if (CurrentCategory(playerPlace) == "Science")
            {
                scienceQuestions.AskQuestionAndDiscardIt();
            }
            if (CurrentCategory(playerPlace) == "Sports")
            {
                sportsQuestions.AskQuestionAndDiscardIt();
            }
            if (CurrentCategory(playerPlace) == "Rock")
            {
                rockQuestions.AskQuestionAndDiscardIt();
            }
        }
        private string CurrentCategory(int playerPlace)
        {
            return _categories[playerPlace % 4];
        }
    }
}