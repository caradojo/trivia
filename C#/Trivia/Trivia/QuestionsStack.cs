using System;
using System.Collections.Generic;
using System.Linq;

namespace Trivia
{
    public class QuestionsStack
    {
        private readonly LinkedList<string> questions = new LinkedList<string>();

        public void AskQuestionAndDiscardIt()
        {
            Console.WriteLine(questions.First());
            questions.RemoveFirst();
        }

        public void AddLast(string question)
        {
            questions.AddLast(question);
        }
    }
}