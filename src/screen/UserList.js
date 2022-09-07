import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import {AsyncStorage} from 'react-native';

const mockData = [
  {
    name: 'abc',
    email: 'abc@gmail.com',
    mobNo: '9988776655',
  },
];

const UserList = () => {
  const [input, setInput] = useState([
    {
      id: 0,
      placeholder: 'Name',
      value: '',
      keyboardType: 'default',
    },
    {
      id: 2,
      placeholder: 'Email Id',
      value: '',
      keyboardType: 'default',
    },
    {
      id: 3,
      placeholder: 'Mobile No',
      value: '',
      keyboardType: 'numeric',
    },
  ]);

  const [data, setData] = useState();
  const [isModalopen, setIsmodalopen] = useState(false);
  const [isSelected, setIsSelected] = useState('');
  const getData = async () => {
    const res = await AsyncStorage.getItem('userData');
    setData(JSON.parse(res));
    // console.log('res', JSON.parse(res));
  };

  useEffect(() => {
    getData();
  }, []);

  const changeTxt = (key, value) => {
    if (key !== undefined) {
      input[key].value = value;
      setInput(() => [...input]);
    }
  };

  const selectHandle = val => {
    if (isSelected === '') {
      setIsSelected(val);
    } else {
      setIsSelected('');
    }
  };
  const deleteHandle = () => {
    if (isSelected !== '') {
      let tempData = data.filter((val, i) => {
        if (isSelected !== i) {
          return val;
        }
      });
      setData(tempData);
      //   setItem send data in database
      let val = JSON.stringify(tempData);
      AsyncStorage.setItem('userData', val);
      setIsSelected('');
    }
  };
  const saveHandler = () => {
    const newRecord = {
      name: input[0].value,
      email: input[1].value,
      mobNo: input[2].value,
    };
    let tempArr = data;
    tempArr = [...tempArr, newRecord];
    setData(tempArr);
    // simultenously add data in local storage also
    let val = JSON.stringify(tempArr);
    AsyncStorage.setItem('userData', val);
    setIsSelected('');
  };
  const editHandler = () => {
    setIsmodalopen(true);
    isSelected;
    input[0].value = data[isSelected].name;
    input[1].value = data[isSelected].email;
    input[2].value = data[isSelected].mobNo;
    setInput(() => [...input]);
  };

  const editSaver = () => {
    console.log('called');
    const newRecord = {
      name: input[0].value,
      email: input[1].value,
      mobNo: input[2].value,
    };
    let tempArr = data;
    tempArr[isSelected] = newRecord;
    tempArr = [...tempArr];
    setData(tempArr);
    // simultenously add data in local storage also
    let val = JSON.stringify(tempArr);
    AsyncStorage.setItem('userData', val);
    setIsSelected('');
  };

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text>Name</Text>
        <Text>Email id</Text>
        <Text>Mobile No</Text>
      </View>
      {data?.map((item, index) => {
        return (
          <TouchableOpacity
            onPress={() => {
              selectHandle(index);
            }}
            style={[
              {
                flexDirection: 'row',
                justifyContent: 'space-between',
              },
              index === isSelected && {backgroundColor: '#fae1e6'},
            ]}>
            <Text>{item?.name}</Text>
            <Text>{item?.email}</Text>
            <Text>{item?.mobNo}</Text>
          </TouchableOpacity>
        );
      })}
      <View style={styles.buttonWrapper}>
        <TouchableOpacity
          style={{marginRight: 10}}
          onPress={() => {
            editHandler();
          }}>
          <Text>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{marginRight: 10}}
          onPress={() => {
            deleteHandle();
          }}>
          <Text>Delete</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsmodalopen(!isModalopen)}>
          <Text>{isModalopen ? 'Close' : 'Add'} </Text>
        </TouchableOpacity>
      </View>
      {isModalopen && (
        <View style={{marginTop: 40}}>
          {input.map((val, i) => {
            return (
              <TextInput
                onChangeText={value => {
                  changeTxt(i, value);
                }}
                value={val.value}
                placeholder={val.placeholder}
                keyboardType={val.keyboardType}
                style={styles.inputTxt}
              />
            );
          })}

          <TouchableOpacity
            style={styles.btn}
            onPress={isSelected ? editSaver : saveHandler}>
            <Text>Save</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default UserList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  inputTxt: {
    marginVertical: 10,
    backgroundColor: '#d4d2d2',
    borderRadius: 10,
    color: 'black',
    fontSize: 16,
  },
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'lightblue',
    width: 100,
    marginLeft: '35%',
    marginTop: 10,
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
  },
});
