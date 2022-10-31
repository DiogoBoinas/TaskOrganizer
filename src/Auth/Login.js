import React, { useState } from 'react';
import {
    TextInput,
    PasswordInput,
    Divider,
    Anchor,
    Paper,
    Title,
    Text,
    Container,
    Group,
    Button,
    Center
} from '@mantine/core';
import { Link, useNavigate } from 'react-router-dom';
import { app } from '../config/firebase';
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { GoogleIcon } from '../Icons/GoogleIcon'

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const authentication = getAuth(app);

    const signUpAction = async () => {
        signInWithEmailAndPassword(authentication, email, password).then((res) => {
            navigate('/', { replace: true });
        }).catch((err) => {
            alert(err)
        })
    }

    const signUpWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(authentication, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                const user = result.user;
                navigate('/', { replace: true });
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorMessage)
            });
    }

    return (
        <Container size={420} my={40}>
            <Title
                align="center"
                sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
            >
                Welcome back!
                </Title>

            <Text color="dimmed" size="sm" align="center" mt={5}>
                Do not have an account yet?{' '}
                <Anchor to="/register" component={Link} size="sm">
                    Create account
                    </Anchor>
            </Text>

            <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                <Center>
                    <Button leftIcon={<GoogleIcon />} variant="default" onClick={()=>signUpWithGoogle()}>
                        Sign In With Google
                    </Button>
                </Center>

                <Divider label="Or continue with email" labelPosition="center" my="lg" />
                <TextInput label="Email" placeholder="Your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <PasswordInput label="Password" placeholder="Your password" value={password} onChange={(e) => setPassword(e.target.value)} required mt="md" />
                <Group mt="md">
                    <Anchor component={Link} to="/passwordrecovery" size="sm">
                        Forgot password?
                    </Anchor>
                </Group>
                <Button fullWidth onClick={() => signUpAction()} mt="xl">
                    Sign in
                </Button>
            </Paper >
        </Container >
    )
}

export default Login
