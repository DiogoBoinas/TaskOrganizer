import React, { useState } from 'react';
import {
    Card,
    Center,
    SimpleGrid,
    Text,
    Modal
} from '@mantine/core';
import { IconCirclePlus } from '@tabler/icons';
import './Boards.css'

import { app } from '../config/firebase'
import { getAuth } from 'firebase/auth';

import AddNewBoardForm from './AddNewBoardForm';

function Boards() {

    const [opened, setOpened] = useState(false);

    const auth = getAuth(app);


    const navigateToBoard = (data) =>{
        if(data==="Success"){
            //Navegarparaquadro
        }
    }

    return (
        <div class="grid">
            <h1>Boards</h1>
            <Modal
                opened={opened}
                onClose={() => setOpened(false)}
                title="Create New Board!"
                centered
                transition="fade"
                transitionDuration={1000}
                transitionTimingFunction="ease"
            >
                {<AddNewBoardForm userId={auth.currentUser.uid} func={navigateToBoard}/>}
            </Modal>
            <SimpleGrid cols={4}>
                <Card shadow="sm" p="lg" radius="md" withBorder style={{ height: '150px', display: 'flex', flexDirection: 'column', justifyContent: 'center', cursor: 'pointer' }} onClick={() => setOpened(true)}>
                    <Card.Section >
                        <Center>
                            <IconCirclePlus size={50} />
                        </Center>
                    </Card.Section>
                    <Card.Section >
                        <Center>
                            <Text>Add New Board</Text>
                        </Center>
                    </Card.Section>
                </Card>
            </SimpleGrid>
        </div>
    )
}

export default Boards
