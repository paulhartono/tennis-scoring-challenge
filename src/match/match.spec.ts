import Match from "."
import Rules from "../rules"



describe('Rules', () => {
  let rules: Rules 
  let match: Match 

  const resetAll = () => {
    match.resetLastRunningScore()
    match.scores[match.scores.length-1].scoreA.winningGames = 0
    match.scores[match.scores.length-1].scoreB.winningGames = 0
  }

  beforeAll(() => {
    rules = new Rules(1) 
    match = new Match(rules, {name: 'player 1'}, {name: 'player 2'})
  })

  beforeEach(() => {
    resetAll()
  })

  describe('resetLastRunningScore - what ever the current running score is, make it 0', () => {

    test('winning points for both player should be set back to 0' , () => {
      
      expect.assertions(3);
      
      match.pointWonBy("player 1");
      match.pointWonBy("player 2");
      match.resetLastRunningScore()
      expect(match.scores[0].scoreA.winningPoints).toEqual(0)
      expect(match.scores[0].scoreB.winningPoints).toEqual(0)
      expect(match.scores[0].winner).toEqual(undefined)
    })
  })

  describe('pointWonBy - A Point is scored by Player', () => {

    test('Point for Player A' , () => {
      
      expect.assertions(5);
      
      match.pointWonBy("player 1");
      expect(match.scores[0].scoreA.winningPoints).toEqual(1)
      expect(match.scores[0].scoreA.winningGames).toEqual(0)
      expect(match.scores[0].scoreB.winningPoints).toEqual(0)
      expect(match.scores[0].scoreB.winningGames).toEqual(0)
      expect(match.scores[0].winner).toEqual(undefined)
    })

    test('Point for Player B' , () => {
      
      expect.assertions(5);
      
      match.pointWonBy("player 2");
      expect(match.scores[0].scoreA.winningPoints).toEqual(0)
      expect(match.scores[0].scoreA.winningGames).toEqual(0)
      expect(match.scores[0].scoreB.winningPoints).toEqual(1)
      expect(match.scores[0].scoreB.winningGames).toEqual(0)
      expect(match.scores[0].winner).toEqual(undefined)
    })
  })

  describe('score - retrieve current score results', () => {
    
    test('Player 1 Won the match' , () => {

      for (var i=0; i<24; i++) {
        match.pointWonBy("player 1");
      }
      let result = match.score()

      expect(result).toEqual('6-0, Player 1 has won the match')
    })

    test('Player 2 Won the match' , () => {
      
      for (var i=0; i<24; i++) {
        match.pointWonBy("player 2");
      }
      let result = match.score()

      expect(result).toEqual('0-6, Player 2 has won the match')
    })

    test('Deuce' , () => {

      for (var i=0; i<3; i++) {
        match.pointWonBy("player 1");
      }
      for (var i=0; i<3; i++) {
        match.pointWonBy("player 2");
      }
      let result = match.score()

      expect(result).toEqual('0-0, Deuce')
    })

    test('Advantage Player 1' , () => {

      for (var i=0; i<3; i++) {
        match.pointWonBy("player 1");
      }
      for (var i=0; i<3; i++) {
        match.pointWonBy("player 2");
      }
      match.pointWonBy("player 1");
      let result = match.score()

      expect(result).toEqual('0-0, Advantage Player 1')
    })

    test('Advantage Player 2' , () => {

      for (var i=0; i<3; i++) {
        match.pointWonBy("player 1");
      }
      for (var i=0; i<3; i++) {
        match.pointWonBy("player 2");
      }
      match.pointWonBy("player 2");
      let result = match.score()

      expect(result).toEqual('0-0, Advantage Player 2')
    })

    test('Tie Break points' , () => {

      for (var i=0; i<20; i++) {
        match.pointWonBy("player 1");
      }
      for (var i=0; i<20; i++) {
        match.pointWonBy("player 2");
      }
      for (var i=0; i<4; i++) {
        match.pointWonBy("player 1");
      }
      for (var i=0; i<4; i++) {
        match.pointWonBy("player 2");
      }
      match.pointWonBy("player 2");
      match.pointWonBy("player 2");
      let result = match.score()

      expect(result).toEqual('6-6, 0-2')
    })

    test('Start of the game' , () => {
      let result = match.score()
      expect(result).toEqual('0-0')
    })
  })

  describe('_consolidatePointOutcome', () => {

    test('Tie break has been won' , () => {
      
      expect.assertions(5);
      
      for (var i=0; i<20; i++) {
        match.pointWonBy("player 1");
      }
      for (var i=0; i<20; i++) {
        match.pointWonBy("player 2");
      }
      for (var i=0; i<4; i++) {
        match.pointWonBy("player 1");
      }
      for (var i=0; i<4; i++) {
        match.pointWonBy("player 2");
      }
      for (var i=0; i<7; i++) {
        match.pointWonBy("player 2");
      }
      expect(match.scores[0].scoreA.winningPoints).toEqual(0)
      expect(match.scores[0].scoreA.winningGames).toEqual(6)
      expect(match.scores[0].scoreB.winningPoints).toEqual(0)
      expect(match.scores[0].scoreB.winningGames).toEqual(7)
      expect(match.scores[0].winner).toEqual({name: 'player 2'})
    })

  })
})