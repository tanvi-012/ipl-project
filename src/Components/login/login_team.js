import React, { useState } from 'react';
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
import {signInWithEmailAndPassword} from 'firebase/auth';
import {auth} from "../../firebase";
import logo from '../../images/ipl_logo.jpg';

function TeamLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const signIn =(e)=>{
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
         console.log(userCredential);
      })
      .catch((errror) =>{
        console.log(errror);

      });
  };
  return (
    <MDBContainer className='my-5'>
      <MDBCard>

        <MDBRow className='g-0 d-flex align-items-center'>

          <MDBCol md='4'>
            <MDBCardImage src={logo} alt='phone' className='rounded-t-5 rounded-tr-lg-0' fluid />
          </MDBCol>

          <MDBCol md='8'>

            <MDBCardBody>
              <form onSubmit={signIn}>
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
              <MDBInput wrapperClass='mb-4' label='Email address' id='form1' type='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
              <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password' value={password} onChange={(e) => setPassword(e.target.value)}/>

              <div className="d-flex justify-content-between mx-4 mb-4">
                <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
                <a href="!#">Forgot password?</a>
              </div>

              <MDBBtn className="mb-4 w-100">Sign in</MDBBtn>
            </form>
            </MDBCardBody>

          </MDBCol>

        </MDBRow>

      </MDBCard>
    </MDBContainer>
  );
}

export default TeamLogin;