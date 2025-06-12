import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Cabecalho() {
  return (
    <View style={styles.container}>
      <View style={styles.linha}>
        <Icon name="film" size={24} color="#000" />
        <Icon name="film" size={24} color="#000" style={{ marginLeft: 8 }} />
        <Icon name="film" size={24} color="#000" style={{ marginLeft: 8 }} />
      </View>

      <Text style={styles.titulo}>Agende</Text>
      <Text style={styles.subtitulo}>seus ensaios</Text>

      <View style={styles.linha}>
        <Icon name="film" size={24} color="#000" />
        <Icon name="film" size={24} color="#000" style={{ marginLeft: 8 }} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 20,
  },
  linha: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  titulo: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
  },
  subtitulo: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
    marginBottom: 10,
  }
});