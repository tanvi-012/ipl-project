import React from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBCheckbox,
  MDBDropdown,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBDropdownToggle
}
from 'mdb-react-ui-kit';
import logo from '../../images/ipl_logo.jpg';

function TeamLogin() {
  return (
    <MDBContainer className='my-5'>
      <MDBCard>

        <MDBRow className='g-0 d-flex align-items-center'>

          <MDBCol md='4'>
            <MDBCardImage src={logo} alt='phone' className='rounded-t-5 rounded-tr-lg-0' fluid />
          </MDBCol>

          <MDBCol md='8'>

            <MDBCardBody>
              <h1>Login</h1>
              <div className="d-flex mb-4">
                <a href="./team">Team</a>
                <div className='mx-4'><a href="./">Admin</a></div>
              </div>
              <div className="d-flex mb-4">
              <MDBDropdown>
                <MDBDropdownToggle color='secondary'>Choose your team</MDBDropdownToggle>
                <MDBDropdownMenu dark>
                    <MDBDropdownItem link>MI</MDBDropdownItem>
                    <MDBDropdownItem link>CSK</MDBDropdownItem>
                    <MDBDropdownItem link>RCB</MDBDropdownItem>
                    <MDBDropdownItem link>GT</MDBDropdownItem>
                    <MDBDropdownItem link>RR</MDBDropdownItem>
                    <MDBDropdownItem link>PK</MDBDropdownItem>
                    <MDBDropdownItem link>DC</MDBDropdownItem>
                    <MDBDropdownItem link>SRH</MDBDropdownItem>
                    <MDBDropdownItem link>LSG</MDBDropdownItem>
                    <MDBDropdownItem link>KKR</MDBDropdownItem>
                </MDBDropdownMenu>
                </MDBDropdown>
                </div>
              <MDBInput wrapperClass='mb-4' label='Email address' id='form1' type='email'/>
              <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password'/>

              <div className="d-flex justify-content-between mx-4 mb-4">
                <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
                <a href="!#">Forgot password?</a>
              </div>

              <MDBBtn className="mb-4 w-100">Sign in</MDBBtn>

            </MDBCardBody>

          </MDBCol>

        </MDBRow>

      </MDBCard>
    </MDBContainer>
  );
}

export default TeamLogin;