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
import { auth } from '../../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function Login({ navigation, setIsLoggedIn }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async () => {
    if (!email.trim() || !senha.trim()) {
      Alert.alert('Atenção', 'Preencha todos os campos!');
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, senha);
      const user = userCredential.user;
      console.log('Usuário logado:', user.email);
      Alert.alert('Sucesso', 'Login realizado com sucesso!');
      setIsLoggedIn(true); // <-- Ativa o drawer e a navegação principal
      // navigation.navigate('Inicio'); // pode tirar, pq a navegação muda automaticamente
    } catch (error) {
      console.log('Erro no login:', error);
      switch (error.code) {
        case 'auth/user-not-found':
          Alert.alert('Erro', 'Usuário não encontrado!');
          break;
        case 'auth/wrong-password':
          Alert.alert('Erro', 'Senha incorreta!');
          break;
        case 'auth/invalid-email':
          Alert.alert('Erro', 'Email inválido!');
          break;
        case 'auth/network-request-failed':
          Alert.alert('Erro', 'Sem conexão com a internet!');
          break;
        default:
          Alert.alert('Erro', error.message);
      }
    }
  };

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

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email:</Text>
            <TextInput
              style={styles.input}
              placeholder="Insira seu email"
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor="#aaa"
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

          <Pressable
            style={styles.button}
            onPress={handleLogin}
          >
            <Text style={styles.buttonText}>ENTRAR</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.textCadastro}>
        <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
          <Text style={styles.linkCadastro}>
            Não tem uma conta? <Text style={styles.linkDestacado}>Cadastre-se</Text>
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
    paddingHorizontal: 60,
    paddingVertical: 3,
    marginBottom: 20,
  },
  title: {
    fontSize: 23,
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
    borderRadius: 22,
    marginTop: 20,
  },
  buttonText: {
    color: '#000',
    fontWeight: '900',
  },
  textCadastro: {
    marginTop: -90,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    width: 'auto',
    height: 90,
    borderRadius: 900,
  },

  linkCadastro: {
    fontSize: 16,
    color: '#fff',
  },

  linkDestacado: {
    color: '#fff',
    textDecorationLine: 'underline',
  },
});