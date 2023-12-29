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
    const [selectedPlayers, setSelectedPlayers] = useState([]);
    const [players, setPlayers] = useState([]);
  
    useEffect(() =>{
      socket.on('category',(category) => {
        console.log('category:',category);
        setSelectedCategory(category);
        fetchData(category);
        fetchBidAmount();
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
    const [baseAmount, setBaseAmount] = useState(null);

    const fetchBidAmount = async () => {
      try {
          const response = await axios.get(`http://localhost:5000/get_bid_amount?player_id=${currentPlayerId}`);
  
          if (response.data.bid_amount !== null) {
              setBidAmount(response.data.max_bid_amount);
              setBaseAmount(response.data.min_bid_amount);
          } else {
              console.error('Bid amount not found for the player');
              // Handle the case where bid amount is not found
          }
      } catch (error) {
          console.error('Error fetching bid amount:', error);
          // Handle error, show an error message, etc.
      }
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
      // Fetch bid amount when the component mounts or when currentPlayerId changes
      if (currentPlayerId) {
          fetchBidAmount();
      }
  }, [currentPlayerId]);


      /////////// FOR GETTING THE UPDATED PURSE //////////////////////////////////////////////////////

  const [teamName, setTeamName] = useState('pk');
  const [remainingPurse, setRemainingPurse] = useState(null);

  useEffect(() => {
    const fetchRemainingPurse = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/user/getpurse`,{params:{
          team:teamName}
      });
        const { remaining_purse } = response.data;

        setRemainingPurse(remaining_purse);
      } catch (error) {
        console.error('Error fetching remaining purse:', error);
      }
    };

    fetchRemainingPurse();
  }, [teamName]);

  useEffect(() => {
    axios.get('http://localhost:5000/team/pk')
      .then(response => {
        const selected = response.data || [];
        setSelectedPlayers(selected);
      })
      .catch(error => {
        console.error('Error fetching team/pk:', error);
      });

    axios.get('http://localhost:5000/user/selectedteam/pk')
      .then(response => {
        const data = response.data || {};
        if (data.players) {
          setPlayers(data.players);
          console.log(players)
        }
      })
      .catch(error => {
        console.error('Error fetching user/selectedteam/pk:', error);
      });
  }, []);

  const renderPlayers = () => {
    // Create an array to store rows of players
    const rows = [];

    for (let i = 0; i < selectedPlayers.length; i += 4) {
      // Slice the selectedPlayers array to get four players for each row
      const rowPlayers = selectedPlayers.slice(i, i + 4);

      // Create a row of MDBListGroupItems
      const row = (
        <MDBListGroup horizontal horizontalSize='md' key={i}>
          {rowPlayers.map((player, index) => (
            <MDBListGroupItem key={index} style={LiStyle} flex-fill>
              {player}
            </MDBListGroupItem>
          ))}
        </MDBListGroup>
      );

      // Add the row to the rows array
      rows.push(row);
    }

    return rows;
  };

  

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
          <MDBRow className='mx-4 mb-2'><TimerComponent></TimerComponent></MDBRow>
          <MDBRow className='mx-4 mb-2'> <MDBCol>Purse: {remainingPurse}</MDBCol></MDBRow>
          <MDBRow className='mx-4 mb-2'> <MDBCol>Previous Bid</MDBCol></MDBRow>
          <MDBRow className='mx-4 mb-2'> <MDBCol>Max Bid: {bidAmount}</MDBCol></MDBRow>
          <MDBRow className='mx-4 mb-2'>
          <MDBCol>Bid Amount: {baseAmount}</MDBCol>
          <MDBCol><TimerControl></TimerControl></MDBCol></MDBRow>
      </MDBCol>
    </MDBRow>
    <MDBRow className='g-0 d-flex'>
        <MDBCol md='8' style={{ maxHeight: '300px' }}>
          <MDBListGroup horizontal horizontalSize='xl'>
            <MDBListGroupItem flex-fill>Players from Algo</MDBListGroupItem>
          </MDBListGroup>
          {renderPlayers()}

        </MDBCol>
        <MDBCol md='4'>
          <div>
          <MDBRow className='mx-4 mb-2'><h2>Players in the team</h2></MDBRow>
            <div style={{ maxHeight: '250px', overflowY: 'auto' }}>
            <ul>
                {players.map((player, index) => (
                  <li key={index}>{index + 1}: {player}</li>
                ))}
              </ul>
            </div>
          </div>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

