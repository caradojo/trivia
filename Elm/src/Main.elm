module Main exposing (main, run)

import Game exposing (Game)
import Html exposing (Html, div, p, text)
import Random exposing (Seed)
import Rope exposing (Rope)


main : Html msg
main =
    view run


run : Rope String
run =
    let
        ( game, initialLogs ) =
            Game.init
                |> andThen (Game.add "Chet")
                |> andThen (Game.add "Pat")
                |> andThen (Game.add "Sue")
    in
    go game initialLogs (Random.initialSeed 0)


go : Game -> Rope String -> Seed -> Rope String
go game queue seed =
    let
        ( upToFive, seed_ ) =
            Random.step (Random.int 1 5) seed

        ( upToEight, seed__ ) =
            Random.step (Random.int 0 8) seed_

        ( game_, rollLogs ) =
            Game.roll (upToFive + 1) game

        ( notAWinner, game__, answerLogs ) =
            if upToEight == 7 then
                Game.wrongAnswer game_

            else
                Game.wasCorrectlyAnswered game_

        nextGame =
            game__

        nextQueue =
            Rope.appendTo
                (Rope.appendTo queue rollLogs)
                answerLogs

        nextSeed =
            seed__
    in
    if notAWinner then
        go nextGame nextQueue nextSeed

    else
        nextQueue


view : Rope String -> Html msg
view games =
    games
        |> Rope.toList
        |> List.map (\line -> p [] [ text line ])
        |> div []



-- This part is used to collect the logs, you can ignore it


andThen : (a -> ( b, Rope String )) -> ( a, Rope String ) -> ( b, Rope String )
andThen f ( x, xlog ) =
    let
        ( fx, fxlog ) =
            f x
    in
    ( fx, Rope.appendTo xlog fxlog )
