import React, { useState, useEffect } from 'react'
import {
  View,
  KeyboardAvoidingView,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  AsyncStorage
} from 'react-native';

import api from '../services/api';
import logo from '../assets/logo.png';

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [techs, setTechs] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('user_id').then(user_id => {
      if (user_id) {
        navigation.navigate("List");
      }
    });
  }, []);

  async function handleSubmit() {
    const response = await api.post('/sessions', { email });
    const { _id } = response.data;

    await AsyncStorage.setItem('user_id', _id);
    await AsyncStorage.setItem('techs', techs);

    navigation.navigate('List');
  }

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <Image source={logo} />

      <View style={styles.form}>
        <Text style={styles.label}>SEU EMAIL: *</Text>
        <TextInput
          style={styles.input}
          placeholder="Seu melhor e-mail"
          placeholderTextColor="#999"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          value={email}
          onChangeText={text => setEmail(text)}
        />

        <Text style={styles.label}>TECNOLOGIAS: *</Text>
        <TextInput
          style={styles.input}
          placeholder="Tecnologias de seu interesse"
          placeholderTextColor="#999"
          autoCapitalize="words"
          autoCorrect={false}
          value={techs}
          onChangeText={text => setTechs(text)}
        />
        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
          <Text style={styles.buttonText}>Encontrar spots</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  form: {
    alignSelf: "stretch",
    paddingHorizontal: 30
  },
  label: {
    fontWeight: "bold",
    marginTop: 30,
    marginBottom: 5,
    color: "#555"
  },
  input: {
    borderWidth: 1,
    borderColor: "#CCC",
    paddingHorizontal: 20,
    fontSize: 16,
    color: "#555",
    height: 44,
    marginBottom: 10,
    borderRadius: 4
  },
  button: {
    backgroundColor: '#f05a5b',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    marginTop: 20
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16
  }
});
