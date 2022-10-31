import React from 'react'
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import './NavBar.css';
import { app } from '../config/firebase';
import { getAuth, signOut } from 'firebase/auth'

function AuthNavBar() {

    const authentication = getAuth(app);

    const logout = async() => {
        signOut(authentication).then((res)=>{
            window.location.href = '/login'
        }).catch((err)=>{
            alert(err)
        })
    }

    return (
        <div id="navbarcomp">
            <a href="/" id="logo"> <TaskAltIcon style={{ verticalAlign: 'middle' }} fontSize={"large"} /> <text>TaskOrganizer</text> </a>
            <ul id="nav">
                <a href="/boards" class="link"><li>Boards</li></a>
                <a href="/settings" class="link"><li>Settings</li></a>
                <li onClick={()=>logout()} style={{color:'lightcoral',cursor:'pointer'}}>Logout</li>
            </ul>
        </div>
    )
}

export default AuthNavBar
