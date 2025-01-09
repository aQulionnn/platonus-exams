import React, { useEffect, useState } from "react"
import style from "./QuestionCard.module.css"

function QuestionCard() {
  const [questionName, setQuestionName] = useState("")
  const [variants, setVariants] = useState([])
  const [correctAnswer, setCorrectAnswer] = useState("")
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [streak, setStreak] = useState(0)
  const [maxStreak, setMaxStreak] = useState(0)
  const [answerResult, setAnswerResult] = useState(null)
  const [resultClass, setResultClass] = useState("")
  const [showNextButton, setShowNextButton] = useState(false)

  const shuffleVariants = (variants, correct) => {
    const shuffledVariants = [...variants]
    for (let i = shuffledVariants.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffledVariants[i], shuffledVariants[j]] = [
        shuffledVariants[j],
        shuffledVariants[i],
      ]
    }
    return { shuffledVariants, correctAnswer: correct }
  }

  const loadNewQuestion = () => {
    fetch("assets/files/engineering.txt")
      .then((res) => res.text())
      .then((text) => {
        const question = text.split("<question>").filter(Boolean)[
          Math.floor(Math.random() * 140)
        ]
        const questionText = question.split("\n")
        const name = questionText[0]
        const variants = questionText
          .slice(1, 6)
          .map((line) => line.replace("<variant>", ""))
        const correct = questionText[1].replace("<variant>", "")

        const { shuffledVariants, correctAnswer } = shuffleVariants(
          variants,
          correct
        )

        setQuestionName(name)
        setVariants(shuffledVariants)
        setCorrectAnswer(correctAnswer)
      })
      .catch((e) => console.error(e))
  }

  useEffect(() => {
    loadNewQuestion()
  }, [])

  const handleAnswerChange = (e) => {
    const answer = e.target.value
    setSelectedAnswer(answer)

    if (answer === correctAnswer) {
      setStreak(streak + 1)
      setAnswerResult("Верно!")
      setResultClass(style.correct)
      setTimeout(() => {
        loadNewQuestion()
        setAnswerResult(null)
        setResultClass("")
      }, 500)
    } else {
      setStreak(0)
      setAnswerResult(`Неверно! Правильный ответ: ${correctAnswer}`)
      setResultClass(style.incorrect)
      setShowNextButton(true)
    }

    if (streak + 1 > maxStreak) {
      setMaxStreak(streak + 1)
    }
  }

  const handleNextQuestion = () => {
    loadNewQuestion()
    setAnswerResult(null)
    setResultClass("")
    setSelectedAnswer(null)
    setShowNextButton(false) 
  }

  return (
    <div className={style['card']}>
      <div className={style["max-streak"]}>Макс. серия: {maxStreak}</div>
      <div className={style["streak"]}>Серия: {streak}</div>
      <fieldset className={style["question-card"]}>
        <legend className={style["question-name"]}>{questionName}</legend>
        {variants.map((variant, index) => (
          <label key={index} className={style["question-answer"]}>
            <input
              type="radio"
              name="variant"
              value={variant}
              checked={selectedAnswer === variant}
              className={style["question-answer-btn"]}
              onChange={handleAnswerChange}
            />{" "}
            {variant}
          </label>
        ))}
      </fieldset>
      {answerResult && (
        <div className={`${style["answer-result"]} ${resultClass}`}>
          {answerResult}
        </div>
      )}
      {showNextButton && (
        <button onClick={handleNextQuestion} className={style["next-button"]}>
          Дальше
        </button>
      )}
    </div>
  )
}

export default QuestionCard