import React, { useState, useEffect }  from 'react';
import { View, Button,
         FlatList, StyleSheet,
         Text, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Record = ({ cupsToDrink }) => {
  const [cups, setCups] = useState(cupsToDrink)
  const [dateTime,setDateTime] = useState("")
  const [result,setResult] = useState(0)
  const [records,setRecords]= useState([])

  // this loads in the data after the app has been rendered
  useEffect(() => {
      getData()
    }
           ,[])
  

  const getData = async () => {
        try {
          const jsonValue = await AsyncStorage.getItem('@record')
          let data = null
          if (jsonValue!=null) {
            data = JSON.parse(jsonValue)
            setRecords(data)
          } else {
            setRecords([])
            setDateTime("")
            setResult(0)
          }
        } catch(e) {
          console.log("error in getData ")
          // this shouldn't happen, but its good practice
          // to check for errors!
          console.dir(e)
          // error reading value
        }
  }

  const storeData = async (value) => {
        try {
          const jsonValue = JSON.stringify(value)
          await AsyncStorage.setItem('@record', jsonValue)
          console.log('just stored '+jsonValue)
        } catch (e) {
          console.log("error in storeData ")
          console.dir(e)
          // saving error
        }
  }

  const clearAll = async () => {
        try {
          console.log('in clearData')
          await AsyncStorage.clear()
        } catch(e) {
          console.log("error in clearData ")
          console.dir(e)
          // clear error
        }
  }


// Each Pomorodo in the FlatList will be rendered as follows:
  const renderRecord = ({item}) => {
    return (
      <View style={styles.record}>
           <Text>Time: {item.dateTime}</Text>
           <Text>Cup(s): {item.result} </Text>
      </View>
    )
  }

// We can set debug to true if we want to see all of the state variables
  let debug=true
  const debugView =
    (<View>
      <Text style={styles.headerText}>
        DEBUGGING INFO
      </Text>
      <Text>
         dateTime is ({dateTime})
      </Text>
      <Text>
         cup is ({result})
      </Text>
      <Text>
         Records is {JSON.stringify(records)}
      </Text>
  </View>);

  // here is where we render the app
  return (

    <View style={styles.container}>
      <Text style={styles.headerText}>You have {cups} cups left today</Text>
      <Text style={{fontSize:12}}>
          Enter the record for your current water drinking below
      </Text>

      <View style={{flexDirection:'row',
                    margin:20,
                    justifyContent:'space-around'}}>
            <TextInput // for the date/time
              style={{fontSize:20}}
              placeholder="The time you drink water?"
              onChangeText={text => {
                   setDateTime(text);
                 }}
              value = {dateTime}
            />

            <TextInput // for the result
              style={{fontSize:20}}
              placeholder="How many cups?"
              onChangeText={num => {
                   setResult(num);
                 }}
              value = {result}
            />
        </View>
        <View style={{flexDirection:'row',
                      justifyContent:'space-around'}}>
        <Button
               title={"Record"}
               color="blue"
               onPress = {() => {
                   setCups(cups - result)
                 const newRecords =
                   records.concat(
                     {'dateTime':dateTime,
                      'result':result,
                   })
                 setRecords(newRecords)
                 storeData(newRecords)
                 setDateTime("")
                 setResult(0)
               }}
               />
        <Button
                title={"Clear"}
                color="red"
                onPress = {() => {
                  clearAll()
                  setRecords([])
                }}
                />

      </View>
      <View style={{flexDirection:'row',
                    justifyContent:'center',
                    backgroundColor:'lightgray'}}>
        <Text style={{fontSize:20,
                      color:'green',backgroundColor:'lightgray'}}>
              History of Drinking
         </Text>
      </View>

      <FlatList
        data={records.reverse()}
        renderItem={renderRecord}
        keyExtractor={item => item.dateTime}
      />

      {debug?debugView: <Text></Text>}

    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'column',
    backgroundColor: '#eee',
    justifyContent: 'center',
    textAlign:'left',
    marginTop:20,
    padding:20,
  },
  record:{
    flexDirection:'row',
    justifyContent:'space-between',
  },
  headerText: {
    textAlign:'center',
    backgroundColor:'#aaa',
    fontSize: 32,
    padding:10,
    color: 'blue'
  },
});

export default Record;
