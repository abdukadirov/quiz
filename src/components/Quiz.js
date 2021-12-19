import React, {useState, useEffect} from 'react';
import data from '../data/data.json'
import {Card, Button} from "react-bootstrap";


const Quiz = props => {
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState({})
  const [questions, setQuestions] = useState([...data.menu])
  const [score, setScore] = useState(0)
  const [selectedAnswerId, setSelectedAnswerId] = useState(null)
  const [clicked, setClicked] = useState(false)
  const [showScore, setShowScore] = useState(false)

  useEffect(() => {
    if (props.started) {
      nextQuestion()
    } else {
      setCurrentQuestionNumber(0)
      setCurrentQuestion({})
      setQuestions([...data.menu])
      setScore(0)
      setSelectedAnswerId(null)
      setClicked(false)
      setShowScore(false)
    }
  }, [props.started])

  const checkAnswer = answer => {
    if (clicked) return
    if (answer.isCorrect) {
      setScore(score + 1)
      setSelectedAnswerId(answer.id)
    }
    setClicked(true)
  }

  const nextQuestion = () => {
    setClicked(false)
    setSelectedAnswerId(null)
    const _questions = [...questions]
    if (_questions.length > 1) {
      const next = _questions.splice(Math.floor(Math.random() * (questions.length - 1)), 1)
      setCurrentQuestion(next[0])
    } else if (_questions.length === 1) {
      const next = _questions.splice(0, 1)
      setCurrentQuestion(next[0])
    } else {
      setShowScore(true)
      props.completed()
    }
    setQuestions(_questions)
    setCurrentQuestionNumber(currentQuestionNumber + 1)
  }

  return (
    <div>
      {
        showScore ? (
          <div>
            <h1>Completed.</h1>
            <h3>Your Score: {score} / {data.menu.length}</h3>
            <h3>Your Time: {props.time}</h3>
          </div>
        ) : (
          props.started && (
            <Card style={{width: '18rem', margin: '0 0 2rem'}}>
              <div>
                <Card.Header>
                  Question {currentQuestionNumber} of {data.menu.length}
                </Card.Header>
                <Card.Body className="px-3 py-2">
                  <Card.Title>{currentQuestion.question}</Card.Title>
                  <Card.Text className="card-text">
                    {currentQuestion.name && currentQuestion.name.map(child => (
                      <label className="d-block" key={child.id}>
                        <Button className={"ml-2" + clicked && child.id === selectedAnswerId || "secondary"}
                                onClick={() => checkAnswer(child)}
                                variant="outline-info">{child.name}</Button>
                      </label>
                    ))}
                  </Card.Text>
                </Card.Body>
              </div>
              <Card.Footer>
                <Button onClick={nextQuestion} variant="success">Next</Button>
              </Card.Footer>
            </Card>
          )
        )
      }
    </div>
  );
}


export default Quiz;
