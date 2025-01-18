import React, { useEffect, useState } from "react"
import style from "./QuestionCard.module.css"
import { getQuestion } from "../../services/questionService"
import toast, { Toaster } from "react-hot-toast"

function QuestionCard({selectedOption}) {
  const [streak, setStreak] = useState(selectedOption - 1)
  const [question, setQuestion] = useState(getQuestion(streak))
  const [selected, setSelected] = useState(null)
  const [correct, setCorrect] = useState(null)

  const handleClick = (selected) => {
    setSelected(selected)
    const isCorrect = selected === question.answer
    setCorrect(isCorrect)

    if (streak === 179) {
      setStreak(selectedOption - 1)
      toast("Finished", { icon: "🎉" })
    }
    else if (selected === question.answer) {
      setStreak(streak + 1);
    } 
    else {
      setStreak(selectedOption - 1);
    }
  }

  useEffect(() => {
    setStreak(selectedOption - 1);
    setQuestion(getQuestion(selectedOption - 1));
  }, [selectedOption]);

  useEffect(() => {
    if (correct) {
      setTimeout(() => {
        setQuestion(getQuestion(streak))
        setSelected(null)
        setCorrect(null)
      }, 150)
    }
    else {
      setTimeout(() => {
        setQuestion(getQuestion(streak))
        setSelected(null)
        setCorrect(null)
      }, 2000)
    } 
    
  }, [streak])

  return (
    <div className={style["question-card"]}>
      <Toaster />
      <span className={style["question-name"]}>{question.id}. {question.name}</span>
      {question.image !== "" && <img className={style['question-image']} src={question.image}/>}
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
