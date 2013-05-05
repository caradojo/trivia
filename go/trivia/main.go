package main

import (
	"math/rand"
	"time"

	"../"
)

func main() {
	notAWinner := false

	game := trivia.NewGame()

	game.Add("Chet")
	game.Add("Pat")
	game.Add("Sue")

	rand.Seed(time.Now().UTC().UnixNano())

	for {
		game.Roll(rand.Intn(5) + 1)

		if rand.Intn(9) == 7 {
			notAWinner = game.WrongAnswer()
		} else {
			notAWinner = game.WasCorrectlyAnswered()

		}

		if !notAWinner {
			break
		}
	}
}
