This repository is a fork of a Legacy Code Retreat code base, I used for several purposes (see below for original LCR purposes).

IUT Lyon 1 C#/.NET courses (2016)
======

You can find 2 branches "csharp_iutlyon1_grpA" & "csharp_iutlyon1_grpB", I used as live-coding and/or as base from one session to another (not led as a Code Retreat). The goal was to show students legacy code, on which they mainly agree there are some issues, and experiment some refactoring and core design principles, then try to make it "live" with a web API.

The path of the courses was the following (7 sessions of 4h + 1 session for evaluation) :
- 2 sessions on [C# introduction](http://devcrafting.github.io/.NETTraining/)
- [Event Storming on a Meetup-like](http://devcrafting.github.io/.NETTraining/2-CQRSTwitterLike/0-Event%20Storming.html) + first coding dojo on this kata: find code-smells, discover Golden Master technique & start refactoring. Our first goal was to remove all the arrays of primitive types (introduction of a Player class)
- Continue refactoring of arrays of primitive types (with Golden Master) : Player, QuestionsStack, then avoid List<> (Players class for ex, not in the live-coded solution)
- Based on previous refactoring (tag IUTLyon1_StartHereToAddFeatures or students' code), we should be more confident to make some changes, then it was time to add some features (keep in mind we needed a web-ready solution in the end, so need to avoid solutions with concurrency problems...):
  - Feature 1: allow to change the nb of purses to win the game: quite easy, but introduce TDD practice by themselves & start to understand concurrency problems & dependency inversion principle
  - Feature 2: allow to choose the questions' categories (impact on size of the board = 3 x nb categories): harder, need to do a little more of refactoring before starting (since currentCategory was still using hard coded categories), then need to find a way to test this feature (lots of Console.WriteLine...)
- Continue Feature 2 implementation + retrieve questions from an external source (need abstraction, i.e Repository pattern + concrete implementation with a plain file for ex) + start removing Console.WriteLine dependency
- (coming) Implement a Web API with Nancy/ASP.NET WebApi: need to remove Console.WriteLine completely, introduce Events and EventPublisher (+ relation with Event Sourcing & CQRS). In the end, multiple games should be able to run in parallel.

F# refactoring focusing on baby steps to immutability
======

The F# version is really not functional, so I tried to use it as a kata to train me to get code more functional, with a particular goal : immutability. I tried a first time, with not enough small steps, so I started over with baby steps.
I often needed to introduce some more mutability and move it to allow baby steps, it was a really instructive exercice.

The result is in "immutabilityBabySteps" branch.

Legacy Code Retreat code base
======

Use this code base to run your own [Legacy Code Retreat](http://legacycoderetreat.jbrains.ca).

As of this writing, there isn't really a single place to get all the information you might want about Legacy Code Retreat. Search the web and ask your colleagues. Most importantly, don't panic! If you've been to Code Retreat even once, then you know most of what you need to run a Legacy Code Retreat. Give it a try!

