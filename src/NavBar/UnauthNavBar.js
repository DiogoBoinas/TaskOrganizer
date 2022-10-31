import React from 'react'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import './NavBar.css'


function UnauthNavBar() {
    return (
        <div id="navbarcomp">
            <a href="/" id="logo"> <TaskAltIcon style={{ verticalAlign: 'middle' }} fontSize={"large"} /> <text>TaskOrganizer</text> </a>
            <ul id="nav">
                <a href="/login" class="link"><li><AccountCircleOutlinedIcon style={{ verticalAlign: 'middle', paddingRight:'10px' }}/>Login</li></a>
            </ul>
        </div>
    )
}

export default UnauthNavBar
