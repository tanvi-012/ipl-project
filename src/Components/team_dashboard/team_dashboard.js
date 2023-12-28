import React, { useState, useEffect } from 'react';
import {
MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardHeader,
  MDBListGroup, 
  MDBListGroupItem,
  MDBBtn,
  MDBRow,
  MDBCol
} from 'mdb-react-ui-kit';
import PlayerCard from '../playerCard';
import axios from 'axios';
import TimerComponent from '../timer';
import TimerControl from '../timerControl';
import io from 'socket.io-client'

const socket = io.connect("http://127.0.0.1:5000");

const LiStyle ={
  width: '25%',
}
const ListStyle={
  maxHeight: '260px', overflow: 'auto', paddingLeft: '20px' 
}

const ListTitle={
  height:'50px', paddingLeft:'40px'
}

export default function TeamDashboard() {

    const [teamData, setTeamData] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [data, setData] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [allPlayersFinished, setAllPlayersFinished] = useState(false);
  
    useEffect(() =>{
      socket.on('category',(category) => {
        console.log('category:',category);
        setSelectedCategory(category);
      })
      return () =>{
       
      };
    },[]);
  
    useEffect(() =>{
      socket.on('data',(data) => {
        console.log('data:',data);
        setData(data);
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
    

    ////////////////////////////////// FOR GETTING THE BASE PRCE AND THE MAX PRICE OF PLAYER ////////////////////////////////////

    const currentPlayerId = 151;
    const [bidAmount, setBidAmount] = useState(null);

    const fetchBidAmount = async () => {
      try {
          const response = await axios.get(`http://localhost:5000/get_bid_amount?player_id=${currentPlayerId}`);
  
          if (response.data.bid_amount !== null) {
              setBidAmount(response.data.bid_amount);
          } else {
              console.error('Bid amount not found for the player');
              // Handle the case where bid amount is not found
          }
      } catch (error) {
          console.error('Error fetching bid amount:', error);
          // Handle error, show an error message, etc.
      }
  };
  
  useEffect(() => {
      // Fetch bid amount when the component mounts or when currentPlayerId changes
      if (currentPlayerId) {
          fetchBidAmount();
      }
  }, [currentPlayerId]);


      /////////// FOR GETTING THE UPDATED PURSE //////////////////////////////////////////////////////

  const [teamName, setTeamName] = useState('csk');
  const [remainingPurse, setRemainingPurse] = useState(null);

  useEffect(() => {
    const fetchRemainingPurse = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/user/getpurse?team=${teamName}`);
        const { remaining_purse } = response.data;

        setRemainingPurse(remaining_purse);
      } catch (error) {
        console.error('Error fetching remaining purse:', error);
      }
    };

    fetchRemainingPurse();
  }, [teamName]);



  

  return (
    <MDBContainer className='my-5'>
      <MDBRow className='g-0 d-flex align-items-center mb-4'>
        <MDBCol md='8'>
          <MDBCard alignment='center'>
          <PlayerCard 
          data={data}
          currentIndex={currentIndex}
          selectedCategory={selectedCategory}
          isCardVisible={true}
          allPlayersFinished={allPlayersFinished}
          />
        </MDBCard>
      </MDBCol>
      <MDBCol md='4'>
          <div className='mx-4 mb-4'><TimerComponent></TimerComponent></div>
          <div className='mx-4 mb-4'>Previous Bid</div>
          <div className='mx-4 mb-4'>Bid Amount   <TimerControl></TimerControl></div>
      </MDBCol>
    </MDBRow>
    <MDBRow className='g-0 d-flex align-items-center'>

      <MDBCol md='4'>
          <MDBListGroup style={{ alignContent:'right',maxHeight: '300px', overflowY: 'auto' }}>
            <MDBListGroupItem>selected Players</MDBListGroupItem>
            <MDBListGroupItem>selected Players</MDBListGroupItem>
            <MDBListGroupItem>selected Players</MDBListGroupItem>
            <MDBListGroupItem>selected Players</MDBListGroupItem>
            <MDBListGroupItem>selected Players</MDBListGroupItem>
            <MDBListGroupItem>selected Players</MDBListGroupItem>
            <MDBListGroupItem>selected Players</MDBListGroupItem>
            <MDBListGroupItem>selected Players</MDBListGroupItem>
            <MDBListGroupItem>selected Players</MDBListGroupItem>
            {/* Add more players as needed */}
          </MDBListGroup>
        </MDBCol>

    </MDBRow>
    </MDBContainer>
  );
}

