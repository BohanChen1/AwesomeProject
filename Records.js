import React, { useState, useEffect } from 'react';
import {
  View, Button,
  FlatList, StyleSheet,
  Text, TextInput
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

    <View style={styles.container}>
      <Text style={styles.headerText}>Hello</Text>
      <Text style={{ fontSize: 25 }}>
        Record your events for today!
      </Text>

      <View style={{
        flexDirection: 'column',
        margin: 20,
        justifyContent: 'space-around'
      }}>
        <TextInput // for the date/time
          style={styles.textinput}
          placeholder="Date/Time"
          onChangeText={text => {
            setDateTime(text);
          }}
          value={dateTime}
        />

        <TextInput
          style={styles.textinput}
          placeholder="location"
          onChangeText={text => {
            setLocation(text);
          }}
          value={location}
        />

        <TextInput // for the event
          style={styles.textinput}
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
        <Button
          style={{flex:1}}
          title={'record'}
          color="blue"
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
        />
        <Button
          style={{flex:1}}
          title={"Clear"}
          color="red"
          onPress={() => {
            clearAll()
            setRecords([])
          }}
        />

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

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#eee',
    justifyContent: 'center',
    textAlign: 'left',
    marginTop: 20,
    padding: 20,
  },
  textinput: {
    fontSize: 20,
    flex:1
    //border: "solid blue",
  },
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

});


export default Records;
