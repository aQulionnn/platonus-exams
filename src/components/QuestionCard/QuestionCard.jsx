import React, { useEffect, useState } from "react"
import style from "./QuestionCard.module.css"
import { getQuestion } from "../../services/questionService"
import toast, { Toaster } from "react-hot-toast"

function QuestionCard() {
  const [streak, setStreak] = useState(() => {
    const savedStreak = sessionStorage.getItem('streak')
    return savedStreak ? parseInt(savedStreak, 10) : 105
  })
  const [question, setQuestion] = useState(getQuestion(streak))
  const [selected, setSelected] = useState(null)
  const [correct, setCorrect] = useState(null)

  const handleClick = (selected) => {
    setSelected(selected)
    const isCorrect = selected === question.answer
    setCorrect(isCorrect)

    if (streak === 249) {
      setStreak(0)
      toast("Finished", { icon: "🎉" })
    }
    else if (selected === question.answer) {
      setStreak(streak + 1);
    } 
    else {
      setStreak(105);
    }
  }

  useEffect(() => {
    if (correct) {
      setTimeout(() => {
        setQuestion(getQuestion(streak))
        sessionStorage.setItem('streak', streak)
        setSelected(null)
        setCorrect(null)
      }, 150)
    }
    else {
      setTimeout(() => {
        setQuestion(getQuestion(streak))
        sessionStorage.setItem('streak', streak)
        setSelected(null)
        setCorrect(null)
      }, 2000)
    } 
    
  }, [streak])

  return (
    <div className={style["question-card"]}>
      <Toaster />
      <span className={style["question-name"]}>{question.id}. {question.name}</span>
      <div className={style["variant-list"]}>
        {question.variants.map((variant, index) => {  
          
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
              style={{ borderColor: `${borderColor}`}}
              onClick={() => handleClick(variant)}
            >
              {variant}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default QuestionCard
