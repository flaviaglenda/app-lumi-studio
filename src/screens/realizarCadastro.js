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
    if (!nome.trim() || !email.trim() || !senha.trim()) {
      Alert.alert('Erro', 'Preencha todos os campos!');
      return;
    }

    if (senha.length < 6) {
      Alert.alert('Erro', 'A senha precisa ter no mínimo 6 caracteres.');
      return;
    }

    try {
      // Cria usuário com email e senha
      const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
      const user = userCredential.user;

      // Salva dados adicionais no Firestore
      await setDoc(doc(db, 'usuarios', user.uid), {
        nome: nome.trim(),
        email: email.trim(),
        uid: user.uid,
      });

      Alert.alert('Sucesso', 'Conta criada com sucesso!');
      navigation.navigate('Login');

    } catch (error) {
      console.log('Erro no cadastro:', error.code, error.message);

      // Mensagens específicas baseadas no erro
      switch (error.code) {
        case 'auth/email-already-in-use':
          Alert.alert('Erro', 'Este email já está em uso.');
          break;
        case 'auth/invalid-email':
          Alert.alert('Erro', 'Email inválido.');
          break;
        case 'auth/weak-password':
          Alert.alert('Erro', 'A senha precisa ter no mínimo 6 caracteres.');
          break;
        default:
          Alert.alert('Erro', `Erro ao cadastrar: ${error.message}`);
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

          {/* Nome */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nome:</Text>
            <TextInput
              style={styles.input}
              placeholder="Insira seu nome completo"
              placeholderTextColor="#aaa"
              value={nome}
              onChangeText={setNome}
              autoCapitalize="words"
              keyboardType="default"
            />
          </View>

          {/* Email */}
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
              textContentType="emailAddress"
            />
          </View>

          {/* Senha */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Senha:</Text>
            <TextInput
              style={styles.input}
              placeholder="Insira sua senha"
              secureTextEntry
              placeholderTextColor="#aaa"
              value={senha}
              onChangeText={setSenha}
              textContentType="password"
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
    borderRadius: 10,
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
    marginBottom: 6,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#aaa',
    color: '#fff',
    paddingVertical: 8,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#f4ecde',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 15,
    marginTop: 20,
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
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
