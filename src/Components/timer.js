import React, {  useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const timeRunning = state => state.timeRunning;
const TimerComponent = () => {
  const [seconds, setSeconds] = useState(30000);
  const isRunning = useSelector(timeRunning)
  useEffect(() => {
    let timer;
    console.log('seconds',seconds);
    console.log('isRunning',isRunning);
    if (isRunning) {
      timer = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds - 1);
      }, 1);
      // console.log('seconds',seconds);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isRunning]);
  return (
    <div>
      Timer: {seconds};
    </div>
  );
};
export default TimerComponent;