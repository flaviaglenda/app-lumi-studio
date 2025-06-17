import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { collection, getDocs, query, orderBy, where } from 'firebase/firestore'; // ← importante importar where
import { db } from '../../firebaseConfig';
import { useNavigation } from '@react-navigation/native';
import { getAuth } from 'firebase/auth';


export default function MeusAgendamentosScreen() {
  const navigation = useNavigation();
  const [agendamentos, setAgendamentos] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const carregarAgendamentos = async () => {
      try {
        const auth = getAuth();
        const user = auth.currentUser;
        
        if (!user) {
          console.log("Nenhum usuário logado");
          setLoading(false);
          return;
        }
        console.log("Email do usuário logado:", user.email);
        const q = query(
          collection(db, 'agendamentos'),
          where('emailAgendamento', '==', user.email),
          orderBy('dataAgendamento')
        );

        const snapshot = await getDocs(q);
        const lista = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        setAgendamentos(lista);
      } catch (error) {
        console.error('Erro ao buscar agendamentos:', error);
      } finally {
        setLoading(false);
      }
    };

    carregarAgendamentos();
  }, []);

  const renderItem = ({ item }) => {
    const data = new Date(item.dataAgendamento.toDate ? item.dataAgendamento.toDate() : item.dataAgendamento);
    const dia = data.getDate().toString().padStart(2, '0');
    const mes = (data.getMonth() + 1).toString().padStart(2, '0');
    const hora = data.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

    return (
      <View style={styles.item}>
        <View style={styles.info}>
          <Text style={styles.nome}>{item.nomeCompleto}</Text>
          <Text style={styles.text}>Email: {item.emailAgendamento}</Text>
          <Text style={styles.text}>Telefone: {item.telefone}</Text>
          <Text style={styles.text}>Horário: {hora}</Text>
          {item.detalhes ? <Text style={styles.text}>Detalhes: {item.detalhes}</Text> : null}
        </View>
        <View style={styles.dataCirculo}>
          <Text style={styles.dataTexto}>{dia}/{mes}</Text>
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ffc107" />
        <Text style={{ color: '#fff' }}>Carregando agendamentos...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#121212' }}>
      <TouchableOpacity style={styles.voltar} onPress={() => navigation.goBack()}>
        <Text style={styles.voltarTexto}>← Voltar</Text>
      </TouchableOpacity>

      <FlatList
        data={agendamentos}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.container}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 40,
  },
  voltar: {
    alignSelf: 'flex-start',
    marginLeft: 10,
    marginTop: 10,
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
  item: {
    backgroundColor: '#000',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 4,
  },
  info: {
    flex: 1,
    paddingRight: 12,
  },
  nome: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#fff',
    marginBottom: 4,
  },
  text: {
    color: '#eee',
    fontSize: 14,
    marginBottom: 2,
  },
  dataCirculo: {
    backgroundColor: '#ffc107',
    borderRadius: 50,
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  dataTexto: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#121212',
    justifyContent: 'center',
    alignItems: 'center',
  },
});