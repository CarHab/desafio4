import React from 'react';
import { View } from 'react-native';
import { Row, Name, Divider } from './styles';

export default function Likes({ route }) {
  const list = route.params.likes;
  return (
    <View>
      {list.map(item => {
        return (
          <Row key={item}>
            <Name>{item}</Name>
            <Divider />
          </Row>
        );
      })}
    </View>
  );
}
