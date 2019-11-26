export class Rules {
  totalSets: number

  constructor(totalSets: number) {
    this.totalSets = totalSets
  }

  isGameWon(runningScoreA: number, runningScoreB: number): boolean {
    let leader = (runningScoreA > runningScoreB) ? runningScoreA : runningScoreB
    let looser = (leader === runningScoreA) ? runningScoreB : runningScoreA

    return (leader >= 4 && leader >= looser+2) 
  }

  isDeuce(runningScoreA: number, runningScoreB: number): boolean {
    return (runningScoreA === runningScoreB && runningScoreA >= 3)
  }

  isAdvantage(runningScoreA: number, runningScoreB: number): boolean {
    return (
      runningScoreA >= 3 && runningScoreB >= 3 && 
      (
        (runningScoreA === runningScoreB + 1) || 
        (runningScoreB === runningScoreA + 1)
      )
    )
  }

  isSetEnded(gameScoreA: number, gameScoreB: number): boolean {
    let leader = (gameScoreA > gameScoreB) ? gameScoreA : gameScoreB
    let looser = (leader === gameScoreA) ? gameScoreB : gameScoreA

    return (leader >= 6 && leader >= looser+2) 
  }

  isTieBreak(gameScoreA: number, gameScoreB: number): boolean {
    return (gameScoreA === gameScoreB && gameScoreA === 6) 
  }

  isTieBreakGameWon(runningScoreA: number, runningScoreB: number): boolean {
    let leader = (runningScoreA > runningScoreB) ? runningScoreA : runningScoreB
    let looser = (leader === runningScoreA) ? runningScoreB : runningScoreA

    return (leader >= 7 && leader >= looser + 2)
  }

  


  // Rules if we wanted to go further with multiple sets
  isMatchEnded(setScoreA: number, setScoreB: number): boolean {
    let leader = (setScoreA > setScoreB) ? setScoreA : setScoreB
    if (this.totalSets === 1) {
      return (setScoreA !== setScoreB)
    } else {
      return (
        this.totalSets >= (setScoreA + setScoreB) &&
        setScoreA !== setScoreB &&
        (setScoreA === ((this.totalSets-1)/2)+1 || setScoreB === ((this.totalSets-1)/2)+1)
      )
    }

    // totalset | setrequiredtowin (a)
    // 1 1
    // 3 2
    // 5 3
    // 7 4
    // 9 5
    // therefore 
    // 1 + (2*(a-1)) = totalset
    // 2 * (a-1) = totalset - 1
    // a-1 = (totalset-1)/2
    // a = ((totalset-1)/2)+1
  }
}