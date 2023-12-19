import React from "react";
import io from 'socket.io-client';
import { MDBBtn } from "mdb-react-ui-kit";

const socket = io.connect("http://127.0.0.1:5000");

const TimerControl = () => {
    const handleStartTimer = () => {
        socket.emit('running',1);
        console.log('inside handle timer');
    };
return(
    <div style={{  alignItems: 'center', margin: '0 auto' }}>
        <MDBBtn onClick={handleStartTimer}>Start Bid</MDBBtn>
    </div>
);
}
export default TimerControl;