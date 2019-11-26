import Rules from "."

describe('Rules', () => {
  let rules: Rules

  beforeAll(() => {
    rules = new Rules(1)
  })

  describe('isGameWon - has a game been won given two scores?', () => {
    test('should return true when: Any of the score given has at least 4 points, and that they have 2 points difference' , () => {
      let result = rules.isGameWon(4,2)
      expect(result).toEqual(true)
    })

    test('should return false when: Both score has less than 4 points ' , () => {
      let result = rules.isGameWon(3,1)
      expect(result).toEqual(false)
    })

    test('should return false when: One score has at least 4, but difference is less than 2 ' , () => {
      let result = rules.isGameWon(4,3)
      expect(result).toEqual(false)
    })
  })

  describe('isDeuce - are game points in deuce state?', () => {
    test('should return true when: Both has same number of points and they are both above or equal to 3' , () => {
      let result = rules.isDeuce(3,3)
      expect(result).toEqual(true)
    })

    test('should return false when: Both has same number of points But they are less than 3' , () => {
      let result = rules.isDeuce(2,2)
      expect(result).toEqual(false)
    })

    test('should return false when: They are not equal' , () => {
      let result = rules.isDeuce(4,3)
      expect(result).toEqual(false)
    })
  })

  describe('isAdvantage - are one the player is in advantage state based on the points they have?', () => {
    test('should return true when: They are at least 3 points, and one has one more point than his opponent' , () => {
      let result = rules.isAdvantage(4,3)
      expect(result).toEqual(true)
    })

    test('should return false when: Any of the points is less than 3' , () => {
      let result = rules.isAdvantage(3,2)
      expect(result).toEqual(false)
    })

    test('should return false when: They are not 1 points apart' , () => {
      let result = rules.isAdvantage(3,3)
      expect(result).toEqual(false)
    })
  })

  describe('isSetEnded - Is this the end of the Set?', () => {
    test('should return true when: At least 6 games won and at least 2 games won more than the opponent.' , () => {
      let result = rules.isSetEnded(6,4)
      expect(result).toEqual(true)
    })

    test('should return false when: Both games won has less than 6' , () => {
      let result = rules.isSetEnded(5,5)
      expect(result).toEqual(false)
    })

    test('should return false when: One games score has at least 6, but difference is less than 2 ' , () => {
      let result = rules.isSetEnded(6,5)
      expect(result).toEqual(false)
    })
  })

  describe('isTieBreak - Is this a Tie Break?', () => {
    test('should return true when: Games winning score are equal to 6' , () => {
      let result = rules.isTieBreak(6,6)
      expect(result).toEqual(true)
    })

    test('should return false when: Any of winning score are not equal to 6' , () => {
      let result = rules.isTieBreak(5,5)
      expect(result).toEqual(false)
    })
  })

  describe('isTieBreakGameWon - Has Tie Break been won by any of the player given a running score?', () => {
    test('should return true when: At least 7 points, and a margin of 2 or more points' , () => {
      let result = rules.isTieBreakGameWon(7,5)
      expect(result).toEqual(true)
    })

    test('should return false when: At least 7 points, but margin is less than 2' , () => {
      let result = rules.isTieBreakGameWon(7,6)
      expect(result).toEqual(false)
    })

    test('should return false when: Less than 7 points' , () => {
      let result = rules.isTieBreakGameWon(6,4)
      expect(result).toEqual(false)
    })
  })

  describe('isMatchEnded - Has match finished yet?', () => {
    test('should return true when: Set Score are not equal, and total Set required is 1' , () => {
      let result = rules.isMatchEnded(1,0)
      expect(result).toEqual(true)
    })

    test('should return true when: Winner has 2 winning set, when Total Set required is 3' , () => {
      rules = new Rules(3)
      let result = rules.isMatchEnded(2,0)
      expect(result).toEqual(true)
    })

    test('should return false when: Winner has 3 winning set, when Total Set required is 5' , () => {
      rules = new Rules(5)
      let result = rules.isMatchEnded(3,1)
      expect(result).toEqual(true)
    })

    test('should return false when: Set Score are equal' , () => {
      let result = rules.isMatchEnded(2,2)
      expect(result).toEqual(false)
    })
  })
})