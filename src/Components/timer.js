import React, {  useState, useEffect } from 'react';
import io from 'socket.io-client'
import axios from 'axios';
const socket = io.connect("http://127.0.0.1:5000");




const TimerComponent = () => {
  const [seconds, setSeconds] = useState(3000);
  const [isRunning,setIsRunning]=useState(0);
  const [bidTeam,setBidTeam]= useState(null);
  const [prevBid,setPrevBid]= useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [data, setData] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [playerID,setPlayerID]=useState(0);
  const [name,setName]=useState(null);

  useEffect(() =>{
    socket.on('category',(category) => {
      console.log('category:',category);
      setSelectedCategory(category);
      fetchData(category);
    })
    return () =>{
     
    };
  },[]);

  useEffect(() =>{
    socket.on('index',(index) => {
      console.log('index:',index);
      setCurrentIndex(index);
    })
    return () =>{
     
    };
  },[]);

  useEffect(() =>{
    socket.on('bidTeam',(bidTeam) => {
      setBidTeam(bidTeam);
    })
    return () =>{
     
    };
  },[]);

  useEffect(() =>{
    socket.on('prevBid',(prevBid) => {
      setPrevBid(prevBid);
    })
    return () =>{
     
    };
  },[]);
  

  useEffect(() =>{
    socket.on('running',(running) => {
      console.log('running:',running);
      setSeconds(3000)
      setIsRunning(running);
    })
    return () =>{
     
    };
  },[]);


   

  useEffect(() => {
    const deletePlayerData = async () => {
      try {
        const response = await axios.delete('http://localhost:5000/player_data_delete', {
          params: {
            id: playerID,
          },
        });
        console.log('Data deleted successfully:', response.data);
      } catch (error) {
        console.error('Error deleting data:', error);
      }
    };
    deletePlayerData();
  }, [playerID]);

  const fetchData = async (selectedCategory) => {
    try {
      console.log(selectedCategory);
      const response = await axios.get('http://localhost:5000/execute_query', {
  params: {
    category: selectedCategory
  }
});;
      setData(response.data);
      console.log('timer',response.data)
      setPlayerID(data[currentIndex]['Player_id'])
      setName(data[currentIndex]['Name'])
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const postData = () =>{
    console.log(name);
  axios.post('http://localhost:5000/player_data_post', {
    name: name,
    team: bidTeam,
    price: prevBid
  }, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => {
      console.log('Data posted successfully:', response.data);
    })
    .catch(error => {
      console.error('Error posting data:', error);
    });
  }

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
            fetchData(selectedCategory);
            socket.emit('running',0);
            postData();
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