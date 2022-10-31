import Login from '../Auth/Login';
import { useAuth } from '../Auth/useAuth';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Loader, Center } from '@mantine/core';


export const ProtectedRoute = () => {
  const user = useAuth();


  return typeof user === 'undefined' ? (
    <Center style={{ width: '100vw', height: '90vh' }}>
      <Loader size="xl" />
    </Center>
  ) : user ? (
    <Outlet />
  ) : (
    <Login />
  );
};