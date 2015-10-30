pub struct Game
{
    players        : Vec<String>,
    places         : [i32; 6],
    purses         : [i32; 6],
    in_penaltybox  : [bool; 6],
    current_player : i32,
    is_getting_out_of_penaltybox : bool,

    pop_questions     : Vec<String>,
    science_questions : Vec<String>,
    sports_questions  : Vec<String>,
    rock_questions    : Vec<String>,
}

impl Default for Game {
    fn default() -> Game {
        let mut game = Game {
            players        : vec![],
            places         : [0;6],
            purses         : [0;6],
            in_penaltybox  : [false;6],
            current_player : 0,
            is_getting_out_of_penaltybox : false,
            pop_questions     : Vec::new(),
            science_questions : Vec::new(),
            sports_questions  : Vec::new(),
            rock_questions    : Vec::new(),
        };
        for x in 0..50 {
            let pop_qu = "Pop Question ".to_string() + &x.to_string();
            game.pop_questions.push(pop_qu);
            let sci_qu = "Science Question ".to_string() + &x.to_string();
            game.science_questions.push(sci_qu);
            let spo_qu = "Sports Question ".to_string() + &x.to_string();
            game.sports_questions.push(spo_qu);
            let mut rock_qu = game.create_rock_question(x);
            game.rock_questions.push(rock_qu);
        }
        game
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
    fn current_category(&self) -> &'static str {
        match self.places[self.current_player as usize] {
            0 | 4 | 8  => return "Pop",
            1 | 5 | 9  => return "Science",
            2 | 6 | 10 => return "Sports",
            _          => return "Rock"
        }
    }
    fn create_rock_question(&self,index: i32) -> String {
        "Rock Question ".to_string() + &index.to_string()
    }
}

impl Game {
    fn add(&mut self,player_name: String) -> bool {
        let l_player = player_name.clone();
        self.players.push(player_name);
        self.places[self.how_many_players()] = 0;
        self.purses[self.how_many_players()] = 0;
        self.in_penaltybox[self.how_many_players()] = false;
        println!("{} was added",l_player);
        println!("They are player number {}",self.players.len());
        true
    }
}

impl Game {
    fn wrongAnswer(&mut self) -> bool {
        println!("Question was incorrectly answered");
        println!("{} was sent to the penalty box",self.players[self.current_player as usize]);
        self.in_penaltybox[self.current_player as usize] = true;
        self.current_player += 1;
        if(self.current_player == self.players.len() as i32) {
            self.current_player = 0;
        }
        true
    }
}

fn main()
{
    let mut game = Game {..Default::default()}; 
    game.add("Player2".to_string());
}
