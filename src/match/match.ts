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
    if (this.scores && this.scores.length > 0) {
      this.scores[this.scores.length-1].scoreA.winningPoints = 0
      this.scores[this.scores.length-1].scoreB.winningPoints = 0
    }
  }


  _consolidatePointOutcome() {
    let gameScoreA = (this.scores && this.scores[0]) ? this.scores[0].scoreA.winningGames : 0
    let gameScoreB = (this.scores && this.scores[0]) ? this.scores[0].scoreB.winningGames : 0
    let runningScoreA = (this.scores && this.scores[0]) ? this.scores[0].scoreA.winningPoints : 0
    let runningScoreB = (this.scores && this.scores[0]) ? this.scores[0].scoreB.winningPoints : 0

    // check for tie break
    let isTiebreak = this.rules.isTieBreak(gameScoreA, gameScoreB)
    if (isTiebreak) {

      // check if the tie break has been won
      if (this.rules.isTieBreakGameWon(runningScoreA, runningScoreB)) {
        if (runningScoreA > runningScoreB) { 
          this.scores[0].scoreA.winningGames++ 
          this.scores[0].winner = this.playerA 
        }
        else {
          this.scores[0].scoreB.winningGames++ 
          this.scores[0].winner = this.playerB
        }
        this.resetLastRunningScore()
      }
      
    }
    // Otherwise check normal game points (non tie break game)
    else {
      
      // check if a game has been won
      if (this.rules.isGameWon(runningScoreA, runningScoreB)) {
        if (runningScoreA > runningScoreB) { 
          this.scores[0].scoreA.winningGames++ 
        }
        else {
          this.scores[0].scoreB.winningGames++ 
        }

        this.resetLastRunningScore()

        if (this.rules.isSetEnded(this.scores[0].scoreA.winningGames, this.scores[0].scoreB.winningGames)) {
          this.scores[0].winner = (this.scores[0].scoreA.winningGames > this.scores[0].scoreB.winningGames) ? this.playerA : this.playerB
        }
      }
    }
  }

  _pointForA() {
    if (this.scores.length === 0) {
      let newScore: PlayerScore = { 
        winningPoints: 1,
        winningGames: 0
      }
      
      this.scores.push({scoreA: newScore} as SetScore)
    }
    else {
      // This part is where we need to check lastSet in the array if we need to support multiple sets
      let lastSet: SetScore = this.scores[0]
      this.scores[0].scoreA.winningPoints++
      this._consolidatePointOutcome()
    }
  }

  _pointForB() {
    if (this.scores.length === 0) {
      let newScore: PlayerScore = { 
        winningPoints: 1,
        winningGames: 0
      }
      this.scores.push({scoreB: newScore} as SetScore)
    }
    else {
      // This part is where we need to check lastSet in the array if we need to support multiple sets
      let lastSet: SetScore = this.scores[0]
      this.scores[0].scoreB.winningPoints++
      this._consolidatePointOutcome()
    }
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
    let gameScoreA = (this.scores && this.scores[0]) ? this.scores[0].scoreA.winningGames : 0
    let gameScoreB = (this.scores && this.scores[0]) ? this.scores[0].scoreB.winningGames : 0
    let runningScoreA = (this.scores && this.scores[0]) ? this.scores[0].scoreA.winningPoints : 0
    let runningScoreB = (this.scores && this.scores[0]) ? this.scores[0].scoreB.winningPoints : 0

    let pointScoreSummary: string = `, ${runningScoreA}-${runningScoreB}`

    if (!this.rules.isTieBreak(gameScoreA, gameScoreB)) {
      if (this.rules.isDeuce(runningScoreA, runningScoreB)) {
        pointScoreSummary = ', Deuce'
      } else if (this.rules.isAdvantage(runningScoreA, runningScoreB)) {
        pointScoreSummary = (runningScoreA > runningScoreB) ? ', Advantage Player 1' : 'Advantage Player 2'
      } else {
        pointScoreSummary = (runningScoreA===0 && runningScoreB===0) ? '' : `, ${Point[runningScoreA]}-${Point[runningScoreB]}`
      }
    } 

    return `${gameScoreA}-${gameScoreB} ${pointScoreSummary}`
  }
}