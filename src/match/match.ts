import { SetScore } from "./set-score";
import { PlayerScore } from "./player-score";
import { Rules } from "../rules/rules";
import Player from "../player";
import { Point } from "../rules";

export class Match {

  rules: Rules = {} as Rules
  scores: SetScore[] = [] // This can be extended for multiple sets later on, but for the scope of the project it will only need to have 1 set
  playerA: Player
  playerB: Player

  // constructor can be converted to use array of player to support double match
  // for minimalist approach playerA can just be made a string , in which we dont need to use the Player model
  constructor(rules: Rules, playerA: Player, playerB: Player) {
    let newSetScore: SetScore = {
      scoreA: { winningPoints: 0, winningGames: 0},
      scoreB: { winningPoints: 0, winningGames: 0}
    }
    this.scores.push(newSetScore) 

    this.rules = rules
    this.playerA = playerA
    this.playerB = playerB
  }

  // just giving an idea on how I would extend to use multiple sets
  resetLastRunningScore() { 
    
    this.scores[this.scores.length-1].scoreA.winningPoints = 0
    this.scores[this.scores.length-1].scoreB.winningPoints = 0
    this.scores[this.scores.length-1].winner = undefined
  }
  
  _consolidatePointOutcome() {

      let lastSet = this.scores.length-1

      // let gameScoreA = (this.scores && this.scores[lastSet]) ? this.scores[lastSet].scoreA.winningGames : 0
      // let gameScoreB = (this.scores && this.scores[lastSet]) ? this.scores[lastSet].scoreB.winningGames : 0
      // let runningScoreA = (this.scores && this.scores[lastSet]) ? this.scores[lastSet].scoreA.winningPoints : 0
      // let runningScoreB = (this.scores && this.scores[lastSet]) ? this.scores[lastSet].scoreB.winningPoints : 0
      let gameScoreA = this.scores[lastSet].scoreA.winningGames 
      let gameScoreB = this.scores[lastSet].scoreB.winningGames
      let runningScoreA = this.scores[lastSet].scoreA.winningPoints 
      let runningScoreB = this.scores[lastSet].scoreB.winningPoints 
      
      // check for tie break
      let isTiebreak = this.rules.isTieBreak(gameScoreA, gameScoreB)
      if (isTiebreak) {

        // check if the tie break has been won
        if (this.rules.isTieBreakGameWon(runningScoreA, runningScoreB)) {
          if (runningScoreA > runningScoreB) { 
            this.scores[lastSet].scoreA.winningGames++ 
            this.resetLastRunningScore()
            this.scores[lastSet].winner = this.playerA 
          }
          else {
            this.scores[lastSet].scoreB.winningGames++ 
            this.resetLastRunningScore()
            this.scores[lastSet].winner = this.playerB
          }
        }
        
      }
      // Otherwise check normal game points (non tie break game)
      else {
        
        // check if a game has been won
        if (this.rules.isGameWon(runningScoreA, runningScoreB)) {
          if (runningScoreA > runningScoreB) { 
            this.scores[lastSet].scoreA.winningGames++ 
          }
          else {
            this.scores[lastSet].scoreB.winningGames++ 
          }

          this.resetLastRunningScore()

          if (this.rules.isSetEnded(this.scores[lastSet].scoreA.winningGames, this.scores[lastSet].scoreB.winningGames)) {
            this.scores[lastSet].winner = (this.scores[lastSet].scoreA.winningGames > this.scores[lastSet].scoreB.winningGames) ? this.playerA : this.playerB
          }
        }
      }

  }

  _pointForA() {
    // exit if there's already a winning player
    let winnerPlayer: Player | null = this._getMatchWinner()
    if (winnerPlayer) return

    let lastSet = this.scores.length-1
   
    this.scores[lastSet].scoreA.winningPoints++
    this._consolidatePointOutcome()
   
  }

  _pointForB() {
    // exit if there's already a winning player
    let winnerPlayer: Player | null = this._getMatchWinner()
    if (winnerPlayer) return

    let lastSet = this.scores.length-1

    this.scores[lastSet].scoreB.winningPoints++
    this._consolidatePointOutcome()
  }

  _getMatchWinner(): Player | null {

    let lastSet = this.scores.length-1

    // Calculate winning set for each player on both sides
    let playerATotalWinningSet = 0
    let playerBTotalWinningSet = 0
    this.scores.forEach(item => {
      if (item.winner === this.playerA) playerATotalWinningSet++
      else playerBTotalWinningSet++
    })

    // Check if match has ended and that we have a winner
    if (!!this.scores[lastSet].winner && this.rules.isMatchEnded(playerATotalWinningSet, playerBTotalWinningSet)) {
      return (playerATotalWinningSet > playerBTotalWinningSet) ? this.playerA : this.playerB
    }

    return null
  }

  pointWonBy(name: string) {
    
    if (name === this.playerA.name) {
      this._pointForA()
    }
    else {
      this._pointForB()
    }
  }

  score(): string {
    let lastSet = this.scores.length-1

    // let gameScoreA = (this.scores && this.scores[lastSet]) ? this.scores[lastSet].scoreA.winningGames : 0
    // let gameScoreB = (this.scores && this.scores[lastSet]) ? this.scores[lastSet].scoreB.winningGames : 0
    // let runningScoreA = (this.scores && this.scores[lastSet]) ? this.scores[lastSet].scoreA.winningPoints : 0
    // let runningScoreB = (this.scores && this.scores[lastSet]) ? this.scores[lastSet].scoreB.winningPoints : 0
    let gameScoreA = this.scores[lastSet].scoreA.winningGames 
    let gameScoreB = this.scores[lastSet].scoreB.winningGames
    let runningScoreA = this.scores[lastSet].scoreA.winningPoints 
    let runningScoreB = this.scores[lastSet].scoreB.winningPoints 

    let pointScoreSummary: string = `, ${runningScoreA}-${runningScoreB}`

    let winnerPlayer: Player | null = this._getMatchWinner()
    if (winnerPlayer) {
      pointScoreSummary = (winnerPlayer === this.playerA) ? ', Player 1 has won the match' : ', Player 2 has won the match'
    }
    else {
      if (!this.rules.isTieBreak(gameScoreA, gameScoreB)) {
        if (this.rules.isDeuce(runningScoreA, runningScoreB)) {
          pointScoreSummary = ', Deuce'
        } else if (this.rules.isAdvantage(runningScoreA, runningScoreB)) {
          pointScoreSummary = (runningScoreA > runningScoreB) ? ', Advantage Player 1' : ', Advantage Player 2'
        } else {
          pointScoreSummary = (runningScoreA===0 && runningScoreB===0) ? '' : `, ${Point[runningScoreA]}-${Point[runningScoreB]}`
        }
      } 
    }

    return `${gameScoreA}-${gameScoreB}${pointScoreSummary}`
  }
}