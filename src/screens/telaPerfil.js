import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Icone from 'react-native-vector-icons/Feather';
import AwesomeAlert from 'react-native-awesome-alerts';

export default function TelaPerfil() {
  const [nome, setNome] = useState('Seu Nome');
  const [email, setEmail] = useState('seuemail@email.com');
  const [senha, setSenha] = useState('******');

  const [editandoCampo, setEditandoCampo] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  const handleSalvar = () => {
    setShowAlert(true);
    setEditandoCampo(null);
  };

  return (
    <View style={styles.container}>
      {/* Topo preto com título */}
      <View style={styles.header}>
        <Text style={styles.title}>PERFIL</Text>
      </View>

      {/* Foto */}
      <View style={styles.imageBox}>
        <Image
          source={require('../assets/perfil icon.png')} // coloque sua imagem aqui
          style={styles.image}
        />
      </View>

      {/* Box de edição */}
      <View style={styles.editBox}>
        {/* Nome */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Nome:</Text>
          {editandoCampo === 'nome' ? (
            <TextInput
              style={styles.input}
              value={nome}
              onChangeText={setNome}
              onBlur={() => setEditandoCampo(null)}
              autoFocus
            />
          ) : (
            <TouchableOpacity
              style={styles.inputTouchable}
              onPress={() => setEditandoCampo('nome')}
            >
              <Text style={styles.inputText}>{nome}</Text>
              <Icone name="edit" size={18} color="#fff" />
            </TouchableOpacity>
          )}
        </View>

        {/* Email */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email:</Text>
          {editandoCampo === 'email' ? (
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              onBlur={() => setEditandoCampo(null)}
              keyboardType="email-address"
              autoFocus
            />
          ) : (
            <TouchableOpacity
              style={styles.inputTouchable}
              onPress={() => setEditandoCampo('email')}
            >
              <Text style={styles.inputText}>{email}</Text>
              <Icone name="edit" size={18} color="#fff" />
            </TouchableOpacity>
          )}
        </View>

        {/* Senha */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Senha:</Text>
          {editandoCampo === 'senha' ? (
            <TextInput
              style={styles.input}
              value={senha}
              onChangeText={setSenha}
              onBlur={() => setEditandoCampo(null)}
              secureTextEntry
              autoFocus
            />
          ) : (
            <TouchableOpacity
              style={styles.inputTouchable}
              onPress={() => setEditandoCampo('senha')}
            >
              <Text style={styles.inputText}>
                {senha.replace(/./g, '•')}
              </Text>
              <Icone name="edit" size={18} color="#fff" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Botão Salvar */}
      <TouchableOpacity style={styles.button} onPress={handleSalvar}>
        <Text style={styles.buttonText}>SALVAR</Text>
      </TouchableOpacity>

      {/* Alerta bonito */}
      <AwesomeAlert
        show={showAlert}
        showProgress={false}
        title="Sucesso!"
        message="Dados atualizados com sucesso!"
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showConfirmButton={true}
        confirmText="OK"
        confirmButtonColor="#000"
        onConfirmPressed={() => setShowAlert(false)}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4ecde',
    alignItems: 'center',
  },
  header: {
    backgroundColor: '#000',
    width: '100%',
    paddingVertical: 20,
    alignItems: 'center',
  },
  title: {
    color: '#f4ecde',
    fontSize: 20,
    fontWeight: 'bold',
  },
  imageBox: {
    marginTop: 20,
    alignItems: 'center',
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#ccc',
  },
  editBox: {
    backgroundColor: '#000',
    width: '85%',
    padding: 20,
    borderRadius: 15,
    marginTop: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    color: '#f4ecde',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  inputTouchable: {
    borderBottomWidth: 1,
    borderBottomColor: '#aaa',
    paddingVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputText: {
    color: '#fff',
    fontSize: 16,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#aaa',
    color: '#fff',
    paddingVertical: 5,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#000',
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderRadius: 50,
    marginTop: 20,
  },
  buttonText: {
    color: '#f4ecde',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
