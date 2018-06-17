const ProgressSchema = `
  type Progress {
    coins: Int,
    diamonds: Int,
    completedDates: [Int]
  }
`

module.exports = { ProgressSchema }
