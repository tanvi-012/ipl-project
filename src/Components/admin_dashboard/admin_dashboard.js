import React, { useState, useEffect } from 'react';
import { MDBRow, MDBCol,MDBBtn,MDBContainer, MDBBtnGroup ,MDBCard,
    MDBCardHeader,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText} from 'mdb-react-ui-kit';
 

export default function AdminDashboard(){
    const [milliseconds, setMilliseconds] = useState(30000);
    const [isRunning, setIsRunning] = useState(false);
    const [isCardVisible, setCardVisibility]= useState(false);

    const handleCardClick = () => {
        setCardVisibility(!isCardVisible);
    };
  
    useEffect(() => {
      let intervalId;
  
      if (isRunning && milliseconds>0) {
        intervalId = setInterval(() => {
          setMilliseconds((prevMilliseconds) => prevMilliseconds -1);
        },1);
    }else if (milliseconds === 0)
            {
              handleCompletion();
            }
  
            return ()=> clearInterval(intervalId);
          },[isRunning,milliseconds]);
        
  
    const handleStartStop = () => {
      setIsRunning((prevIsRunning) => !prevIsRunning);
    };
  
    const handleReset = () => {
      setMilliseconds(30000);
      setIsRunning(false);
    };
  
    const handleCompletion = () => {
        setCardVisibility(!isCardVisible);
      console.log('Timer Completed!');
      setMilliseconds(30000);
      setIsRunning(false);
    }; 
    return (
    <MDBContainer className='my-5'>
        <MDBRow className='g-0 d-flex align-items-center'>
            <MDBCol md='6'><div>Bid Amount| Bid Team</div></MDBCol>
            <MDBCol md='6'>
            Timer: {milliseconds} milliseconds
            </MDBCol>
        </MDBRow>
        <MDBRow className='g-0 d-flex align-items-center' style={{paddingTop:'20px',paddingBottom:'20px'}}>
            <MDBBtnGroup shadow='0'>
            <MDBBtn color='secondary' onClick={handleReset&&handleCardClick} style={{margin:'4px'}}>
            Batsman
            </MDBBtn>
            <MDBBtn color='secondary'onClick={handleReset&&handleCardClick} style={{margin:'4px'}}>
            Bowler
            </MDBBtn>
            <MDBBtn color='secondary' onClick={handleReset&&handleCardClick} style={{margin:'4px'}}>
            All Rounder
            </MDBBtn>
            <MDBBtn color='secondary' onClick={handleReset&&handleCardClick} style={{margin:'4px'}}>
            Wicketkeeper
            </MDBBtn>
        </MDBBtnGroup>
        </MDBRow>
        <MDBRow className='g-0 d-flex align-items-center' style={{paddingTop:'20px',paddingBottom:'20px'}}>
            <MDBCol className='d-flex align-items-center'>
            {isCardVisible&& (<MDBCard style={{width:'400px',alignItems:'center', margin:'0 auto'}}>
                <MDBCardHeader>Batsmen</MDBCardHeader>
                <MDBCardBody>
                    <MDBCardTitle>Player Name</MDBCardTitle>
                    <MDBCardText>Player Stats</MDBCardText>
                    <MDBCardText>Player Stats</MDBCardText>
                    <MDBBtn onClick={handleStartStop} style={{margin:'4px'}}>{isRunning ? 'Stop' : 'Start'}</MDBBtn><MDBBtn onClick={handleReset} style={{margin:'4px'}}>Reset</MDBBtn>
                </MDBCardBody>
            </MDBCard>)}
            </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }