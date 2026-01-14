import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({publicPage=false}) => {
    const {user}=useSelector((state)=>state.auth);
    if(publicPage){
        return user ? <Navigate to="/"/> :<Outlet />
        //public page hai and user logged in hai to home nahi t outlet 
    }
    return user? <Navigate to="/" /> : <Navigate to="/login"/>
}

export default PrivateRoute
