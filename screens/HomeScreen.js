import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, SafeAreaView } from 'react-native';
import Constants from 'expo-constants';
import axios from 'axios';
import ListItem from '../components/ListItem';

const URL = `http://newsapi.org/v2/top-headlines?country=jp&apiKey=${Constants.manifest.extra.newsApiKey}`;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default HomeScreen = (props) => {
  const [articles, setArticles] = useState([]);

  const fetchArticles = async () => {
    try {
      const response = await axios.get(URL);
      setArticles(response.data.articles);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    // SafeAreaView はM字ハゲの箇所に描画しないようにしてくれるもの
    <SafeAreaView style={styles.container}>
      {/* FlatListはscrollViewと比較して、はやい */}
      <FlatList
        data={articles}
        renderItem={({ item }) => (
          <ListItem
            imageUrl={item.urlToImage}
            title={item.title}
            author={item.author}
            onPress={() => props.navigation.navigate('Article', {article: item})}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
        // colors="blue"
      />
    </SafeAreaView>
  );
}
