import 'dotenv/config';
import Match from './match';
import Rules from './rules';

console.info('----------------------------------------------------------------')
console.info('--                     Tennis Scoring App                     --')
console.info('----------------------------------------------------------------')
console.info('author: Paul Hartono')
console.info('email: paul.hartono@gmail.com')
console.info('')

if (!process.env.NUMBER_OF_SETS) throw 'Missing NUMBER_OF_SETS! Aborting...'


try {
  let rules: Rules = new Rules(Number(process.env.NUMBER_OF_SETS)) // NUMBER_OF_SETS is not used, just an example of usage 
  let match: Match = new Match(rules, {name: 'player 1'}, {name: 'player 2'})
  

  match.pointWonBy("player 1");
  match.pointWonBy("player 2");
  // this will return "0-0, 15-15"
  console.log(match.score())

  match.pointWonBy("player 1");
  match.pointWonBy("player 1");
  // this will return "0-0, 40-15"
  console.log(match.score())
  
  match.pointWonBy("player 2");
  match.pointWonBy("player 2");
  // this will return "0-0, Deuce"
  console.log(match.score());
  
  match.pointWonBy("player 1");
  // this will return "0-0, Advantage player 1"
  console.log(match.score());  
  
  match.pointWonBy("player 1");
  // this will return "1-0"
  console.log(match.score());


  for (var i=0; i<20; i++) {
    match.pointWonBy("player 2");
  }
  console.log(match.score());

  for (var i=0; i<20; i++) {
    match.pointWonBy("player 1");
  }
  console.log(match.score());

  for (var i=0; i<2; i++) {
    match.pointWonBy("player 1");
  }
  console.log(match.score());

  for (var i=0; i<4; i++) {
    match.pointWonBy("player 2");
  }
  console.log(match.score());

  for (var i=0; i<6; i++) {
    match.pointWonBy("player 2");
  }
  console.log(match.score());

  for (var i=0; i<7; i++) {
    match.pointWonBy("player 1");
  }
  console.log(match.score());

  for (var i=0; i<3; i++) {
    match.pointWonBy("player 2");
  }
  console.log(match.score());
  
} catch (e) {
  console.error(e)
}