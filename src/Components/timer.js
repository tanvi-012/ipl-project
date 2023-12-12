import React, { createContext, useState, useContext, useEffect } from 'react';
const TimerContext = createContext();
export const TimerProvider = ({ children }) => {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  useEffect(() => {
    let timer;
    console.log('seconds',seconds);
    console.log('isRunning',isRunning);
    if (isRunning) {
      timer = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds + 1);
      }, 1000);
    } else {
      clearInterval(timer);
    }
    console.log('seconds',seconds);
    console.log('isRunning',isRunning);
    return () => clearInterval(timer);
  }, [isRunning]);
  const startTimer = () => {
    setIsRunning(true);
  };
  const stopTimer = () => {
    setIsRunning(false);
  };
  const resetTimer = () => {
    setSeconds(0);
    setIsRunning(false);
  };
  return (
    <TimerContext.Provider value={{ seconds,isRunning, startTimer, stopTimer, resetTimer }}>
      {children}
    </TimerContext.Provider>
  );
};
export const useTimer = () => {
  return useContext(TimerContext);
};