import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import logo from '../../../assets/instagram.png';
import AsyncStorage from '@react-native-community/async-storage';
import authors from '../../../authors.json';
import { useIsFocused } from '@react-navigation/native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  logo: {
    width: '80%',
    height: 84,
    margin: 50,
  },
  input: {
    height: 40,
    width: '80%',
    backgroundColor: '#FAFAFA',
    borderColor: '#BBB',
    borderWidth: 1,
    padding: 5,
    borderRadius: 3,
    marginBottom: 10,
  },
  enabledStyle: {
    backgroundColor: '#038CFC',
  },
  disabledStyle: {
    backgroundColor: '#B2DFFC',
  },
  button: {
    width: '80%',
    textAlign: 'center',
    borderRadius: 3,
    padding: 10,
  },
  btnText: {
    textAlign: 'center',
    color: 'white',
  },
  error: {
    fontSize: 18,
    color: 'red',
    marginBottom: 15,
  },
});

export default function Login({ navigation }) {
  const [user, setUser] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');

  const isVisible = useIsFocused();

  const ref1 = useRef();
  const ref2 = useRef();

  const handleChangeUser = e => {
    setUser(e);
  };

  const handleChangeSenha = e => {
    setSenha(e);
  };

  const handleLogin = async () => {
    ref1.current.clear();
    ref2.current.clear();

    if (authors[0].senha === senha && authors[0].name === user) {
      AsyncStorage.setItem('loggedIn', 'true');
      navigation.navigate('Feed');
    } else {
      setError('Credenciais inválidas');
    }
  };

  useEffect(() => {
    setError('');

    async function checkLogIn() {
      const loggedIn = await AsyncStorage.getItem('loggedIn');

      if (loggedIn) navigation.navigate('Feed');
    }

    checkLogIn();
  }, [isVisible]);

  return (
    <View style={styles.container}>
      <Image source={logo} resizeMode='contain' style={styles.logo} />
      <Text style={styles.error}>{error}</Text>
      <TextInput
        value={user}
        placeholder='Usuário'
        onChangeText={e => handleChangeUser(e)}
        style={styles.input}
        returnKeyType='next'
        onSubmitEditing={() => ref2.current.focus()}
        ref={ref1}
      />
      <TextInput
        value={senha}
        placeholder='Senha'
        secureTextEntry={true}
        onChangeText={e => handleChangeSenha(e)}
        style={styles.input}
        ref={ref2}
      />
      <TouchableOpacity
        disabled={!user || !senha}
        onPress={() => handleLogin()}
        style={[
          styles.button,
          !user || !senha ? styles.disabledStyle : styles.enabledStyle,
        ]}
      >
        <Text style={styles.btnText}>Log In</Text>
      </TouchableOpacity>
    </View>
  );
}
