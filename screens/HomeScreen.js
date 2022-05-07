import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SectionList, Alert, TouchableOpacity } from 'react-native';
import { MaterialIcons, Ionicons   } from '@expo/vector-icons';
import styled from 'styled-components/native';
import axios from "axios";
import Swipeable from 'react-native-swipeable-row';
import { LogBox } from 'react-native';

import { Appointment, SectionTitle, PlusButton } from '../components';
import { usersApi, appointmentsApi } from '../utils/api';


import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const HomeScreen = ({ navigation, route }) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    LogBox.ignoreLogs(['Animated: `useNativeDriver`']);

    const fetchAppointments = () => {
            setIsLoading(true);
            appointmentsApi.get().then(({ data }) => {
                setData(data.data);
                setIsLoading(false);
            })
                .catch(e => {
                setIsLoading(false);
            });
    }

    useEffect( fetchAppointments, []);

    const removeAppointment = id => {
        Alert.alert(
            'Удаление записи на тренировку',
            'Вы действительно хотите удалить запись?',
            [
                {
                    text: 'Отмена',
                    onPress: () => console.log('Delete Pressed'),
                    style: 'cancel'
                },
                {
                    text: 'Удалить',
                    onPress: () => {
                        setIsLoading(true);
                        appointmentsApi
                            .remove(id)
                            .then(() => {
                                fetchAppointments();
                            })
                            .catch(() => {
                                setIsLoading(false);
                            });
                    }
                }
            ],
            { cancelable: false }
        );
    };

    return (
      <Container>
        {data && (
        <SectionList
            sections={data}
            keyExtractor={item => item._id}
            onRefresh={fetchAppointments}
            refreshing={isLoading}
            renderItem={({ item }) => (
        <Swipeable
            rightButtons={[
            <SwipeViewButton style={{ backgroundColor: '#B4C1CB' }}>
                <MaterialIcons name="edit" size={27} color="white" />
            </SwipeViewButton>,
            <SwipeViewButton
                onPress={removeAppointment.bind(this, item._id)}
                style={{ backgroundColor: '#F85A5A' }}>
                <Ionicons name="ios-close" size={32} color="white" />
            </SwipeViewButton>
        ]}>
            <Appointment navigate={navigation.navigate} item={item} />
        </Swipeable>
        )}
        renderSectionHeader={({ section: { title } }) =>
        <SectionTitle>{title}</SectionTitle>
        }
            />
        )}
        <PlusButton onPress={() => navigation.navigate('AddUser')} >
            <Ionicons name="ios-add" size={36} color="white" />
        </PlusButton>
      </Container>
    );
}

const SwipeViewButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 19%;
`;


const Container = styled.View`
  flex: 1;
  background: white;
`;

export default HomeScreen;
