import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  Animated,
  StyleSheet,
  Text,
  Dimensions,
  ScrollView,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const HEADER_MAX_HEIGHT = 200;
const HEADER_MIN_HEIGHT = 60;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const DATA = [
  {
    title: 'All Campaigns',
    index: 0,
  },
  {
    title: 'Women',
    index: 1,
  },
  {
    title: 'Men',
    index: 2,
  },
  {
    title: 'Kids',
    index: 3,
  },
  {
    title: 'Home $ Lifestyle',
    index: 4,
  },
];

export default function Lounge() {
  const [selected, setSelected] = useState(0);
  const [scrollY, setScrollY] = useState(new Animated.Value(0));
  const [dataLength, setData] = useState(30);
  const Item = ({title, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setSelected(index);
        }}>
        <View style={styles.item}>
          <Text style={styles.flatTitle}>{title}</Text>
          {index === selected ? (
            <View style={{backgroundColor: 'white', height: 1}} />
          ) : null}
        </View>
      </TouchableOpacity>
    );
  };

  const _renderScrollViewContent = () => {
    const data = Array.from({length: dataLength});
    return (
      <View style={styles.scrollViewContent}>
        {data.map((item, i) => (
          <View style={styles.row} key={i}>
            <Text>{i}</Text>
          </View>
        ))}
      </View>
    );
  };

  // return (
  //   <SafeAreaView style={styles.container}>
  //     <FlatList
  //       data={DATA}
  //       horizontal
  //       renderItem={({item}) => <Item title={item.title} index={item.index} />}
  //       keyExtractor={item => item.title}
  //     />
  //   </SafeAreaView>
  // );
  const headerHeight = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    extrapolate: 'clamp',
  });
  const imageOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 1, 0],
    extrapolate: 'clamp',
  });
  const imageTranslate = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, -50],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.fill}>
      <ScrollView
        style={styles.fill}
        scrollEventThrottle={16}
        onScroll={Animated.event([
          {nativeEvent: {contentOffset: {y: scrollY}}},
        ])}>
        {_renderScrollViewContent()}
      </ScrollView>

      <Animated.View style={[styles.header, {height: headerHeight}]}>
        <Animated.Image
          style={[
            styles.backgroundImage,
            {opacity: imageOpacity, transform: [{translateY: imageTranslate}]},
          ]}
          source={require('../../assets/corn.jpg')}
        />
        <View style={styles.bar}>
          <FlatList
            data={DATA}
            horizontal
            renderItem={({item}) => (
              <Item title={item.title} index={item.index} />
            )}
            keyExtractor={item => item.title}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
  },
  item: {
    height: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  flatTitle: {
    fontSize: 14,
    color: 'white',
  },
  fill: {
    flex: 1,
  },
  row: {
    height: 40,
    margin: 16,
    backgroundColor: '#D3D3D3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#03A9F4',
    overflow: 'hidden',
  },
  bar: {
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    backgroundColor: 'transparent',
    color: 'white',
    fontSize: 18,
  },
  scrollViewContent: {
    marginTop: HEADER_MAX_HEIGHT,
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: null,
    height: HEADER_MAX_HEIGHT,
    resizeMode: 'cover',
  },
});
