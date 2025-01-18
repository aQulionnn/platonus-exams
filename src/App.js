import React, { useState } from "react"
import QuestionCard from "./components/QuestionCard/QuestionCard"
import Streak from "./components/Streak/Streak"

function App() {

  const [selectedValue, setSelectedValue] = useState(1)

  return (
    <div className="App">
      <select
        value={selectedValue}
        onChange={(e) => setSelectedValue(Number(e.target.value))}
      >
        {Array.from({ length: 180 }, (_, i) => (
          <option key={i} value={i + 1}>
            {i + 1}
          </option>
        ))}
      </select>
      <QuestionCard selectedOption={selectedValue}/>
    </div>
  )
}

export default App
