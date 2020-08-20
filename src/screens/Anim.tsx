import React, {useRef} from 'react';
import {Animated, Text, View, StyleSheet, Button, Easing} from 'react-native';

const a = new Animated.Value(1);
const b = Animated.divide(1, a);

const movingMargin = new Animated.Value(0).interpolate({
  inputRange: [0, 0.5, 1],
  outputRange: [0, 300, 0],
});

export default function Anim() {
  // fadeAnim will be used as the value for opacity. Initial Value: 0
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    // Animated.timing(fadeAnim, {
    //   toValue: 1,
    //   duration: 2000,
    // }).start();
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    // Will change fadeAnim value to 0 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.fadingContainer,
          {
            opacity: fadeAnim, // Bind opacity to animated value
          },
        ]}>
        <Text style={styles.fadingText}>Fading View!</Text>
      </Animated.View>
      <View style={styles.buttonRow}>
        <Button title="Fade In" onPress={fadeIn} />
        <Button title="Fade Out" onPress={fadeOut} />
      </View>
      <Animated.View
        style={{
          marginLeft: movingMargin,
          marginTop: 10,
          height: 30,
          width: 40,
          backgroundColor: 'orange',
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fadingContainer: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: 'powderblue',
  },
  fadingText: {
    fontSize: 28,
    textAlign: 'center',
    margin: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    marginVertical: 16,
  },
});
