import React, { useState, useEffect } from 'react';
import { MDBRow, MDBCol,MDBBtn,MDBContainer, MDBBtnGroup ,MDBCard,
    MDBCardHeader,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText} from 'mdb-react-ui-kit';
import { database } from '../../fbconfig'; 
import axios from 'axios';


export default function AdminDashboard(){
    const [milliseconds, setMilliseconds] = useState(30000);
    const [isRunning, setIsRunning] = useState(false);
    const [isCardVisible, setCardVisibility]= useState(false);
    const [data, setData] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [allPlayersFinished, setAllPlayersFinished] = useState(false);

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
            Timer: {milliseconds} milliseconds
            </MDBCol>
        </MDBRow>
        <MDBRow className='g-0 d-flex align-items-center' style={{paddingTop:'20px',paddingBottom:'20px'}}>
            <MDBBtnGroup shadow='0'>
            <MDBBtn color='secondary' onClick={handleReset&&handleCardClick} disabled={isRunning} style={{margin:'4px'}}>
            Batsman
            </MDBBtn>
            <MDBBtn color='secondary'onClick={handleReset&&handleCardClick} disabled={isRunning} style={{margin:'4px'}}>
            Bowler
            </MDBBtn>
            <MDBBtn color='secondary' onClick={handleReset&&handleCardClick} disabled={isRunning} style={{margin:'4px'}}>
            All Rounder
            </MDBBtn>
            <MDBBtn color='secondary' onClick={handleReset&&handleCardClick} disabled={isRunning} style={{margin:'4px'}}>
            Wicketkeeper
            </MDBBtn>
        </MDBBtnGroup>
      </MDBRow>
      <MDBRow className='g-0 d-flex align-items-center' style={{ paddingTop: '20px', paddingBottom: '20px' }}>
        <MDBCol className='d-flex align-items-center'>
          {isCardVisible && (
            <MDBCard style={{ width: '400px', alignItems: 'center', margin: '0 auto' }}>
              <MDBCardHeader style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '10px' }}>{selectedCategory==="Batsman(w/k)"?"Wicket Keeper":selectedCategory}</MDBCardHeader>
              <MDBCardBody>
              <MDBCardTitle>
                  {data && data.length > 0 && currentIndex < data.length && (
                    // Define the order in which you want to display the keys for each category
                    (() => {
                      const categoryKeyOrders = {
                        Batsman: ['Batsman_ID', 'Name','Average','Strike_Rate'],
                        Bowler: ['Bowler_ID','Name','Average','Strike_Rate' ],
                        'All Rounder':['All_Rounder_ID','Name','Batting_Average','Batting_Strike_Rate','Bowling_Average','Bowling_Strike_Rate'],
                        'Batsman(w/k)' : ['Wicket_Keeper_ID','Name','Average','Strike_Rate']
                        // Add other categories and their respective key orders as needed
                      };

                      const keyOrder = categoryKeyOrders[selectedCategory] || [];

                      return keyOrder.map((key) => (
                        <tr key={key}>
                        <td style={{ color: 'blue', fontWeight: 'bold' }}>{key}</td>
                        <td style={{ color: 'red', fontWeight: 'bold' }}>:</td>
                        <td style={{ color: 'green' }}>{data[currentIndex][key]}</td>
                        </tr>
                      ));
                    })()
                  )}
                </MDBCardTitle>
                {/* <MDBCardText>Player Stats</MDBCardText>
                <MDBCardText>Player Stats</MDBCardText> */}
                 <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <MDBBtn onClick={handleStartStop} disabled={isRunning} style={{margin:'4px'}}>Start</MDBBtn><MDBBtn onClick={handleReset} style={{margin:'4px'}}>Reset</MDBBtn>
                </div>
              </MDBCardBody>
            </MDBCard>
          )}
          {allPlayersFinished && (
          <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', background: 'white', padding: '20px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)' }}>
          <p>All players in the {selectedCategory==="Batsman(w/k)"?"Wicket Keeper":selectedCategory} category have been displayed!</p>
          </div>)}
          
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );}