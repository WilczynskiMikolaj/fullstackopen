const Header = ({ course }) => {
  return (
    <h1>
      {course}
    </h1>
  )
}

const Part = (props) => {
  console.log(props)
  return(
    <p>
      {props.partname.name} {props.partname.exercises}
    </p>
  )
}

const Content = (props) => {
  console.log(props)
  return (
    <>
      <Part partname={props.parts[0]} />
      <Part partname={props.parts[1]} />
      <Part partname={props.parts[2]} />
    </>
  )
}

const Total = (props) =>{
  console.log(props)
  console.log(props.parts[0])
  return(
    <p> Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises} </p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total  parts={course.parts}/>
    </div>
  )
}

export default App