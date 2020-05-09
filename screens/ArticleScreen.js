import React from 'react';
import { Text, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';
import { useDispatch, useSelector } from 'react-redux';
import { addClip, deleteClip } from '../store/actions/user';
import ClipButton from '../components/ClipButton';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default ArticleScreen = props => {
  const article = props.navigation.getParam('article');

  const dispatch = useDispatch();

  const user = useSelector(state => state.user);
  const { clips } = user;

  const isClipped = () => {
    return clips.some(clip => clip.url === article.url);
  };

  const toggleClip = () => {
    if (isClipped()) {
      dispatch(deleteClip({ clip: props.navigation.getParam('article') }));
    } else {
      dispatch(addClip({ clip: props.navigation.getParam('article') }));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ClipButton onPress={toggleClip} enabled={isClipped()} />
      <WebView source={{ uri: props.navigation.getParam('article').url }} />
    </SafeAreaView>
  );
};
