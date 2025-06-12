import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Button } from 'react-native';

export default function AgendamentosMenuScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      <Button
        title="Fazer Agendamento"
        onPress={() => navigation.navigate('Agendamento')}
      />
      <View style={{ height: 20 }} />
      <Button
        title="Meus Agendamentos"
        onPress={() => navigation.navigate('MeusAgendamentos')}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    padding:20,
    backgroundColor: '#F6EFE0',
  },
  title: {
    fontSize: 22,
    marginBottom: 30,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#ffc107',
    padding: 15,
    marginVertical: 10,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
});