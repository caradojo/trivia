pub struct Game
{
    players : Vec<String>,
    places  : [i32; 6],
    purses  : [i32; 6],
    in_penaltybox : [bool; 6],
    current_player : i32,
    is_getting_out_of_penaltybox : bool,

    pop_questions : Vec<String>,
    science_questions : Vec<String>,
    sports_questions : Vec<String>,
    rock_questions : Vec<String>,
}

impl Default for Game {
    fn default() -> Game {
        Game {
            players : vec![],
            places  : [0;6],
            purses  : [0;6],
            in_penaltybox : [false;6],
            current_player : 0,
            is_getting_out_of_penaltybox : false,
            pop_questions : Vec::new(),
            science_questions : Vec::new(),
            sports_questions : Vec::new(),
            rock_questions : Vec::new(),
        }
    }
}

impl Game {
    fn how_many_players(&self) -> usize {
        self.players.len()
    }
    fn is_playable(&self) -> bool {
        self.how_many_players() >= 2
    }
    fn did_player_win(&self) -> bool {
        !(self.purses[self.current_player as usize] == 6)
    }
    fn current_category(&self) -> String {
        match self.places[self.current_player as usize] {
            0 | 4 | 8  => return "Pop".to_string(),
            1 | 5 | 9  => return "Science".to_string(),
            2 | 6 | 10 => return "Sports".to_string(),
            _          => return "Rock".to_string()
        }
    }
}

fn main()
{

}
