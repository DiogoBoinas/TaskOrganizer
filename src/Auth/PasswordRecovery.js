import React, { useState } from 'react'
import {
    createStyles,
    Paper,
    Title,
    Text,
    TextInput,
    Button,
    Container,
    Group,
    Anchor,
    Center,
    Box,
} from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons';
import { Link } from 'react-router-dom'
import { app } from '../config/firebase';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth'

const useStyles = createStyles((theme) => ({
    title: {
        fontSize: 26,
        fontWeight: 900,
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    },

    controls: {
        [theme.fn.smallerThan('xs')]: {
            flexDirection: 'column-reverse',
        },
    },

    control: {
        [theme.fn.smallerThan('xs')]: {
            width: '100%',
            textAlign: 'center',
        },
    },
}));



export default function PasswordRecovery() {
    const { classes } = useStyles();
    const [email, setEmail] = useState("");

    const recoverPassword = async() =>{
        const authentication = getAuth(app);
        sendPasswordResetEmail(authentication, email).then((res)=>{
            alert("An email was sent to reset the password!")
            setEmail("")
        }).catch((err)=>{
            alert(err)
        })
    }

    return (
        <Container size={460} my={30}>
            <Title className={classes.title} align="center">
                Forgot your password?
        </Title>
            <Text color="dimmed" size="sm" align="center">
                Enter your email to get a reset link
        </Text>

            <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
                <TextInput label="Email" placeholder="Your Email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
                <Group position="apart" mt="lg" className={classes.controls}>
                    <Anchor color="dimmed" size="sm" component={Link} to="/login" className={classes.control}>
                        <Center inline>
                            <IconArrowLeft size={12} stroke={1.5} />
                            <Box ml={5}>Back to login page</Box>
                        </Center>
                    </Anchor>
                    <Button className={classes.control} onClick={()=>recoverPassword()}>Reset password</Button>
                </Group>
            </Paper>
        </Container>
    );
}