import React, { useState, useEffect, useCallback } from 'react';
import { FlatList, TouchableOpacity, Text, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHeart as heartRegular } from '@fortawesome/free-regular-svg-icons';
import { faHeart as heartSolid } from '@fortawesome/free-solid-svg-icons';
import LazyImage from '../../components/LazyImage';
import Video from '../../components/Video';
import TwoComments from '../../components/TwoComments';
import posts from '../../../posts.json';
import authors from '../../../authors.json';

import {
  Container,
  Post,
  Header,
  Avatar,
  Name,
  Description,
  Loading,
  LikeList,
} from './styles';

export default function Feed({ navigation }) {
  const [feed, setFeed] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [viewable, setViewable] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  async function loadPage(pageNumber = page, shouldRefresh = false) {
    try {
      if (pageNumber === total) return;
      if (loading) return;

      setLoading(true);

      setTimeout(() => {}, 1000);

      let data = [];

      for (let i = (pageNumber - 1) * 5; i < pageNumber * 5; i++) {
        const author = authors.filter(item => item.id === posts[i].authorId);

        data.push({
          ...posts[i],
          author: { ...author[0] },
        });
      }

      setLoading(false);
      setTotal(Math.floor(data.length / 5));
      setPage(pageNumber + 1);

      setFeed(shouldRefresh ? data : [...feed, ...data]);
    } catch (err) {
      console.log(err);
    }
  }

  async function refreshList() {
    setRefreshing(true);

    await loadPage(1, true);

    setRefreshing(false);
  }

  useEffect(() => {
    loadPage();
  }, []);

  const handleViewableChanged = useCallback(({ changed }) => {
    setViewable(changed.map(({ item }) => item.id));
  }, []);

  const handleLike = async (id, liked) => {
    let data = feed;
    data[id - 1].liked = !liked;

    setFeed([...data]);
  };

  const printLikes = likes => {
    if (likes.length === 0) return 'Ninguém curtiu ainda';

    if (likes.length === 1) {
      let fLikes = likes.join(', ');

      fLikes = `Curtido por ${fLikes}`;

      return fLikes;
    }

    if (likes.length > 1) {
      let fLikes = likes.slice(0, 1).join(', ');

      fLikes = `Curtido por ${fLikes} e outras pessoas`;

      return fLikes;
    }
  };

  return (
    <Container>
      <FlatList
        data={feed}
        keyExtractor={item => String(item.id)}
        onViewableItemsChanged={handleViewableChanged}
        viewabilityConfig={{
          viewAreaCoveragePercentThreshold: 10,
        }}
        showsVerticalScrollIndicator={false}
        onRefresh={refreshList}
        refreshing={refreshing}
        onEndReachedThreshold={0.1}
        onEndReached={() => loadPage()}
        ListFooterComponent={!loading && <Loading />}
        renderItem={({ item }) => (
          <Post>
            <Header>
              <Avatar source={{ uri: item.author.avatar }} />
              <Name>{item.author.name}</Name>
            </Header>

            {item.video ? (
              <Video link={item.videoId} />
            ) : (
              <LazyImage
                aspectRatio={item.aspectRatio}
                shouldLoad={viewable.includes(item.id)}
                smallSource={{ uri: item.small }}
                source={{ uri: item.image }}
              />
            )}

            <TouchableOpacity
              onPress={() => {
                handleLike(item.id, item.liked);
              }}
            >
              {item.liked ? (
                <FontAwesomeIcon
                  style={{ marginTop: 15, marginLeft: 15 }}
                  icon={heartSolid}
                  color='#D85A65'
                />
              ) : (
                <FontAwesomeIcon
                  style={{ marginTop: 15, marginLeft: 15 }}
                  icon={heartRegular}
                />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                item.likes.length
                  ? navigation.navigate('Likes', { likes: item.likes })
                  : {}
              }
            >
              <LikeList>
                <Text>{printLikes(item.likes)}</Text>
              </LikeList>
            </TouchableOpacity>
            <Description>
              <Text style={{ fontWeight: 'bold' }}>{item.author.name} </Text>
              {item.description}
            </Description>
            <TwoComments comments={item.comments} />
            <View style={{ marginLeft: 15, marginTop: 5 }}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Comentários', {
                    comments: item.comments,
                  });
                }}
              >
                {item.comments.length > 0 ? (
                  item.comments.length === 1 ? (
                    <Text style={{ color: 'grey' }}>Ver 1 comentário</Text>
                  ) : (
                    <Text style={{ color: 'grey' }}>
                      Ver todos os {item.comments.length} comentários
                    </Text>
                  )
                ) : (
                  <Text style={{ color: 'grey' }}>Nenhum comentário</Text>
                )}
              </TouchableOpacity>
            </View>
          </Post>
        )}
      />
    </Container>
  );
}
