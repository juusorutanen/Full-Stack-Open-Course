import { useState } from 'react'

const StatisticLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
} 

const Statistics = (props) => {
  if (props.all === 0) {
    return (
      <div>
        No reviews yet
      </div>
    )
  }
  
return (
  
  <div>
    <h1>Statistics</h1>
    <table>
      <tbody>
      <StatisticLine text="good" value ={props.good} />
      <StatisticLine text="neutral" value ={props.neutral} />
      <StatisticLine text="bad" value ={props.bad} />
      <StatisticLine text="all" value ={props.all} />
      <StatisticLine text="average" value ={props.average} />
      <StatisticLine text="positive" value ={props.positive} />
      </tbody>
    </table>
   </div>
)
}

const Button = ({handleClick, text}) => (
  
  <button onClick={handleClick}>{text}</button>
  
)

const App = () => {
  
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  

  const increaseGood = () => {setGood(good + 1)
    const updatedGood = good + 1
    setAll(updatedGood + bad + neutral)
  }
  const increaseNeutral = () => {setNeutral(neutral + 1)
    const updatedNeutral = neutral + 1
    setAll(good + bad + updatedNeutral)
    }

  const increaseBad = () => {setBad(bad + 1)
    const updatedBad = bad + 1
    setAll(good + updatedBad + neutral)
  }

  const sum = good + bad + neutral
  const average = ((good - bad) / sum).toFixed(2)
  const positive = ((good/all) * 100).toFixed(2) + "%"

  

  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={increaseGood} text='good'/>
      <Button handleClick={increaseNeutral} text='neutral'/>
      <Button handleClick={increaseBad} text='bad'/>
      <Statistics good={good} all={all} neutral={neutral} bad={bad} average={average} positive={positive}/>
    </div>
  )
}

export default App;