import React from "react";
import QuestionCard from "./components/QuestionCard/QuestionCard";
import Streak from "./components/Streak/Streak";

function App() {
  return (
    <div className="App">
      <Streak streak={10}/>
      <QuestionCard />
    </div>
  );
}

export default App