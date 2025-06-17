import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ImageBackground,
  Image,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Alert,
} from 'react-native';
import { auth, db } from '../../firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';

export default function Cadastro({ navigation }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleCadastro = async () => {
    if (!nome || !email || !senha) {
      Alert.alert('Preencha todos os campos!');
      return;
    }

    if (senha.length < 6) {
      Alert.alert('A senha precisa ter no mínimo 6 caracteres.');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
      const user = userCredential.user;

      // Salvando nome e email no Firestore
      await setDoc(doc(db, 'usuarios', user.uid), {
        nome: nome,
        email: email,
        uid: user.uid,
      });

      Alert.alert('Conta criada com sucesso!');
      navigation.navigate('Login');

    } catch (error) {
      console.log('Erro no cadastro:', error.code, error.message);

      if (error.code === 'auth/email-already-in-use') {
        Alert.alert('Este email já está em uso.');
      } else if (error.code === 'auth/invalid-email') {
        Alert.alert('Email inválido.');
      } else if (error.code === 'auth/weak-password') {
        Alert.alert('A senha precisa ter no mínimo 6 caracteres.');
      } else {
        Alert.alert('Erro ao cadastrar:', error.message);
      }
    }
  };

  return (
    <ImageBackground
      source={require('./../assets/cadastrar-fundo.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <View style={styles.loginBox}>
          <Image source={require('./../assets/logo_fundopreto.png')} style={styles.logo} />

          <View style={styles.titleBox}>
            <Text style={styles.title}>CADASTRAR</Text>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nome:</Text>
            <TextInput
              style={styles.input}
              placeholder="Insira seu nome completo"
              placeholderTextColor="#aaa"
              value={nome}
              onChangeText={setNome}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email:</Text>
            <TextInput
              style={styles.input}
              placeholder="Insira seu email"
              keyboardType="email-address"
              placeholderTextColor="#aaa"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Senha:</Text>
            <TextInput
              style={styles.input}
              placeholder="Insira sua senha"
              secureTextEntry
              placeholderTextColor="#aaa"
              value={senha}
              onChangeText={setSenha}
            />
          </View>

          <Pressable style={styles.button} onPress={handleCadastro}>
            <Text style={styles.buttonText}>CADASTRAR</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.textCadastro}>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.linkCadastro}>
            Já possui uma conta? <Text style={styles.linkDestacado}>Entrar</Text>
          </Text>
        </TouchableOpacity>
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
    borderRadius: 15,
    marginTop: 20,
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  textCadastro: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: 90,
    backgroundColor: 'black',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999,
  },
  linkCadastro: {
    top: 15,
    fontSize: 16,
    color: '#fff',
  },

  linkDestacado: {
    color: '#fff',
    textDecorationLine: 'underline',
  },
});