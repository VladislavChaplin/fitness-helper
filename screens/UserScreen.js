import React, {useState, useEffect} from 'react';
import { Text, View, ActivityIndicator, Linking } from 'react-native';
import styled from 'styled-components/native';
import {Foundation, MaterialIcons, FontAwesome5, Ionicons} from '@expo/vector-icons';

import { GrayText, Button, Badge, Appointment, PlusButton } from "../components";

import { useRoute } from '@react-navigation/native';

import { phoneFormat } from "../utils";
import { usersApi } from '../utils/api';



const UserScreen = ({ navigation }) => {
    const [appointments, setAppointments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const route = useRoute();

    useEffect(() => {
        const id = route.params.user._id;
        console.log(id);
        usersApi
            .show(id)
            .then(({ data }) => {
                setAppointments(data.data.appointments);
                setIsLoading(false);
            }).catch(() => {
                setIsLoading(false);
        })
    }, []);

    return (
    <View style={{flex: 1}}>
        <UserDetails>
            <UserFullName>{route.params.user.fullname}</UserFullName>
            <GrayText>+{route.params.user.phone}</GrayText>

        <UserButton>
            <ProtocolButtonView>
                <Button>Тренировочный протокол</Button>
            </ProtocolButtonView>
            <PhoneButtonView>
                <Button onPress={() => Linking.openURL('tel:' + route.params.user.phone)} color="#84D269">
                    <Foundation name="telephone" size={22} color="white" />
                </Button>
            </PhoneButtonView>
        </UserButton>
        </UserDetails>

        <UserAppointment>
            <Container>
                {isLoading ? (
                    <ActivityIndicator size="large" color="#2A86FF" />
                ) : (
                    appointments.map(appointments => (
                    <AppointmentCard>
                    <AppointmentCardRow>
                        <FontAwesome5 name="clipboard-list" size={18} color="gray" />
                        <AppointmentCardLabel style={{ marginLeft: 8}}>Номер: <Text style={{ fontWeight: 'bold' }}>{appointments.dentNumber}</Text></AppointmentCardLabel>
                    </AppointmentCardRow>
                    <AppointmentCardRow>
                        <MaterialIcons name="fitness-center" size={18} color="gray" />
                        <AppointmentCardLabel style={{ marginLeft: 4}}>Тренировка: <Text style={{ fontWeight: 'bold' }}>{appointments.services}</Text></AppointmentCardLabel>
                    </AppointmentCardRow>
                    <AppointmentCardRow style={{ marginTop: 15, justifyContent: 'space-between'}}>
                        <Badge style={{ width: 165}} active>{appointments.date} - {appointments.time}</Badge>
                        <Badge style={{ marginRight: 38}} color="green">{appointments.price} тг</Badge>
                    </AppointmentCardRow>
                </AppointmentCard>
                )))}
            </Container>
        </UserAppointment>
        <PlusButton onPress={() => navigation.navigate('AddAppointment', {userID: route.params.user._id })} >
            <Ionicons name="ios-add" size={36} color="white" />
        </PlusButton>
    </View>
    );
}

const MoreButton = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 10px;
  top: 10px;
  height: 32px;
  width: 32px;
`;

const AppointmentCardLabel = styled.Text`
  font-size: 16px;
  margin-left: 10px;
`;

const AppointmentCardRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 3.5px;
  margin-top: 3.5px;
`;

const AppointmentCard = styled.View`
  shadow-color: gray;
  elevation: ${3};
  shadow-opacity: 0.7;
  shadow-radius: 3.5;
  padding: 20px 25px;
  border-radius: 10px;
  background: #F2F2F2;
  margin-bottom: 20px;
`;

const Container = styled.View`
    padding: 25px;
    flex: 1;
    background: white;
`;

const UserDetails = styled(Container)`
    flex: 0.3;
`;

const UserAppointment = styled.View`
    flex: 1;
    background: #F8FAFD;
`;

const ProtocolButtonView = styled.View`
    flex: 1;
`;

const PhoneButtonView = styled.View`
    margin-left: 10px;
    width: 45px;
`;


const UserButton = styled.View`
    display: flex;
    flex-direction: row;
    margin-top: 20px;
`;

const UserFullName = styled.Text`
    /* Имя клиента */
    font-weight: 800;
    font-size: 24px;
    line-height: 30px;
    margin-bottom: 3px;
`;




export default UserScreen;