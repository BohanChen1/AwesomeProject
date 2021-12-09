import * as React from 'react';
import { TouchableOpacity, View, StyleSheet, Image, TextInput, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useState } from 'react';
import Records from './Records';
import Login from './Login';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


const HomeScreen = ({ navigation }) => {

  const [name, setName] = useState('user');

  return ( 
    <View style={styles.container}>
      <View>
      <View style={{flex:1}}>
        <Text> Hello {name}!</Text>
        <TextInput
          style={styles.textinput}
          placeholder="Your name"
          onChangeText={text => {setName(text)}}
        /> 
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('About')}
      >
          <Text style={styles.text}>Go to About</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Record')}
      >
          <Text style={styles.text}>Go to Record</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Preference')}
      >
          <Text style={styles.text}>Go to Preference</Text>
      </TouchableOpacity>
      </View>
      

    </View>
  );
}

const AboutScreen = ({ navigation }) => {
  return (
    <View style={styles.component}>
      <Text>Here is the about screen! This app will be designed as a checklist that will remind you the events.</Text>
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
    <Records></Records>
  );
}

const PreferenceScreen = ({ navigation }) => {
  return (
    <View style={styles.component}>
      <Text>Here is the Preference screen!</Text>
    </View>
  );
}

const Stack = createStackNavigator();

const MyStack = () => {
  return (
    <Stack.Navigator
        barStyle={{backgroundColor:'white'}}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="About" component={AboutScreen} options={{title: 'About'}}/>
      <Stack.Screen name="Record" component={RecordScreen} options={{title: 'Record'}}/>
      <Stack.Screen name="Preference" component={PreferenceScreen} options={{title: 'Preference'}}/>
    </Stack.Navigator>
  );
}
const Tab = createBottomTabNavigator();


const MyTab = () => {
    return (
      <Tab.Navigator
          barStyle={{backgroundColor:'white'}}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="About" component={AboutScreen} options={{title: 'About'}}/>
        <Tab.Screen name="Record" component={RecordScreen} options={{title: 'Record'}}/>
        <Tab.Screen name="Preference" component={PreferenceScreen} options={{title: 'Preference'}}/>
      </Tab.Navigator>
    );
  }

const styles = StyleSheet.create({
  container:{
    flexDirection: 'column',
    margin: 25,
    padding: 10,
    justifyContent: 'space-around',
  },
  component:{
    flexDirection: 'column',
    margin: 25,
    padding: 10,
    justifyContent: 'space-around',
  },
  textinput:{
    fontSize:20
  },
  button:{
    marginRight:40,
    marginLeft:40,
    marginTop:10,
    paddingTop:10,
    paddingBottom:10,
    backgroundColor:'#1E6738',
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

export default function Dashboard() {
  return (
    <NavigationContainer>
      <MyTab />
    </NavigationContainer>
  );
}