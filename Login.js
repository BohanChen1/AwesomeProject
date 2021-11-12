import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import firebase from 'firebase/compat/app';
import { auth} from "firebase/auth";
import {signInWithEmailAndPassword} from './Firebase';
import { useAuthState } from "react-firebase-hooks/auth";
import { Button, TextInput, View, Text } from "react-native";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false)
//   const [user, loading, error] = useAuthState(auth);
//   const history = useHistory();

//   useEffect(() => {
//     if (loading) {
//       // maybe trigger a loading screen
//       return;
//     }
//     if (user) history.replace("/dashboard");
//   }, [user, loading]);

  return (
    
      <View>
        <TextInput
          value={email}
          onChangeText={text => setEmail(text)}
          placeholder="E-mail Address"
        />
        <TextInput
          secureTextEntry={true}
          value={password}
          onChangeText={text => setPassword(text)}
          placeholder="Password"
        />
        <Button
          title={"Login"}
          onPress={() => setIsLoggedIn(signInWithEmailAndPassword(email, password))}
        />
        {isLoggedIn && 
        <Text>You have successfully logged in</Text>}
        
      </View>
    
  );
}

export default Login;