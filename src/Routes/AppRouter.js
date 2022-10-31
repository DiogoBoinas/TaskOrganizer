import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {ProtectedRoute} from './ProtectedRoute';
import Boards from '../Boards/Boards';
import Settings from '../Settings';
import Login from '../Auth/Login';
import Register from '../Auth/Register';
import PasswordRecovery from '../Auth/PasswordRecovery';

function AppRouter() {
    //Adicionar CheckRoutes nos Boards e Settings
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<ProtectedRoute/>}> 
                    <Route path="/boards" element={<Boards/>} />
                    <Route path="/settings" element={<Settings/>}/>
                </Route>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/passwordrecovery" element={<PasswordRecovery/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter
