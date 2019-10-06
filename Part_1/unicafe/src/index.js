import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({text}) => <h1>{text}</h1>

const Button = ({handleClick,text}) => <button onClick={handleClick} >{text}</button>

const Statistics = ({text, value}) => <tbody><tr><td>{text}</td><td>{value}</td></tr></tbody>


const App = (props) => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const all = good + neutral + bad
  const average = (good - bad)/all
  const positive = (good/all) * 100

  return (
    <div>
      <Header text="give feedback"/>
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <Header text="statistics" />
      {all === 0 ? "No feedback given": 
      <>
        <table>
        <Statistics text="good" value={good}/>
        <Statistics text="neutral" value={neutral}/>
        <Statistics text="bad" value={bad}/>
        <Statistics text="all" value={all}/>
        <Statistics text="average" value={average}/>
        <Statistics text="positive" value={positive + ' %'}/>
        </table>
      </>}
      
      
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)


