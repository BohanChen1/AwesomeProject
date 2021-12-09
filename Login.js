import React, { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import { useHistory } from "react-router-dom";
import { auth } from "./Firebase";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const history = useHistory();

const signInWithEmailAndPassword = async (email, password) => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
      history.push('/Dashboard')
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };


  return (
    <View>
      <Text>Please use the following email and password for testing</Text>
      <Text>email: test@test.com</Text>
      <Text>password: Test123456!</Text>
      <TextInput
        placeholder="email"
        onChangeText={text => {
          setEmail(text);
        }}
        value={email} 
      ></TextInput>
      <TextInput
        placeholder="password"
        secureTextEntry={true}
        onChangeText={text => {
          setPassword(text);
        }}
        value={password} 
      ></TextInput>
      <Button
        title={'log in'}
        onPress={() => {
          signInWithEmailAndPassword(email, password)
        }}
      />
    </View>
  );
}
export default Login;