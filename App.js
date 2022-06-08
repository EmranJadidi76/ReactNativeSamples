import { StatusBar } from 'expo-status-bar';
import { FlatList, NativeBaseProvider } from 'native-base';
import { useRef } from 'react';
import { StyleSheet, Image, View, Dimensions, Animated } from 'react-native';

import { Fake_Images } from './models/fake-data';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const imageW = width * .7;
const imageH = height * .6;

export default function App() {
  const scrollX = useRef(new Animated.Value(0)).current;

  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <StatusBar hidden />

        <View style={[StyleSheet.absoluteFillObject]}>
          {Fake_Images?.map((image, index) => {

            const inputRange = [
              (index - 1) * width,
              index * width,
              (index + 1) * width
            ]

            const opacity = scrollX.interpolate({
              inputRange,
              outputRange: [0, 1, 0]
            })

            return <Animated.Image
              source={{ uri: image }}
              key={`Image_${index}`}
              style={[StyleSheet.absoluteFillObject, { opacity }]}
              blurRadius={50}
            />
          })}
        </View>

        <Animated.FlatList
          data={Fake_Images}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            {
              useNativeDriver: true
            }
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => {
            return (
              <View style={{ width, justifyContent: 'center', alignItems: 'center' }}>
                <Image source={{ uri: item }} style={{
                  width: imageW,
                  height: imageH,
                  borderRadius: 10,
                  resizeMode: 'cover',
                  shadowColor: '#000',
                  shadowOpacity: 2,
                  shadowRadius: 20,
                  shadowOffset: {
                    height: 0,
                    width: 0
                  }
                }} />
              </View>)
          }}
        />
      </View>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
