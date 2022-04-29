import React from 'react';
import './TenziesContainer.css'
import Dice from './Dice';
import {nanoid} from "nanoid"
import Confetti from 'react-confetti';

function App() {
  const [dice, setDice] = React.useState(allNewDice());
  const diceElements = dice.map(die => <Dice key={die.id} value={die.value} isHeld={die.isHeld} holdDice={() => holdDice(die.id)} />)
  const [tenzies, setTenzies] = React.useState(false);

  React.useEffect(() => {
    console.log('state changed');    
    setTenzies(dice.every(die => die.isHeld) && dice.every(die => die.value === dice[0].value))
  }, [dice]);

  React.useEffect(()=>{
    if(tenzies){
      console.log('won')
    }else{
      console.log('still going on')
    }
  }, [tenzies])

  function allNewDice(){
    const newDice = [];
    for (let i=0; i<10; i++){
      newDice.push({value: Math.ceil(Math.random() * 6), isHeld: false, id: nanoid()})
    }
    return newDice
  }

  function rollDice(){
    if(tenzies){
      setTenzies(false)
      setDice(allNewDice())
    }else{
      setDice(oldDice => oldDice.map(die => {
        return die.isHeld ? {...die} : {value: Math.ceil(Math.random() * 6), isHeld: false, id: nanoid()}
      }))
    }
  }

  function holdDice(id){
    console.log('Dice id: ' + id)
    setDice(oldDice => oldDice.map(die => {
      return die.id == id ? { ...die, isHeld: !die.isHeld} : die
    }))
  }

  return (
    <div className="App">
      <main>
        {tenzies && <Confetti />}
        <h1>Tenzies</h1>
        <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className='dice--container'>
          {diceElements}
        </div>        
        <button onClick={rollDice} className='roll--button'>{tenzies ? 'New Game': 'Roll'}</button>
      </main>  
    </div>
  );
}

export default App;
