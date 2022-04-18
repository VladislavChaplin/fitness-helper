import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SectionList } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import styled from 'styled-components/native';

import { Appointment, SectionTitle } from './components';

const DATA = [
  {
    title: "18 Апреля",
    data: [
      {
       active: true,
       time: '15:30',
       services: 'Силовая тренировка Gym',
       user: {
           fullname: 'Данил Иванов',
           avatar: 'https://sun2.dataix-kz-akkol.userapi.com/s/v1/if1/nr91rVZrKn-7NMyjtDGsQNj-pHRT0RgwMQb1HmQuuw5FpUmBRgBKifBNyf5SwgZVLdjV0tlj.jpg?size=100x100&quality=96&crop=0,237,606,606&ava=1'
         }
       },
       {
         time: '16:30',
         services: 'Фитнес тренировка',
         user: {
             fullname: 'Глеб Черкасов',
             avatar: 'https://sun2.dataix-kz-akkol.userapi.com/s/v1/ig2/zypD5gzFGKam0I1yCzMKBwYLjkUf4j40pSFc16E2uyeWP9ZvfTZi5_C32TfP6VYpbEsyzdWpMvj-JpBVkMPl8_mw.jpg?size=100x100&quality=95&crop=247,511,1443,1443&ava=1'
           }
       },
       {
        time: '15:30',
        services: 'Силовая тренировка Gym',
        user: {
            fullname: 'Данил Иванов',
            avatar: 'https://sun2.dataix-kz-akkol.userapi.com/s/v1/if1/nr91rVZrKn-7NMyjtDGsQNj-pHRT0RgwMQb1HmQuuw5FpUmBRgBKifBNyf5SwgZVLdjV0tlj.jpg?size=100x100&quality=96&crop=0,237,606,606&ava=1'
          }
        },
        {
          time: '16:30',
          services: 'Фитнес тренировка',
          user: {
              fullname: 'Глеб Черкасов',
              avatar: 'https://sun2.dataix-kz-akkol.userapi.com/s/v1/ig2/zypD5gzFGKam0I1yCzMKBwYLjkUf4j40pSFc16E2uyeWP9ZvfTZi5_C32TfP6VYpbEsyzdWpMvj-JpBVkMPl8_mw.jpg?size=100x100&quality=95&crop=247,511,1443,1443&ava=1'
            }
        }
     ]
  },
  {
    title: "20 Апреля",
    data: [
         {
          time: '16:45',
          services: 'Лёгкая атлетика',
          user: {
              fullname: 'Кирилл Курков',
              avatar: 'https://sun2.dataix-kz-akkol.userapi.com/s/v1/ig2/BwQt0wx85rdI_JmX1FiGUYU0p7IuXt_iNSKLoESuBM46m8GxJLrCtYqkfvcpig_DG15kZwZaf-ZAx19wYCSqcjVb.jpg?size=100x100&quality=96&crop=438,78,901,901&ava=1'
            }
          },
          {
            time: '18:20',
            services: 'Пилатес',
            user: {
                fullname: 'Ясмина Павлова',
                avatar: 'https://sun1.dataix-kz-akkol.userapi.com/s/v1/ig2/RnpZlbJWwtEZZfH0Ji2CMjmOnjPg7Ecb3BydGWhtaiRsOQ7uPvDnloiV9_s57riDhua-xUzcoKJwz6W4sTQWJifp.jpg?size=100x100&quality=95&crop=0,660,1080,1080&ava=1'
              }
          },
          {
            time: '15:30',
            services: 'Силовая тренировка Gym',
            user: {
                fullname: 'Данил Иванов',
                avatar: 'https://sun2.dataix-kz-akkol.userapi.com/s/v1/if1/nr91rVZrKn-7NMyjtDGsQNj-pHRT0RgwMQb1HmQuuw5FpUmBRgBKifBNyf5SwgZVLdjV0tlj.jpg?size=100x100&quality=96&crop=0,237,606,606&ava=1'
              }
            },
            {
              time: '16:30',
              services: 'Фитнес тренировка',
              user: {
                  fullname: 'Глеб Черкасов',
                  avatar: 'https://sun2.dataix-kz-akkol.userapi.com/s/v1/ig2/zypD5gzFGKam0I1yCzMKBwYLjkUf4j40pSFc16E2uyeWP9ZvfTZi5_C32TfP6VYpbEsyzdWpMvj-JpBVkMPl8_mw.jpg?size=100x100&quality=95&crop=247,511,1443,1443&ava=1'
                }
            }
        ]
  }
];

export default function App() {
  return (
    <Container>
      <SectionList
        sections={DATA}
        keyExtractor={(item, index) => index}
        renderItem={({ item }) => <Appointment {...item} /> }
        renderSectionHeader={({ section: { title } }) => (
        <SectionTitle>{title}</SectionTitle>
        )}
      />
      <PlusButton>
        <Ionicons name="ios-add" size={36} color="white" />
      </PlusButton>
    </Container>
  );
}

const PlusButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  border-radius: 50px;
  width: 64px;
  height: 64px;
  background: #2A86FF;
  position: absolute;
  right: 25px;
  bottom: 25px;
  shadow-color: #2A86FF;
  shadow-opacity: 0.7;
  shadow-radius: 3.5;
  elevation: 5;
`;

const Container = styled.View`
  flex: 1;
  margin-top: 30px;
`;



