import React, { useEffect, useState } from "react"
import style from "./QuestionCard.module.css"
import data from "../../data.json"

function QuestionCard() {
  const [question, setQuestion] = useState(data[Math.floor(Math.random() * data.length)])
  const [shuffledVariants, setShuffledVariants] = useState([])
  const [selected, setSelected] = useState(null)
  const [correct, setCorrect] = useState(null)

  const handleClick = (variant) => {
    setSelected(variant)
    const isCorrect = variant === question.answer
    setCorrect(isCorrect)

    if (isCorrect) {
      setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * data.length)
        setQuestion(data[randomIndex])
        setSelected(null)
        setCorrect(null)
      }, 500)
    }
  }

  useEffect(() => {
    const shuffleArray = (array) => {
      const newArray = [...array]
      for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
      }
      return newArray
    }

    setShuffledVariants(shuffleArray(question.variants))
  }, [question])

  return (
    <div className={style["question-card"]}>
      <span className={style["question-name"]}>{question.name}</span>
      {question.image && (
        <img className={style["question-image"]} src={question.image} />
      )}
      <div className={style["variant-list"]}>
        {shuffledVariants.map((variant, index) => {
          const isCorrectAnswer = variant === question.answer
          const isSelected = variant === selected

          let borderColor = ""
          if (isSelected) {
            borderColor = correct ? "#0ead69" : "#ee4266"
          } else if (correct === false && isCorrectAnswer) {
            borderColor = "#ffd23f"
          }

          return (
            <button
              key={index}
              className={style["variant"]}
              style={{ borderColor: `${borderColor}` }}
              onClick={() => handleClick(variant)}>
              {variant}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default QuestionCard
