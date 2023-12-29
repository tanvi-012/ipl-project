import React, { useState, useEffect } from 'react';
import { MDBRow, MDBCol, MDBBtn, MDBContainer, MDBBtnGroup, MDBCard, MDBCardHeader, MDBCardBody, MDBCardTitle, MDBCardText } from 'mdb-react-ui-kit';
import axios from 'axios';
import TimerComponent from '../timer';
import PlayerCard from '../playerCard';
import TimerControl from '../timerControl';
import io from 'socket.io-client'

const socket = io.connect("http://127.0.0.1:5000");



export default function AdminDashboard(){
  const [isCardVisible, setCardVisibility]= useState(false);
  const [isRunning,setIsRunning]=useState(0);
  const [data, setData] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [allPlayersFinished, setAllPlayersFinished] = useState(false);
  const [bidTeam,setBidTeam]= useState(null);
  const [prevBid,setPrevBid]= useState(null);

  const Player_id = 1;
  useEffect(() =>{
    socket.on('running',(running) => {
      console.log('running:',running);
      setIsRunning(running);
      if(running===0){setCardVisibility(false)}
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

  const handleCardClick = () => {
    setCardVisibility(!isCardVisible);
  };

  const fetchData = async (selectedCategory) => {
    try {
      console.log(selectedCategory);
      const response = await axios.get('http://localhost:5000/execute_query', {
  params: {
    category: selectedCategory
  }
});;
      setData(response.data);
      setAllPlayersFinished(false);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  useEffect(() => {
    axios.delete(`http://localhost:5000/player_data_delete`,{
      params:{
      id:Player_id
      }
    })
      .then(response => {
        console.log('Data deleted successfully:', response.data);
      })
      .catch(error => {
        console.error('Error deleting data:', error);
      });
  }, [Player_id]);

  const [remainingPurse, setRemainingPurse] = useState(null);

  useEffect(() => {
    const fetchPurseData = async () => {
      try {
        const teamName = 'YourTeamName';
        const response = await axios.get(`http://localhost:5000/user/getpurse`,{
          params:{
          team:teamName
        }
          });
        const { remaining_purse: remainingPurseValue } = response.data;
        setRemainingPurse(remainingPurseValue);
      } catch (error) {
        console.error('Error fetching purse data:', error);
      }
    };

    fetchPurseData();
  }, []);

  useEffect(() => {
    axios.post('http://localhost:5000/player_data_post', {
      name: 'John Doe',
      team: 'Some Team',
      price: 1000000
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
  }, []);

  const [teamData, setTeamData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/team/csk');
        setTeamData(response.data);
      } catch (error) {
        console.error('Error fetching team data:', error);
        setError('Error fetching team data');
      }
    };

    fetchData();
  }, []);

  const [selectedTeamData, setSelectedTeamData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://your-flask-server-hostname-or-ip/user/selectedteam/csk');
        setSelectedTeamData(response.data.players);
      } catch (error) {
        console.error('Error fetching selected team data:', error);
        setError('Error fetching selected team data');
      }
    };

    fetchData();
  }, []);

  const handleButtonClick = (category) => {
    setCardVisibility(true);
    setSelectedCategory(category);
    socket.emit('category',category);
    if (!data || currentIndex === data.length || category !== selectedCategory) {
      fetchData(category);
      setCurrentIndex(0);
      socket.emit('index',0);
    } else {
      setCurrentIndex(currentIndex + 1);
      socket.emit('index',currentIndex+1);
    }
    console.log('dfg',currentIndex)
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (data && currentIndex >= data.length && currentIndex !== 0) {
      setAllPlayersFinished(true);
      setCardVisibility(false);
    } else {
      setAllPlayersFinished(false);
    }
  }, [data, currentIndex]);

  return (
    <MDBContainer className='my-5'>
      <MDBRow className='g-0 d-flex align-items-center'>
        <MDBCol md='6'><div>{prevBid}| {bidTeam}</div></MDBCol>
        <MDBCol md='6'>
            <TimerComponent></TimerComponent>
        </MDBCol>
      </MDBRow>
      <MDBRow className='g-0 d-flex align-items-center' style={{ paddingTop: '20px', paddingBottom: '20px' }}>
        <MDBBtnGroup shadow='0'>
          <MDBBtn color='secondary' disabled={isRunning} onClick={() => { handleCardClick(); handleButtonClick("Batsman"); }} style={{ margin: '4px' }}>
            Batsman
          </MDBBtn>
          <MDBBtn color='secondary' disabled={isRunning} onClick={() => { handleCardClick(); handleButtonClick("Bowler"); }} style={{ margin: '4px' }}>
            Bowler
          </MDBBtn>
          <MDBBtn color='secondary' disabled={isRunning} onClick={() => { handleCardClick(); handleButtonClick("All Rounder"); }} style={{ margin: '4px' }}>
            All Rounder
          </MDBBtn>
          <MDBBtn color='secondary' disabled={isRunning} onClick={() => { handleCardClick(); handleButtonClick("Batsman(w/k)"); }} style={{ margin: '4px' }}>
            Wicket Keeper
          </MDBBtn>
        </MDBBtnGroup>
      </MDBRow>
      <MDBRow className='g-0 d-flex align-items-center' style={{ paddingTop: '20px', paddingBottom: '20px' }}>
        <MDBCol className='d-flex align-items-center'>
        <PlayerCard
          data={data}
          currentIndex={currentIndex}
          selectedCategory={selectedCategory}
          isCardVisible={isCardVisible}
          allPlayersFinished={allPlayersFinished}
        />
        </MDBCol>
      </MDBRow>
      <MDBRow className='g-0 d-flex align-items-center' style={{ paddingTop: '20px', paddingBottom: '20px' }}>
        <MDBCol className='d-flex align-items-center'>
       {isCardVisible&& <TimerControl/>}
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}