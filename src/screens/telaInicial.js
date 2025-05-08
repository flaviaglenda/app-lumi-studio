import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View } from 'react-native';

  const Início = ({navigation}) => {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <Pressable onPress={() => navigation.navigate('Agendamento')}>
          <Text>Agendar </Text>
        </Pressable>
        <StatusBar style="auto" />
      </View>
    );
  }


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Início;