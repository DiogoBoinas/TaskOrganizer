import React, {useState} from 'react';
import {Button, TextInput} from '@mantine/core';


import { app } from '../config/firebase'
import { getFirestore, setDoc, doc, collection } from 'firebase/firestore';



function AddNewBoardForm(props) {
    const {userId} = props;

    const [name, setName] = useState("");

    const db = getFirestore(app);


    const createNewBoard = () => {
        const ref = doc(collection(db,"boards"))
        setDoc(ref,{user:userId,boardName:name}).then((res)=>{
            props.func(ref.id)
        }
        )
        
    }


    return (
        <div>
            <TextInput label="New Board Name" placeholder="Enter your board name" value={name} onChange={(e) => setName(e.target.value)} required />
            <Button mt="xl" onClick={()=>createNewBoard()} disabled={name.trim()===""}>
                Create
            </Button>
        </div>
    )
}

export default AddNewBoardForm
