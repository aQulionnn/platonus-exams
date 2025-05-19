import React, {useEffect, useState} from "react"
import Question from "./components/Question/Question";
import {useQuestionStore} from "./store/questionStore";

function App() {

    const { setQuestions } = useQuestionStore()

    useEffect(() => {
        const data = fetch('/files/os.txt')
            .then(response => response.text())
            .then(data => setQuestions(data.split(/(?=<question>)/)))
    }, []);

    return (
        <div className="App">
            {/*<span style={{*/}
            {/*    position: "absolute",*/}
            {/*    top: "25px",*/}
            {/*    left: "25px",*/}
            {/*    fontSize: "18px",*/}
            {/*    fontWeight: 700*/}
            {/*}}>1 / 372</span>*/}
            <Question/>
        </div>
    )
}

export default App
