import React from 'react'
import {useLocation} from 'react-router-dom'

function Board() {

    const { state } = useLocation();
    const { id } = state
    return (
        <div>{id}</div>
    )
}

export default Board