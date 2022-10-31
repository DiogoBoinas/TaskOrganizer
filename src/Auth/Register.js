import React, { useState } from 'react';
import {
    TextInput,
    PasswordInput,
    Center,
    Box,
    Anchor,
    Paper,
    Title,
    Text,
    Container,
    Group,
    Button,
    createStyles
} from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons';
import { Link, useNavigate } from 'react-router-dom';
import validator from 'validator';
import { app } from '../config/firebase';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';



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

function Register() {
    const { classes } = useStyles();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");

    const navigate = useNavigate();


    const signUpAction = async() =>{
        const authentication = getAuth(app);
        createUserWithEmailAndPassword(authentication, email, password).then((res)=>{
            navigate('/',{replace:true});
        }).catch((err)=>{
            alert(err)
        })


    }

    return (
        <Container size={420} my={40}>
            <Title
                align="center"
                sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
            >
                Sign Up On TaskOrganizer
                </Title>

            <Text color="dimmed" size="sm" align="center" mt={5}>
                Be more efficient!
                </Text>

            <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                <TextInput label="Email" placeholder="Your email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
                <PasswordInput label="Password" placeholder="Your password" value={password} onChange={(e)=>setPassword(e.target.value)} required mt="md" />
                <PasswordInput label="Password Confirmation" placeholder="Your password" value={passwordConfirmation} onChange={(e)=>setPasswordConfirmation(e.target.value)} required mt="md" />
                <Group position="apart" mt="lg" className={classes.controls}>
                    <Anchor color="dimmed" size="sm" component={Link} to="/login" className={classes.control}>
                        <Center inline>
                            <IconArrowLeft size={12} stroke={1.5} />
                            <Box ml={5}>Back to login page</Box>
                        </Center>
                    </Anchor>
                    <Button onClick={()=>signUpAction()} className={classes.control} disabled={email.trim()===""||!(validator.isEmail(email))||password.length<6||passwordConfirmation!==password}>Sign Up</Button>
                </Group>
            </Paper >
        </Container >
    )
}

export default Register
