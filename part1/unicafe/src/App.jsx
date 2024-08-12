import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
)

const StatisticLine = ({ text, statisticvalue }) => {
  return (
    <tr>
      <td>{text} </td>
      <td>{statisticvalue} </td>
    </tr>
  )
}

const Statistics = (props) => {
  if (props.all !== 0) {
    const average = (props.good - props.bad) / props.all
    const positive = (props.good / props.all) * 100
    return (
      <div>
        <h1>{props.name} </h1>
        <table>
          <tbody>
            <StatisticLine text="good" statisticvalue={props.good} />
            <StatisticLine text="neutral" statisticvalue={props.neutral} />
            <StatisticLine text="bad" statisticvalue={props.bad} />
            <StatisticLine text="all" statisticvalue={props.all} />
            <StatisticLine text="average" statisticvalue={average} />
            <StatisticLine text="positive" statisticvalue={positive + " %"} />
          </tbody>
        </table>
      </div>
    )
  }
  return (
    <>
      <h1>{props.name}</h1>
      <p>No feedback given</p>
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const [allClicks, setAll] = useState(0)
  const feedback = "give feedback"
  const statistics = "statistics"

  const handleGoodClick = () => {
    console.log('good before', good)
    const updatedGood = good + 1
    setGood(updatedGood)
    console.log('good after', good)
    setAll(allClicks + 1)
  }
  const handleNeutralClick = () => {
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
    setAll(allClicks + 1)
  }
  const handleBadClick = () => {
    const updatedBad = bad + 1
    setBad(updatedBad)
    setAll(allClicks + 1)
  }

  return (
    <div>
      <h1>{feedback} </h1>
      <Button handleClick={handleGoodClick} text="good" />
      <Button handleClick={handleNeutralClick} text="neutral" />
      <Button handleClick={handleBadClick} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} all={allClicks} name={statistics} />
    </div>
  )
}

export default App