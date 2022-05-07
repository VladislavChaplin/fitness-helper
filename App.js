import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { HomeScreen, UserScreen, AddUserScreen, AddAppointmentScreen } from "./screens";

import { NativeBaseProvider, Text, Box } from 'native-base';


const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            elevation: 0.8,
            shadowOpacity: 0.8
          },
          headerTintColor: '#2A86FF'
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Тренировки' }}
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

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;