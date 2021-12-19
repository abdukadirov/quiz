import React, {useState} from 'react';
import Quiz from "./Quiz";
import Welcome from "./Welcome";

const Main = () => {
  const [isStarted, setIsStarted] = useState(false)
  const [isCompleted, setIsCompleted] = useState(true)
  const [time, setTime] = useState(true)

  const onStarted = value => {
    setIsStarted(value)
    setIsCompleted(false)
  }

  const onCompleted = () => {
    setIsCompleted(true)
  }

  const onTimer = timer => {
    setTime(timer)
  }

  return (
    <div className='container d-flex justify-content-around mt-5'>
      <Welcome started={onStarted} completed={isCompleted} timer={onTimer}/>
      <Quiz started={isStarted} completed={onCompleted} time={time}/>
    </div>
  );
}

export default Main;