import React, {  useState, useEffect } from 'react';
import io from 'socket.io-client'

const socket = io.connect("http://127.0.0.1:5000");




const TimerComponent = () => {
  const [seconds, setSeconds] = useState(3000);
  const [isRunning,setIsRunning]=useState(0);

  useEffect(() =>{
    socket.on('running',(running) => {
      console.log('running:',running);
      setSeconds(3000)
      setIsRunning(running);
    })
    return () =>{
     
    };
  },[]);

  console.log('isRunning',isRunning);
  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setSeconds(prevSeconds => {
          if (prevSeconds > 0) {
            return prevSeconds - 1;
          } else {
            clearInterval(timer);
            socket.emit('running',0);
            setSeconds(3000);
            return 0; // Ensure the timer doesn't go negative
          }
        });
      }, 1);
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