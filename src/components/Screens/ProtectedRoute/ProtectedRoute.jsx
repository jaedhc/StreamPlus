import React from 'react';
import { Navigate } from 'react-router-dom';

export function ProtectedRoute({ children }) {
    const token = localStorage.getItem('authToken'); // Verifica si existe un token de autenticación
    return token ? children : <Navigate to="/home" />;
}