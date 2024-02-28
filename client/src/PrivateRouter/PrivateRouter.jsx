import React, { useContext } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthProvider';
import Modal from '../components/Modal';
const PrivateRouter = ({ children }) => {
    const { user } = useContext(AuthContext);
    const location = useLocation();
    if (user) {
        return children
    }
    return <Navigate to={"/signin"} state={{from: location}} replace/>
}

export default PrivateRouter