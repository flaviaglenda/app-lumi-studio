import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  Keyboard,
  Platform,
  KeyboardAvoidingView,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert
} from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import banner from '../assets/titolo.png';
import { useNavigation } from '@react-navigation/native';
import { getAuth } from 'firebase/auth';

export default function AgendamentoScreen() {
  const [sucesso, setSucesso] = useState(false);
  const [erro, setErro] = useState('');
  const navigation = useNavigation();
  const [form, setForm] = useState({
    nome: '',
    telefone: '',
    data: '',
    hora: '',
    detalhes: ''
  });
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [campoAtivo, setCampoAtivo] = useState('');

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
      setCampoAtivo('');
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const handleChange = (field, value) => {
    setErro('');
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      setErro('Você precisa estar logado para agendar.');
      return;
    }

    if (!form.telefone || !form.data || !form.hora) {
      setErro('Preencha todos os campos obrigatórios.');
      return;
    }

    const dataCompleta = `${form.data}T${form.hora.length === 5 ? form.hora : form.hora + ':00'}`;

    if (isNaN(Date.parse(dataCompleta))) {
      setErro('Data ou hora inválida.');
      return;
    }

    try {
      await addDoc(collection(db, 'agendamentos'), {
        uidUsuario: user.uid,
        nomeCompleto: form.nome || user.displayName || '',
        emailAgendamento: user.email,
        telefone: form.telefone,
        dataAgendamento: new Date(dataCompleta),
        detalhes: form.detalhes || '',
        criadoEm: new Date()
      });

      setErro('');          
      setSucesso(true);    
      setForm({ nome: '', telefone: '', data: '', hora: '', detalhes: '' });

      
    } catch (error) {
      console.error('Erro ao enviar agendamento:', error);
      setErro('Ocorreu um erro ao enviar seu agendamento.');
    }
  };

  LocaleConfig.locales['pt-br'] = {
    monthNames: [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ],
    monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    dayNames: ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'],
    dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
    today: 'Hoje'
  };

  LocaleConfig.defaultLocale = 'pt-br';

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity style={styles.voltar} onPress={() => navigation.goBack()}>
          <Text style={styles.voltarTexto}>← Voltar</Text>
        </TouchableOpacity>
        <Image source={banner} style={styles.banner} resizeMode="contain" />

        <TextInput
          placeholder="Seu nome completo"
          style={styles.input}
          onFocus={() => setCampoAtivo('nome')}
          onChangeText={text => handleChange('nome', text)}
          value={form.nome}
        />

        <TextInput
          placeholder="Telefone (com DDD)"
          keyboardType="phone-pad"
          style={styles.input}
          onFocus={() => setCampoAtivo('telefone')}
          onChangeText={text => handleChange('telefone', text)}
          value={form.telefone}
        />
        <View style={styles.calendarWrapper}>
          <Calendar
            onDayPress={(day) => handleChange('data', day.dateString)}
            markedDates={{
              [form.data]: { selected: true, selectedColor: '#ffc107' }
            }}
            theme={{
              selectedDayBackgroundColor: '#ffc107',
              todayTextColor: '#000',
            }}
          />
        </View>
        <TextInput
          placeholder="Horário (Brasília)"
          style={styles.input}
          onFocus={() => setCampoAtivo('hora')}
          onChangeText={text => handleChange('hora', text)}
          value={form.hora}
        />
        <TextInput
          placeholder="Algum detalhe extra?"
          multiline
          numberOfLines={4}
          style={[styles.input, styles.textArea]}
          onFocus={() => setCampoAtivo('detalhes')}
          onChangeText={text => handleChange('detalhes', text)}
          value={form.detalhes}
        />
        {sucesso && (
          <View style={styles.modalOverlay}>
            <View style={styles.modalBox}>
              <Text style={styles.modalText}>Agendamento enviado com sucesso!</Text>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => {
                  setSucesso(false);
                  navigation.navigate('MeusAgendamentos');
                }}
              >
                <Text style={styles.modalButtonText}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        {erro !== '' && (
          <View style={styles.containerErro}>
            <Text style={styles.textoErro}>{erro}</Text>
          </View>
        )}
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>ENVIAR</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Caixinha flutuante */}
      {keyboardVisible && campoAtivo !== '' && form[campoAtivo] !== '' && (
        <View style={styles.previewFloating}>
          <Text style={styles.previewText}>Digitando: {form[campoAtivo]}</Text>
        </View>
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F6EFE0',
    padding: 20,
    paddingBottom: 100,
  },
  banner: {
    width: '100%',
    height: 150,
    marginBottom: 20,
  },

  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)', // fundo escuro translúcido
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modalBox: {
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 10,
    alignItems: 'center',
    maxWidth: '80%',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButton: {
    backgroundColor: '#ffc107',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 5,
  },
  modalButtonText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
  },
  calendarWrapper: {
    transform: [{ scale: 1 }],
    alignSelf: 'center',
    borderRadius: 10,
    marginBottom: 20,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  voltar: {
    alignSelf: 'flex-start',
    marginLeft: 10,
    marginTop: 5,
    marginBottom: 10,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#000',
    borderRadius: 8,
  },

  voltarTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#000',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  previewBox: {
    marginBottom: 15,
  },
  previewText: {
    fontSize: 14,
    color: '#333',
  },
  containerErro: {
    backgroundColor: '#f8d7da',
    padding: 10,
    marginVertical: 8,
    borderRadius: 5,
  },
  textoErro: {
    color: '#721c24',
    fontWeight: 'bold',
  },
  previewFloating: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 290 : 100,
    left: 20,
    right: 20,
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});