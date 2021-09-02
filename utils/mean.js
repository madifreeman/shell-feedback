// Scores is an array of arrays of feedback scores
// E.g. [[4, 6, 5, 8, 6, 5, 6, 3, 5], [6, 4, 6, 5, 4,5, 5, 4, 6]]
const mean = (array) => {
    const validNums = array.filter(i => typeof(i) === 'number')
    const total = validNums.reduce((a, b) => a + b);
    const mean = total / validNums.length;
    return mean;
  };
  
  export const overallMean = (scores) => {
    const mergedScores = scores.flat(1);
    return mean(mergedScores);
  };
  
  // Scores is a matrix of scores with each column representing a category
  export const columnMeans = (scores) => {
    const transposed = scores[0].map((_, colIndex) => scores.map((row) => row[colIndex]));
    const colMeans = transposed.map((c) => mean(c));
    return colMeans;
  };
  