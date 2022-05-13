import React, { useState, useEffect } from 'react';
import { FlatList, Alert, View } from 'react-native';
import {Ionicons, MaterialIcons} from '@expo/vector-icons';
import styled from 'styled-components/native';
import Swipeable from 'react-native-swipeable-row';
import {Box, Input} from 'native-base';
import { SearchBar } from '@rneui/themed';

import { Appointment, SectionTitle, PlusButton } from '../components';
import { usersApi, phoneFormat } from '../utils';
import { useRoute } from "@react-navigation/native";

const UsersScreen = props => {
    const route = useRoute();
    const { navigation } = props;
    const [data, setData] = useState(null);
    const [searchValue, setSearchValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const fetchPatients = () => {
        setIsLoading(true);
        usersApi
            .get()
            .then(({ data }) => {
                setData(data.data);
            })
            .finally(e => {
                setIsLoading(false);
            });
    };

    useEffect(fetchPatients, []);

    useEffect(fetchPatients, [route.params]);


    const onSearch = (searchValue) => {
        setSearchValue(searchValue);
    };

    const removePatient = id => {
        Alert.alert(
            'Удаление приема',
            'Вы действительно хотите удалить прием?',
            [
                {
                    text: 'Отмена',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel'
                },
                {
                    text: 'Удалить',
                    onPress: () => {
                        setIsLoading(true);
                        usersApi
                            .remove(id)
                            .then(() => {
                                fetchPatients();
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
                <>
                    <View style={{ padding: 10 }}>
                        <SearchBar
                            platform="android"
                            lightTheme="true"
                            placeholder="Поиск..."
                            onChangeText={onSearch}
                            value={searchValue}
                        />
                    </View>
                    <FlatList
                        data={data.filter(
                            item =>
                                item.fullname
                                    .toLowerCase()
                                    .indexOf(searchValue.toLowerCase()) >= 0
                        )}
                        keyExtractor={item => item._id}
                        onRefresh={fetchPatients}
                        refreshing={isLoading}
                        renderItem={({ item }) => (
                            <Swipeable
                                rightButtons={[
                                    <SwipeViewButton style={{ backgroundColor: '#B4C1CB' }}>
                                        <MaterialIcons name="edit" size={27} color="white" />
                                    </SwipeViewButton>,
                                    <SwipeViewButton
                                        onPress={removePatient.bind(this, item._id)}
                                        style={{ backgroundColor: '#F85A5A' }}
                                    >
                                        <Ionicons name="ios-close" size={32} color="white" />
                                    </SwipeViewButton>
                                ]}
                            >
                                <Appointment
                                    navigate={navigation.navigate}
                                    item={{
                                        user: item,
                                        services: phoneFormat(item.phone)
                                    }}
                                />
                            </Swipeable>
                        )}
                        renderSectionHeader={({ section: { title } }) => (
                            <SectionTitle>{title}</SectionTitle>
                        )}
                    />
                </>
            )}
            <PlusButton onPress={navigation.navigate.bind(this, 'AddUser')}>
                <Ionicons name="ios-add" size={36} color="white" />
            </PlusButton>
        </Container>
    );
};


const SwipeViewButton = styled.TouchableOpacity`
  width: 75px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.View`
  flex: 1;
  background: white;
`;

export default UsersScreen;