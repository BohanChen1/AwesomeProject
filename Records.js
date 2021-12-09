import React, { useState, useEffect } from 'react';
import {
  View, Button,
  FlatList, StyleSheet,
  Text, TextInput, Image, Keyboard, TouchableWithoutFeedback, TouchableOpacity
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Records = () => {

  const [dateTime, setDateTime] = useState("")
  const [location, setLocation] = useState("")
  const [event, setEvent] = useState("")
  const [records, setRecords] = useState([])

  useEffect(() => { getData() }
    , [])

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@records')
      let data = null
      if (jsonValue != null) {
        data = JSON.parse(jsonValue)
        setRecords(data)
        console.log('just set Info, Name and Email')
      } else {
        console.log('just read a null value from Storage')
        setRecords([])
        setDateTime("")
        setLocation("")
        setEvent("")
      }
    } catch (e) {
      console.log("error in getData ")
      console.dir(e)
    }
  }

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('@records', jsonValue)
      console.log('just stored ' + jsonValue)
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
    } catch (e) {
      console.log("error in clearData ")
      console.dir(e)
      // clear error
    }
  }

  const renderRecord = ({ item }) => {
    return (
      <View style={styles.record}>
        <Text style={{ fontSize: 20, flex: 1, textAlign: 'center', backgroundColor: 'lightyellow', justifyContent: 'space-around' }}>{item.dateTime}</Text>
        <Text style={{ fontSize: 20, flex: 1, textAlign: 'center', backgroundColor: 'pink', justifyContent: 'space-around' }}>{item.location} </Text>
        <Text style={{ fontSize: 20, flex: 1, textAlign: 'center', backgroundColor: 'lime', justifyContent: 'space-around' }}>{item.event} </Text>
      </View>
    )
  }

  let debug = false
  const debugView =
    (<View>
      <Text style={styles.headerText}>
        DEBUGGING INFO
      </Text>
      <Text>
        dateTime is ({dateTime})
      </Text>
      <Text>
        location is ({location})
      </Text>
      <Text>
        event is ({event})
      </Text>
      <Text>
        records is {JSON.stringify(records)}
      </Text>
    </View>);
  return (
    <TouchableWithoutFeedback
     onPress={Keyboard.dismiss}
    >
    <View style={{
      flex: 1,
      flexDirection: 'column',
      backgroundColor: '#eee',
      justifyContent: 'center',
      textAlign: 'left',
      marginTop: 20,
      padding: 20,
    }}>
      <Image 
        source={{
          uri: 'https://dynaimage.cdn.cnn.com/cnn/c_fill,g_auto,w_1200,h_675,ar_16:9/https%3A%2F%2Fcdn.cnn.com%2Fcnnnext%2Fdam%2Fassets%2F200508140810-01-how-much-water-drink-hydrate-wellness.jpg'
        }}
        style = {{ width: 200, height: 200 }}
      />
      <Text style={{ fontSize: 25 }}>
        Record your events for today!
      </Text>

      <View 
        onPress={Keyboard.dismiss}
        style={{
        flexDirection: 'column',
        margin: 20,
        justifyContent: 'space-around'
      }}>
        <TextInput // for the date/time
          placeholder="Date/Time"
          onChangeText={text => {
            setDateTime(text);
          }}
          value={dateTime}
        />

        <TextInput
          
          placeholder="location"
          onChangeText={text => {
            setLocation(text);
          }}
          value={location}
        />

        <TextInput // for the event
          
          placeholder="Event"
          onChangeText={text => {
            setEvent(text);
          }}
          value={event}
        />
      </View>
      <View style={{
        flexDirection: 'column',
        justifyContent: 'space-around'
      }}>
        <TouchableOpacity
          style={styles.recordbutton}
          title='record'
          onPress={() => {
            const newRecords =
              records.concat(
                {
                  'dateTime': dateTime,
                  'location': location,
                  'event': event,
                  'completed': new Date()
                })
            setRecords(newRecords)
            storeData(newRecords)
            setDateTime("")
            setLocation("")
            setEvent("")
          }}
        >
          <Text style={styles.text}>Record</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.clearbutton}
          onPress={() => {
            clearAll()
            setRecords([])
          }}
        >
          <Text style={styles.text}>Clear</Text>
        </TouchableOpacity>
      </View>
      <View style={{
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: 'lightgray'
      }}>
        <Text style={{
          fontSize: 20,
          color: 'green', backgroundColor: 'lightgray'
        }}>
          Today's event
         </Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Text style={{ fontSize: 20, flex: 1, textAlign: 'center', backgroundColor: 'lightyellow', justifyContent: 'space-around' }}>
          Time
        </Text>
        <Text style={{ fontSize: 20, flex: 1, textAlign: 'center', backgroundColor: 'pink' }}>
          Location
        </Text>
        <Text style={{ fontSize: 20, flex: 1, textAlign: 'center', backgroundColor: 'lime' }}>
          Event
        </Text>
      </View>

      <FlatList
        data={records.reverse()}
        renderItem={renderRecord}
        keyExtractor={item => item.dateTime}
      />

      {debug ? debugView : <Text></Text>}

    </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  
  record: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerText: {
    textAlign: 'center',
    backgroundColor: '#aaa',
    fontSize: 32,
    padding: 10,
    color: 'blue'
  },
  recordbutton:{
    marginRight:40,
    marginLeft:40,
    marginTop:10,
    paddingTop:10,
    paddingBottom:10,
    backgroundColor:'blue',
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#fff'
  },
  clearbutton:{
    marginRight:40,
    marginLeft:40,
    marginTop:10,
    paddingTop:10,
    paddingBottom:10,
    backgroundColor:'red',
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#fff'
  },
  text:{
    color:'#fff',
    textAlign:'center',
    paddingLeft : 10,
    paddingRight : 10
  }
});


export default Records;
