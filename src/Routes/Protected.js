import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../Contexts/AuthContext";

export default function Protected({children}){
    const {user} = useContext(Context);

    if(!user){
        return <Navigate to="/" replace/>
    }else{
        return children;
    }
}