import React, { useState, useRef } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Row, Name, Divider, AddComment, Comment } from './styles';
import { Avatar } from '../Feed/styles';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHeart as heartRegular } from '@fortawesome/free-regular-svg-icons';
import { faHeart as heartSolid } from '@fortawesome/free-solid-svg-icons';

export default function Comments({ route, navigation }) {
  const [list, setList] = useState(route.params.comments);
  const [newComment, setNewComment] = useState('');
  const textInput = useRef();

  const handleComment = () => {
    const a = {
      avatar: 'https://avatars0.githubusercontent.com/u/2254731?s=50&v=4',
      name: 'dieegosf',
      text: newComment,
    };

    setList([...list, a]);

    textInput.current.clear();
  };

  const handleLike = async (listC, index, liked) => {
    let data = listC;
    data[index].liked = !liked;

    setList([...data]);
  };

  return (
    <View>
      {list.map((item, index) => {
        return (
          <Row key={index}>
            <Avatar source={{ uri: item.avatar }} />
            <Name>{item.name}</Name>
            <Comment>{item.text}</Comment>
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
            <Divider />
          </Row>
        );
      })}
      <AddComment
        ref={textInput}
        onChangeText={(value) => setNewComment(value)}
        onSubmitEditing={() => handleComment()}
        placeholder='Adicione um comentário'
        multiline={true}
        blurOnSubmit={true}
      />
    </View>
  );
}
