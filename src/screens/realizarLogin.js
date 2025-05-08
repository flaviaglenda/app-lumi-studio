import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
  View,
  Text,
  TextInput,
  ImageBackground,
  Image,
  StyleSheet,
  Pressable,
} from 'react-native';
// import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';


export default function App({navigation}) {
  return (
    <ImageBackground
      source={require('./../assets/login-fundo.jpg')} 
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <View style={styles.loginBox}>
          <Image source={require('./../assets/logo_fundopreto.png')} style={styles.logo} />

          <View style={styles.titleBox}>
            <Text style={styles.title}>LOGIN</Text>
          </View>

          {/* <View style={styles.inputGroup}>
            <Text style={styles.label}>Nome:</Text>
            <TextInput
              style={styles.input}
              placeholder="Insira seu nome completo"
              placeholderTextColor="#aaa"
            />
          </View> */}

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email:</Text>
            <TextInput
              style={styles.input}
              placeholder="Insira seu email"
              keyboardType="email-address"
              placeholderTextColor="#aaa"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Senha:</Text>
            <TextInput
              style={styles.input}
              placeholder="Insira sua senha"
              secureTextEntry
              placeholderTextColor="#aaa"
            />
          </View>

          <Pressable
            style={styles.button}
            onPress={() => navigation.navigate('Início')}
          >
            <Text style={styles.buttonText}>ENTRAR</Text>
          </Pressable>
        </View>
      </View>
      <StatusBar style="auto" />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#f4ecde',
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  loginBox: {
    backgroundColor: '#000',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  titleBox: {
    backgroundColor: '#f4ecde',
    paddingHorizontal: 20,
    paddingVertical: 5,
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '900',
    color: '#000',
  },
  inputGroup: {
    width: '100%',
    marginBottom: 15,
  },
  label: {
    color: '#fff',
    fontWeight: '600',
    marginBottom: 2,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#aaa',
    color: '#fff',
    paddingVertical: 5,
  },
  button: {
    backgroundColor: '#f4ecde',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 20,
  },
  buttonText: {
    color: '#000',
    fontWeight: '900',
  },
});