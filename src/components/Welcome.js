import React, {useState, useRef, useEffect} from 'react';
import {Button, Card} from "react-bootstrap";

const Welcome = props => {

  let [timer, setTimer] = useState(0)
  const [isStarted, setIsStarted] = useState(false)
  const countRef = useRef(null)

  useEffect(() =>{
    if (props.completed) {
      clearInterval(countRef.current)
      props.timer(timer)
    }
  }, [props.completed])

  const handleStart = () => {
    setIsStarted(true)
    clearInterval(countRef.current)
    timer = 0
    setTimer(timer)
    countRef.current = setInterval(() => {
      timer += 1
      setTimer(timer)
    }, 1000)
    props.started(true)
  }
  const handleReset = () => {
    clearInterval(countRef.current)
    setIsStarted(false)
    setTimer(0)
    props.started(false)
  }

  return (
    <div>
      <Card style={{width: '18rem'}}>
        <Card.Body>
          <Card.Title>Welcome To Quiz</Card.Title>
          {!isStarted && (<Button onClick={handleStart} variant="primary" className='px-4'>Start</Button>)}
        </Card.Body>
        <Card.Footer className="d-block">
          <p>{timer}</p>
          <div className="d-flex justify-content-center">
            <Button onClick={handleReset} variant="info">reset</Button>
          </div>
        </Card.Footer>
      </Card>
    </div>
  );
}

export default Welcome;