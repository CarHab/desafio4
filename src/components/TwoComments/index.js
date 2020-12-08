import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Row, Name, Comment } from './styles';
import { Avatar } from '../../pages/Feed/styles';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHeart as heartRegular } from '@fortawesome/free-regular-svg-icons';
import { faHeart as heartSolid } from '@fortawesome/free-solid-svg-icons';

export default function TwoComments(props) {
  const [list, setList] = useState(props.comments);

  const handleLike = async (listC, index, liked) => {
    let data = listC;
    data[index].liked = !liked;

    setList([...data]);
  };

  return (
    <View>
      {list.slice(0, 2).map((item, index) => {
        return (
          <Row key={index}>
            <Avatar source={{ uri: item.avatar }} />
            <Name>{item.name}</Name>
            <Comment>
              {item.text.length > 99
                ? item.text.substring(0, 100) + '...'
                : item.text}
            </Comment>
            <TouchableOpacity
              onPress={() => {
                handleLike(list, index, item.liked);
              }}
            >
              {item.liked ? (
                <FontAwesomeIcon
                  style={{ paddingHorizontal: 15 }}
                  icon={heartSolid}
                  color='#D85A65'
                />
              ) : (
                <FontAwesomeIcon
                  style={{ paddingHorizontal: 15 }}
                  icon={heartRegular}
                />
              )}
            </TouchableOpacity>
          </Row>
        );
      })}
    </View>
  );
}
