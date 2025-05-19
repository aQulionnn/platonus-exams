import React, {useEffect, useReducer, useState} from 'react'
import style from './Question.module.css'
import {useQuestionStore} from "../../store/questionStore"
import Variant from "../Variant/Variant"
import { reducer, initialState, init  } from "./questionReducer"
import Pagination from "../Pagination/Pagination";

const Question = () => {
    const [state, dispatch] = useReducer(reducer, initialState, init )
    const [id, setId] = useState(0)

    const { questions } = useQuestionStore()

    useEffect(() => {
        if (questions && questions.length > 0) {
            dispatch({type: 'SET_ID', payload: id})
            dispatch({type: 'SET_ANSWER', payload: questions[0].split("\n")[1].replace("<variant>", "")})
            dispatch({ type: 'SET_QUESTION', payload: questions[0].split("\n")[0].replace("<question>", "") })
            dispatch({ type: 'SET_VARIANTS', payload: shuffleArray(questions[0].split("\n").slice(1, 6)) })
        }
    }, [])

    useEffect(() => {
        if (id !== state.id && questions && questions.length > id) {
            dispatch({type: 'SET_ID', payload: id})
            dispatch({type: 'SET_ANSWER', payload: questions[id].split("\n")[1].replace("<variant>", "")})
            dispatch({ type: 'SET_QUESTION', payload: questions[id].split("\n")[0].replace("<question>", "") })
            dispatch({ type: 'SET_VARIANTS', payload: shuffleArray(questions[id].split("\n").slice(1, 6)) })
        }
    }, [id, questions])

    function shuffleArray(arr) {
        let newArray = [...arr]
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]]
        }

        return newArray
    }

    function handleCorrectAnswer () {
        setTimeout(() => {
            setId(prevId => prevId + 1);
        }, 500);
    }

    return (
        <section className={style['question']}>
            <header>
                <h1>{state.id + 1}. {state.question}</h1>
            </header>
            <ul className={style['list']}>
                {state.variants.map((variant, index) => (
                    <Variant
                        // key={index}
                        key={`variant-${id}-${index}`}
                        variant={variant}
                        answer={state.answer}
                        onCorrectAnswer={handleCorrectAnswer}
                    />
                ))}
            </ul>
            <footer>
                <Pagination id={id} setId={setId} />
            </footer>
        </section>
    );
};

export default Question