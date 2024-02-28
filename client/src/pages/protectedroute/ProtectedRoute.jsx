import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthProvider';
import Modal from '../../components/Modal';

const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const from = location?.state?.from?.pathname || "/";
    const next = (from) => {
        if (!user) {
            // ถ้าไม่มีผู้ใช้งาน ให้แสดง Modal component ขึ้นมา
            return <Modal />;
        } else {
            // ถ้ามีผู้ใช้งานให้นำไปยังหน้าที่ต้องการ
            navigate(from, { replace: true });
        }
    };

    return children;
};

export default ProtectedRoute;
