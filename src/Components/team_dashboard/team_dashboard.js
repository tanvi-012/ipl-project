import React from 'react';
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
  return (
    <MDBContainer className='my-5'>
      <MDBRow className='g-0 d-flex align-items-center mb-4'>
        <MDBCol md='8'>
          <MDBCard alignment='center'>
          <PlayerCard/>
        </MDBCard>
      </MDBCol>
      <MDBCol md='4'>
          <div className='mx-4 mb-4'><TimerComponent></TimerComponent></div>
          <div className='mx-4 mb-4'>Previous Bid</div>
          <MDBBtn className="mb-4 mx-4" href='#'>Bid Amount | Bid</MDBBtn>
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
