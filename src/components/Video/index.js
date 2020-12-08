import React, { useState, useCallback } from 'react';
import { Button, View } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';

export default function Video(props) {
  const [playing, setPlaying] = useState(false);

  const onStateChange = useCallback(state => {
    if (state === 'ended') {
      setPlaying(false);
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying(prev => !prev);
  }, []);

  return (
    <View>
      <YoutubePlayer
        height={250}
        play={playing}
        videoId={props.link}
        onChangeState={onStateChange}
      />
      {/* <Button title={playing ? 'pause' : 'play'} onPress={togglePlaying} /> */}
    </View>
  );
}
