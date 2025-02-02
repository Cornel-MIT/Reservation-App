import { View, Text } from 'react-native'
import React from 'react'
import AdminDashboardScreen from './AdminDashboardScreen'
import CreateAdminScreen from './CreateAdminScreen'
import DashboardScreen from './DashboardScreen'
import LoginScreen from './LoginScreen'
import RegisterScreen from './RegisterScreen'
import Reservation from './Reservation'
import RestaurantCreationPage from './RestaurantCreationPage'
import ManageReservations from './ManageReservations'
import SuperAdminDashboardScreen from './SuperAdminDashboardScreen'


const AdminScreens = () => {
  return (
     <>
     <AdminDashboardScreen />
     <CreateAdminScreen />
     <DashboardScreen />
     <ManageReservations />
     <LoginScreen />
     <prompt />
     <RegisterScreen />
     <Reservation />
     <RestaurantCreationPage />
     <SuperAdminDashboardScreen />
     </>
  )
}

export default AdminScreens