import React, { useState, useEffect } from 'react';
import {
    Card,
    Center,
    SimpleGrid,
    Text,
    Modal,
    Loader
} from '@mantine/core';
import { IconCirclePlus } from '@tabler/icons';
import './Boards.css'

import { app } from '../config/firebase';
import { getAuth } from 'firebase/auth';

import { useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";



import AddNewBoardForm from './AddNewBoardForm';
import { boardActions } from '../redux/boards'


function Boards() {

    const [opened, setOpened] = useState(false);
    const [boardsState, setBoardsState] = useState(null)

    const auth = getAuth(app);
    const navigate = useNavigate()
    const dispatch = useDispatch();



    useEffect(() => {
        const populateState = async () => {
            const res = await dispatch(boardActions.fetchBoardsByUserId())
            return res.payload;
        }
        const getAllBoards = async () => {
            let arr = await populateState();
            setBoardsState(arr)
        }
        getAllBoards()
    }, [])

    const navigateToBoard = (data) => {
        navigate(`/board`, { replace: true, state: { id: data } })
    }

    if (boardsState == null) {
        return (
            <Center style={{ width: '100vw', height: '90vh' }}>
                <Loader size="xl" />
            </Center>)
    }

    return (
        <div class="grid">
            <Modal
                opened={opened}
                onClose={() => setOpened(false)}
                title="Create New Board!"
                centered
                transition="fade"
                transitionDuration={1000}
                transitionTimingFunction="ease"
            >
                {<AddNewBoardForm userId={auth.currentUser.uid} func={navigateToBoard} />}
            </Modal>
            <Card shadow="sm" p="lg" radius="md" withBorder style={{ height: '150px', display: 'flex', flexDirection: 'column', justifyContent: 'center', cursor: 'pointer', marginTop: '32px' }} onClick={() => setOpened(true)}>
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
            <div class="title">
                <Text
                    color="rgba(9,9,121,1)"
                    weight={700}
                    size="xl"
                >Boards</Text>
            </div>
            <SimpleGrid mt={"xl"} cols={4}>
                {boardsState && boardsState.map((item) => {
                    return (
                        <Card shadow="sm" p="lg" radius="md" withBorder style={{ height: '150px', display: 'flex', flexDirection: 'column', justifyContent: 'center', cursor: 'pointer' }} onClick={() => navigate(`/board`, { replace: true, state: { id: item.id } })}>
                            <Card.Section >
                                <Center>
                                    <Text size={"xl"}>{item.boardName}</Text>
                                </Center>
                            </Card.Section>
                        </Card>

                    )

                })}
            </SimpleGrid>

        </div>
    )
}

export default Boards
