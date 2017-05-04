using System;
using System.Collections.Generic;
using System.Linq;

namespace Trivia
{
    public class QuestionsStack
    {
        private readonly string _category;
        private readonly LinkedList<string> questions = new LinkedList<string>();

        public QuestionsStack(string category)
        {
            _category = category;
        }

        public void AskQuestionAndDiscardIt()
        {
            Console.WriteLine("The category is " + _category);
            Console.WriteLine(questions.First());
            questions.RemoveFirst();
        }

        public void Generate(int index)
        {
            questions.AddLast(_category + " Question " + index);
        }
    }
}