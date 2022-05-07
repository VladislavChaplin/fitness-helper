import React, { useState } from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';

import { NativeBaseProvider, Box, FormControl, Input, Center, Stack, Text } from "native-base";
import Ionicons from '@expo/vector-icons/Ionicons';

import { usersApi } from "../utils/api";

import { GrayText, Button } from "../components";


const AddUserScreen = ({ route, navigation }) => {
    const [values, setValues] = useState({});

    const handleChange = (name, e) => {
        const text = e.nativeEvent.text;
        setValues({
            ...values,
            [name]: text,
        });
    };

    const onSubmit = () => {
        usersApi
            .add(values)
            .then(() => {
                navigation.navigate('Home');
            })
            .catch(e => {
                alert('Ошибка! Пользователь не добавлен.');
            });
    };

    return (
        <Container>
            <NativeBaseProvider>
                <Box flex={1} >
                    <FormControl.Label>Имя и фамилия</FormControl.Label>
                    <Input onChange={handleChange.bind(this, 'fullname')} value={values.fullname} autoFocus variant="underlined"  size="xl" />
                    <FormControl.Label style={{ paddingTop: 15 }}>Номер телефона</FormControl.Label>
                    <Input onChange={handleChange.bind(this, 'phone')} value={values.phone} keyboardType="phone-pad" dataDetectorTypes="phoneNumber" variant="underlined"  size="xl" />

                    <AddButtonStyle>
                        <Button onPress={onSubmit} color="#87CC6F">+ Добавить</Button>
                    </AddButtonStyle>
                </Box>
            </NativeBaseProvider>
        </Container>
    );
};

const AddButtonStyle = styled.View`
  margin-top: 35px;
`;

const Container = styled.View`
    padding: 25px;
    flex: 1;
    background: white;
`;



export default AddUserScreen;