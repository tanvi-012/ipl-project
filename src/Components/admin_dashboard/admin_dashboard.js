import React from 'react';
import { MDBRow, MDBCol,MDBBtn,MDBContainer, MDBBtnGroup ,MDBCard,
    MDBCardHeader,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText} from 'mdb-react-ui-kit';

export default function AdminDashboard() {
    return (
    <MDBContainer className='my-5'>
        <MDBRow className='g-0 d-flex align-items-center'>
            <MDBCol md='6'><div>Bid Amount| Bid Team</div></MDBCol>
            <MDBCol md='6'>
                Timer 
                <MDBBtn className="mx-4 w-30">Stop</MDBBtn>
            </MDBCol>
        </MDBRow>
        <MDBRow className='g-0 d-flex align-items-center' style={{paddingTop:'20px',paddingBottom:'20px'}}>
            <MDBBtnGroup shadow='0'>
            <MDBBtn color='secondary' style={{margin:'4px'}}>
            Batsman
            </MDBBtn>
            <MDBBtn color='secondary' style={{margin:'4px'}}>
            Bowler
            </MDBBtn>
            <MDBBtn color='secondary' style={{margin:'4px'}}>
            All Rounder
            </MDBBtn>
            <MDBBtn color='secondary' style={{margin:'4px'}}>
            Wicketkeeper
            </MDBBtn>
        </MDBBtnGroup>
        </MDBRow>
        <MDBRow className='g-0 d-flex align-items-center' style={{paddingTop:'20px',paddingBottom:'20px'}}>
            <MDBCol className='d-flex align-items-center'>
            <MDBCard style={{width:'400px',alignItems:'center', margin:'0 auto'}}>
                <MDBCardHeader>Batsmen</MDBCardHeader>
                <MDBCardBody>
                    <MDBCardTitle>Player Name</MDBCardTitle>
                    <MDBCardText>Player Stats</MDBCardText>
                    <MDBCardText>Player Stats</MDBCardText>
                    <MDBBtn href='#'>Start Bid</MDBBtn>
                </MDBCardBody>
            </MDBCard>
            </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }