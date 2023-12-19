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
      <MDBCol md='8' style={{maxHeight:'300px'}}> 
          <div>
          <MDBListGroup horizontal horizontalSize='xxl'>
            <MDBListGroupItem flex-fill>Players from Algo</MDBListGroupItem>
          </MDBListGroup>

          <MDBListGroup horizontal horizontalSize='md'>
            <MDBListGroupItem style={LiStyle} flex-fill>Player 1</MDBListGroupItem>
            <MDBListGroupItem style={LiStyle} flex-fill>Player 2</MDBListGroupItem>
            <MDBListGroupItem style={LiStyle} flex-fill>Player 3</MDBListGroupItem>
            <MDBListGroupItem style={LiStyle} flex-fill>Player 4</MDBListGroupItem>
          </MDBListGroup>

          <MDBListGroup horizontal horizontalSize='md'>
            <MDBListGroupItem style={LiStyle} flex-fill>Player 5</MDBListGroupItem>
            <MDBListGroupItem style={LiStyle} flex-fill>Player 6</MDBListGroupItem>
            <MDBListGroupItem style={LiStyle} flex-fill>Player 7</MDBListGroupItem>
            <MDBListGroupItem style={LiStyle} flex-fill>Player 8</MDBListGroupItem>
          </MDBListGroup>

          <MDBListGroup horizontal horizontalSize='md'>
            <MDBListGroupItem style={LiStyle} flex-fill>Player 9</MDBListGroupItem>
            <MDBListGroupItem style={LiStyle} flex-fill>Player 10</MDBListGroupItem>
            <MDBListGroupItem style={LiStyle} flex-fill>Player 11</MDBListGroupItem>
            <MDBListGroupItem style={LiStyle} flex-fill>Player 12</MDBListGroupItem>
          </MDBListGroup>

          <MDBListGroup horizontal horizontalSize='md'>
            <MDBListGroupItem style={LiStyle} flex-fill>Player 13</MDBListGroupItem>
            <MDBListGroupItem style={LiStyle} flex-fill>Player 14</MDBListGroupItem>
            <MDBListGroupItem style={LiStyle} flex-fill>Player 15</MDBListGroupItem>
            <MDBListGroupItem style={LiStyle} flex-fill>Player 16</MDBListGroupItem>
          </MDBListGroup>
          
          <MDBListGroup horizontal horizontalSize='md'>
            <MDBListGroupItem style={LiStyle} flex-fill>Player 13</MDBListGroupItem>
            <MDBListGroupItem style={LiStyle} flex-fill>Player 14</MDBListGroupItem>
            <MDBListGroupItem style={LiStyle} flex-fill>Player 15</MDBListGroupItem>
            <MDBListGroupItem style={LiStyle} flex-fill>Player 16</MDBListGroupItem>
          </MDBListGroup>

          <MDBListGroup horizontal horizontalSize='md'>
            <MDBListGroupItem style={LiStyle} flex-fill>Player 13</MDBListGroupItem>
            <MDBListGroupItem style={LiStyle} flex-fill>Player 14</MDBListGroupItem>
            <MDBListGroupItem style={LiStyle} flex-fill>Player 15</MDBListGroupItem>
            <MDBListGroupItem style={LiStyle} flex-fill>Player 16</MDBListGroupItem>
          </MDBListGroup>

        </div>
      </MDBCol>
      <MDBCol md='4'>
        <div>
        <MDBListGroup horizontal horizontalSize='xxl' style={{paddingLeft:'20px'}}>
            <MDBListGroupItem flex-fill>Players from Algo</MDBListGroupItem>
          </MDBListGroup>
          <MDBListGroup style={ListStyle} >
            <MDBListGroupItem flex-fill mx='4'>Players from Algo</MDBListGroupItem>
            <MDBListGroupItem flex-fill mx='4'>Players from Algo</MDBListGroupItem>
            <MDBListGroupItem flex-fill mx='4'>Players from Algo</MDBListGroupItem>
            <MDBListGroupItem flex-fill mx='4'>Players from Algo</MDBListGroupItem>
            <MDBListGroupItem flex-fill mx='4'>Players from Algo</MDBListGroupItem>
            <MDBListGroupItem flex-fill mx='4'>Players from Algo</MDBListGroupItem>
            <MDBListGroupItem flex-fill mx='4'>Players from Algo</MDBListGroupItem>
            <MDBListGroupItem flex-fill mx='4'>Players from Algo</MDBListGroupItem>
            <MDBListGroupItem flex-fill mx='4'>Players from Algo</MDBListGroupItem>
            <MDBListGroupItem flex-fill mx='4'>Players from Algo</MDBListGroupItem>
            <MDBListGroupItem flex-fill mx='4'>Players from Algo</MDBListGroupItem>
            <MDBListGroupItem flex-fill mx='4'>Players from Algo</MDBListGroupItem>
            <MDBListGroupItem flex-fill mx='4'>Players from Algo</MDBListGroupItem>
            <MDBListGroupItem flex-fill mx='4'>Players from Algo</MDBListGroupItem>
          </MDBListGroup>
        </div>
      </MDBCol>
    </MDBRow>
    </MDBContainer>
  );
}
