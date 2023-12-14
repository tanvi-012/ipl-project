import React, { useState, useEffect } from 'react';
import { MDBRow, MDBCol,MDBBtn,MDBContainer, MDBBtnGroup ,MDBCard,
    MDBCardHeader,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText} from 'mdb-react-ui-kit';

import axios from 'axios';
import TimerComponent from '../timer';
import PlayerCard from '../playerCard';
import TimerControl from '../timerControl';


export default function AdminDashboard(){
    const [isCardVisible, setCardVisibility]= useState(false);
    const [data, setData] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [allPlayersFinished, setAllPlayersFinished] = useState(false);

    const handleCardClick = () => {
        setCardVisibility(!isCardVisible);
    };

    const fetchData = async (category) => {
      try {
        const response = await axios.get(`http://localhost:5000/execute-query?category=${category}`);
        setData(response.data);
        setAllPlayersFinished(false);
      } catch (error) {
        console.error('Error:', error.message);
      }
    };
  
    const handleButtonClick = (category) => {
      setCardVisibility(true);
      setSelectedCategory(category);
  
      if (!data || currentIndex === data.length || category !== selectedCategory) {
        fetchData(category);
        setCurrentIndex(0);
      } else {
        setCurrentIndex(currentIndex + 1);
      }
    };
  
    useEffect(() => {
      fetchData();
    }, []);
  
    useEffect(() => {
      if (data && currentIndex >= data.length &&currentIndex!=0) {
        setAllPlayersFinished(true);
        setCardVisibility(false);
      } else {
        setAllPlayersFinished(false);
      }
    }, [data, currentIndex]);

    
    return (
    <MDBContainer className='my-5'>
        <MDBRow className='g-0 d-flex align-items-center'>
            <MDBCol md='6'><div>Bid Amount| Bid Team</div></MDBCol>
            <MDBCol md='6'>
            <TimerComponent></TimerComponent>
            </MDBCol>
        </MDBRow>
        <MDBRow className='g-0 d-flex align-items-center' style={{paddingTop:'20px',paddingBottom:'20px'}}>
            <MDBBtnGroup shadow='0'>
            <MDBBtn color='secondary' onClick={handleCardClick} style={{margin:'4px'}}>
            Batsman
            </MDBBtn>
            <MDBBtn color='secondary'onClick={handleCardClick} style={{margin:'4px'}}>
            Bowler
            </MDBBtn>
            <MDBBtn color='secondary' onClick={handleCardClick}  style={{margin:'4px'}}>
            All Rounder
            </MDBBtn>
            <MDBBtn color='secondary' onClick={handleCardClick}  style={{margin:'4px'}}>
            Wicketkeeper
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
      <TimerControl></TimerControl>
    </MDBContainer>
  );}