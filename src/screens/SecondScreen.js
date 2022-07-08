import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

export default function SecondScreen({navigation, route}) {
  const data = route.params.data;
  console.log('data', data);
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.txt}>
          Full name: {data?.first_name} {data?.last_name} {'\n'}
          Email:{data?.email}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: 'whitesmoke',
    marginVertical: 10,
    padding: 10,
  },
  txt: {
    fontSize: 20,
  },
});
