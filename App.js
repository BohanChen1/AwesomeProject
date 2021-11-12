import * as React from 'react';
import { Button, View, StyleSheet, Image, TextInput, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useState } from 'react';
import Records from './Records';
import Login from './Login';

const HomeScreen = ({ navigation }) => {

  const [name, setName] = useState('user');

  return ( 
    <View style={styles.container}>
      <View style={{flex:1}}>
        <Login/>
      </View>
      <View>
      <View style={{flex:1}}>
        <Text> Hello {name}!</Text>
        <TextInput
          style={styles.textinput}
          placeholder="Your name"
          onChangeText={text => {setName(text)}}
        /> 
      </View>
      <Button
        title="Go to About"
        onPress={() => navigation.navigate('About')}
      />
      <Button
        title="Go to Record"
        onPress={() => navigation.navigate('Record')}
      />
      <Button
        title="Go to Preference"
        onPress={() => navigation.navigate('Preference')}
      />
      </View>
      

    </View>
  );
}

const AboutScreen = ({ navigation }) => {
  return (
    <View style={styles.component}>
      Here is the about screen! This app will be designed as a checklist that will remind you the events.
      <Image 
        source={{
          uri: 'https://dynaimage.cdn.cnn.com/cnn/c_fill,g_auto,w_1200,h_675,ar_16:9/https%3A%2F%2Fcdn.cnn.com%2Fcnnnext%2Fdam%2Fassets%2F200508140810-01-how-much-water-drink-hydrate-wellness.jpg'
        }}
        style = {{ width: 200, height: 200 }}
      />
    </View>
  );
}

const RecordScreen = () => {
  return (
    <Records
    ></Records>
  );
}

const PreferenceScreen = ({ navigation }) => {
  return (
    <View style={styles.component}>
      Here is the Preference screen!
    </View>
  );
}

const Stack = createStackNavigator();

const MyStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="About" component={AboutScreen} />
      <Stack.Screen name="Record" component={RecordScreen} />
      <Stack.Screen name="Preference" component={PreferenceScreen} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container:{
    flexDirection: 'column',
    margin: "25px",
    padding: '10px',
    justifyContent: 'space-around',
  },
  component:{
    flexDirection: 'column',
    margin: "25px",
    padding: '10px',
    justifyContent: 'space-around',
  },
  textinput:{
    //margin:20,
    fontSize:20
  },
  button:{
    alignItems: 'center',
    justifyContent: 'space-around'
  }
});

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}