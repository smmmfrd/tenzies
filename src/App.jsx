import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import Die from "./components/Die";

function App() {

  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);

  useEffect(() => {
    const allDiceHeld = dice.every(die => die.isHeld);
    const allDiceSame = dice.reduce((val, die) => die.value + val, 0) % 10 === 0;

    if(allDiceHeld && allDiceSame){
      setTenzies(true);
    } else {
      setTenzies(false);
    }
  }, [dice])

  function randomDieValue(){
    return Math.ceil(Math.random() * 6);
    // return Math.floor(Math.random() * 6) + 1;
  }

  function allNewDice(){
    let newDice = [];
    for(let i = 1; i<=10; i++){
      newDice.push({
        id: nanoid(),
        value: randomDieValue(),
        isHeld: false,
      });
    }
    return newDice;
  }

  function toggleHold(id){
    setDice(prevDice => prevDice.map(die => die.id === id ? {
      ...die,
      isHeld: !die.isHeld
    } : die))
  }

  const diceElements = dice.map(die =>{
    return(
      <Die 
        key={die.id}
        value={die.value} 
        isHeld={die.isHeld}
        toggleHold={() => toggleHold(die.id)}
      />
    )
  })

  function handleReroll(){
    setDice(prevDice => prevDice.map(die => {
      return die.isHeld ? die : {
        ...die,
        value: randomDieValue()
      }
    }));
  }

  return(
    <main>
      {tenzies && <Confetti/>}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="die--container">
        {diceElements}
      </div>
      <button className="reroll-btn" onClick={tenzies ? () => setDice(allNewDice) : handleReroll}>{tenzies ? "New Game" : "Roll"}</button>
    </main>
  )
}

export default App
