import React from "react";
import { useDispatch } from "react-redux";
import {startTimer} from '../actions/actions';
import { store } from "../store/store";

const TimerControl = () => {
    const dispatch = useDispatch();

    const handleStartTimer = () => {
        store.dispatch(startTimer());
        console.log(startTimer());
    };
return(
    <div>
        <button onClick={handleStartTimer}>Start Bid</button>
    </div>
);
}
export default TimerControl;