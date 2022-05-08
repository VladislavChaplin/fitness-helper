import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';

import {HomeScreen, UserScreen, AddUserScreen, AddAppointmentScreen, UsersScreen} from "./screens";

import {NativeBaseProvider, Text, Box, Button} from 'native-base';


const Stack = createNativeStackNavigator();


function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
          screenOptions={({ navigation }) => ({
              headerStyle: {
                  elevation: 0.8,
                  shadowOpacity: 0.8,
              },
              headerTintColor: '#2A86FF'
          })}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={({ navigation }) => ({
              title: 'Тренировки',
              headerRight: () => (
                  <TouchableOpacity onPress={() => navigation.navigate('Users')}>
                      <Ionicons name="people" size={24} color="black" />
                  </TouchableOpacity> )
          })}
        />
        <Stack.Screen
          name="User"
          component={UserScreen}
          options={{ title: 'Клиент'}}
        />
        <Stack.Screen
              name="AddUser"
              component={AddUserScreen}
              options={{ title: 'Добавить клиента'}}
        />
        <Stack.Screen
              name="AddAppointment"
              component={AddAppointmentScreen}
              options={{ title: 'Добавить тренировку'}}
        />
        <Stack.Screen
              name="Users"
              component={UsersScreen}
              options={{ title: 'Клиенты' }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;