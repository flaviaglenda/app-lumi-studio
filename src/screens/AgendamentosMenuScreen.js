import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function AgendamentosMenuScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.option}>
        <TouchableOpacity
          style={styles.circleButton}
          onPress={() => navigation.navigate('Agendamento')}
        >
          <Icon name="pen" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.label}>Agendar</Text>
      </View>

      <View style={styles.option}>
        <TouchableOpacity
          style={styles.circleButton}
          onPress={() => navigation.navigate('MeusAgendamentos')}
        >
          <Icon name="calendar-alt" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.label}>Meus Agendamentos</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4ecde',
    justifyContent: 'center',
    alignItems: 'center',
  },
  option: {
    alignItems: 'center',
    marginVertical: 20, // espaço entre as opções
  },
  circleButton: {
    width: 100,
    height: 100,
    backgroundColor: '#000',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    marginTop: 10,
    color: '#000',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});