import React, {useEffect, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const Dashboard = ({navigation}) => {
  const [userData, setUserData] = useState();

  const getData = async () => {
    try {
      const response = await fetch(`https://reqres.in/api/users?page=2`);
      const data = await response.json();
      setUserData(data?.data);
    } catch (error) {
      console.log('Error', error);
    }
  };

  const onClickHandler = data => {
    console.log('datas', data);
    navigation.navigate('SecondScreen', {data: data});
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={userData}
        renderItem={({item}) => {
          return (
            <View style={styles.card}>
              <TouchableOpacity onPress={() => onClickHandler(item)}>
                <Text style={styles.txt}>
                  Full name: {item?.first_name} {item?.last_name} {'\n'}
                  Email:{item?.email}
                </Text>
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default Dashboard;

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
