import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig'; // ajuste o caminho

console.log('DB é:', db);
export default function AgendamentoScreen() {
  const [form, setForm] = useState({
    nome: '',
    email: '',
    telefone: '',
    data: '',
    hora: '',
    detalhes: ''
  });
  
  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!form.nome || !form.email || !form.telefone || !form.data || !form.hora) {
      Alert.alert('Erro', 'Preencha todos os campos obrigatórios.');
      return;
    }

    const dataCompleta = `${form.data}T${form.hora.length === 5 ? form.hora : form.hora + ':00'}`;

    if (isNaN(Date.parse(dataCompleta))) {
      Alert.alert('Erro', 'Data ou hora inválida.');
      return;
    }

    try {
      await addDoc(collection(db, 'agendamentos'), {
        nomeCompleto: form.nome,
        emailAgendamento: form.email,
        telefone: form.telefone,
        dataAgendamento: new Date(dataCompleta),
        detalhes: form.detalhes
      });
      Alert.alert('Sucesso', 'Agendamento enviado!');
      setForm({ nome: '', email: '', telefone: '', data: '', hora: '', detalhes: '' });
    } catch (error) {
      console.error('Erro ao enviar agendamento:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao enviar seu agendamento.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Agende seus ensaios</Text>

      <TextInput
        placeholder="Seu nome completo"
        style={styles.input}
        onChangeText={text => handleChange('nome', text)}
        value={form.nome}
      />
      <TextInput
        placeholder="Seu e-mail"
        style={styles.input}
        onChangeText={text => handleChange('email', text)}
        value={form.email}
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Telefone (com DDD)"
        keyboardType="phone-pad"
        style={styles.input}
        onChangeText={text => handleChange('telefone', text)}
        value={form.telefone}
      />

      <Calendar
        onDayPress={day => handleChange('data', day.dateString)}
        style={styles.calendar}
        theme={{
          selectedDayBackgroundColor: '#ffc107',
          todayTextColor: '#000',
        }}
        markedDates={{
          [form.data]: { selected: true, selectedColor: '#ffc107' }
        }}
      />

      <TextInput
        placeholder="Horário (Brasília)"
        style={styles.input}
        onChangeText={text => handleChange('hora', text)}
        value={form.hora}
      />
      <TextInput
        placeholder="Algum detalhe extra?"
        multiline
        numberOfLines={4}
        style={[styles.input, styles.textArea]}
        onChangeText={text => handleChange('detalhes', text)}
        value={form.detalhes}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>ENVIAR</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fdf1dc',
    alignItems: 'center'
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20
  },
  input: {
    width: '100%',
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    marginBottom: 10
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#000',
    padding: 15,
    borderRadius: 8,
    width: '100%',
    marginVertical: 10
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  calendar: {
    marginBottom: 20,
    marginTop: 20,
    width: '100%',
    borderRadius: 12
  }
});
