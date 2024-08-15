const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ parts }) => {
    const sum = parts.reduce((sum, part) => sum + part.exercises, 0)
    return(
        <strong>total of {sum} exercises</strong>
    )
}

const Part = ({ part }) => {
    return (
        <p>
            {part.name} {part.exercises}
        </p>
    )
}

const Content = ({ parts }) => {
    return (
        <div>
            {parts.map(part =>
                <Part key={part.id} part={part} />
            )}
        </div>
    )
}

const Course = ({ course }) => {
    return (
        <div>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts}/>
        </div>
    )
}

export default Course