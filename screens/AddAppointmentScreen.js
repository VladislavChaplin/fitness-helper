import React, { useState } from 'react';
import { TouchableOpacity, View} from 'react-native';
import styled from 'styled-components/native';

import { NativeBaseProvider, Box, FormControl, Input, Center, Stack } from "native-base";
import Ionicons from '@expo/vector-icons/Ionicons';

import { appointmentsApi } from "../utils/api";

import { GrayText } from "../components";

import { Button, Text } from "native-base";

import DateTimePicker from '@react-native-community/datetimepicker';
import { useRoute } from "@react-navigation/native";



const AddAppointmentScreen = ({ navigation }) => {
    const route = useRoute();

    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [values, setValues] = useState({
        services: '',
        dentNumber: '',
        price: '',
        date: '',
        time: '',
        user: route.params.userID
    });
    const fieldsName = {
        services: 'Тип тренировки',
        dentNumber: 'Номер тренировки',
        price: 'Цена',
        date: 'Дата',
        time: 'Время'
    };
    const setFieldValue = (name, value) => {
        setValues({
            ...values,
            [name]: value
        });
    };



    const handleInputChange = (name, e) => {
        const text = e.nativeEvent.text;
        setFieldValue(name, text);
    };

    const onSubmit = () => {
        appointmentsApi
            .add(values)
            .then(() => {
                navigation.navigate('Home', { lastUpdate: new Date() });
            })
            .catch(e => {
                if (e.response.data && e.response.data.message) {
                    e.response.data.message.forEach(err => {
                        console.log(e);
                        console.log(values);
                        const fieldName = err.param;
                        alert(`Ошибка! Поле "${fieldsName[fieldName]}" указано неверно.`);
                    });
                }
            });
    };

    //Указатель даты и времени

    const onChange = (event, selectedValue) => {

        setShow(Platform.OS === 'ios');
        if (mode == 'date') {
            const currentDate = selectedValue || new Date();
            setDate(currentDate);

            let tempDate = new Date(currentDate);
            let fDate = tempDate.getFullYear() + '-' + (tempDate.getMonth() + 1) + '-' + tempDate.getDate();
            setFieldValue('date', fDate)
            console.log(fDate);
            setMode('time');
            setShow(Platform.OS !== 'ios'); // to show the picker again in time mode
        } else {
            const selectedTime = selectedValue || new Date();
            setTime(selectedTime);

            let tempTime = new Date(selectedTime);
            let fTime = tempTime.getHours() + ':' + tempTime.getMinutes();
            setFieldValue('time', fTime)
            console.log(fTime);
            setShow(Platform.OS === 'ios');
            setMode('date');
        }
    };
    const formatDate = (date, time) => {
        return `${date.getFullYear()}-${date.getMonth() +
        1}-${date.getDate()} - ${time.getHours()}:${time.getMinutes()}`;
    };

    const showMode = currentMode => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };


    return (
        <Container>
            <NativeBaseProvider>
                <Box flex={1} >
                    <FormControl.Label>Номер тренировки</FormControl.Label>
                    <Input onChange={handleInputChange.bind(this, 'dentNumber')} value={values.dentNumber} keyboardType="numeric" variant="underlined"  size="xl" autoFocus />
                    <FormControl.Label style={{ paddingTop: 15 }}>Тип тренировки</FormControl.Label>
                    <Input onChange={handleInputChange.bind(this, 'services')} value={values.services} variant="underlined"  size="xl" />
                    <FormControl.Label style={{ paddingTop: 15 }}>Стоимость</FormControl.Label>
                    <Input onChange={handleInputChange.bind(this, 'price')} value={values.price} variant="underlined" keyboardType="numeric"  size="xl" />
                    <View>
                        <FormControl.Label style={{ paddingTop: 15 }}>Дата и время</FormControl.Label>
                        <FormControl.Label style={{ borderBottomWidth: 1, borderBottomColor: "#D4D4D4", paddingBottom: 11 }}>
                            <TouchableOpacity onPress={showDatepicker} style={{ paddingTop: 3, paddingLeft: 0 }}><Text fontSize="lg">{formatDate(date, time)}</Text></TouchableOpacity>
                            {show && (
                                <DateTimePicker
                                    testID='dateTimePicker'
                                    timeZoneOffsetInMinutes={0}
                                    value={date}
                                    mode={mode}
                                    is24Hour={true}
                                    display='default'
                                    date={values.date}
                                    time={values.time}
                                    onChange={onChange}
                                />
                            )}
                        </FormControl.Label>
                    </View>
                    <AddButton>
                        <ButtonCustom onPress={onSubmit} color="#87CC6F"><ButtonText>+ Добавить</ButtonText></ButtonCustom>
                    </AddButton>
                </Box>
            </NativeBaseProvider>
        </Container>
    );
};

const TimeRowButton = styled.View`
  flex-direction: row;
  paddingTop: 15;
  paddingLeft: 0;
`;

const AddButton = styled.View`
  margin-top: 35px;
`;

const ButtonText = styled.Text`
    color: white;
    font-weight: 400;
    font-size: 16px;
`;

const ButtonCustom = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  background: ${props => props.color};
  height: 45px;
`;

const Container = styled.View`
    padding: 25px;
    flex: 1;
    background: white;
`;



export default AddAppointmentScreen;