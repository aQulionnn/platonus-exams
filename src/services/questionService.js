import aks from '../aks.json'

export const getQuestion = (id) => {
  const question = {...aks[id]}
  question.variants = shuffleArray([...question.variants])
  return question
}

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}