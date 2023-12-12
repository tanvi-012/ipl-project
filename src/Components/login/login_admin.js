import React, { useState } from 'react';
import { useNavigate } from "react-router-dom"
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBCheckbox
}
from 'mdb-react-ui-kit';
import {getAuth,signInWithEmailAndPassword} from 'firebase/auth';
import logo from '../../images/ipl_logo.jpg';

function AdminLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const auth = getAuth()
    const navigate = useNavigate();
        async function handleSignIn(e){
          e.preventDefault();
      signInWithEmailAndPassword(auth,email,password)
      .then((user) => {
          // Success...
          console.log(user)
          navigate('/admindb')
          //...
      })
      .catch((error) => {
          // Error
          console.log(error)
      })
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
              <form>
              <h1>Login</h1>
              <div className="d-flex mb-4">
                <a href="./team">Team</a>
                <div className='mx-4'><a href="./">Admin</a></div>
  
              </div>
              <MDBInput wrapperClass='mb-4' label='Email address' id='form1' type='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
              <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password' value={password} onChange={(e) => setPassword(e.target.value)}/>

              <MDBBtn className="mb-4 w-100" onClick={(e) => {handleSignIn(e)}}>Sign in</MDBBtn>
              </form>
            </MDBCardBody>

          </MDBCol>

        </MDBRow>

      </MDBCard>
    </MDBContainer>
  );
}

export default AdminLogin;