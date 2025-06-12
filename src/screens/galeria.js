import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';

export default function App({navigation}) {
  return (
    <ImageBackground
    source={require('../assets/fundo-galeria.png')}
    style={styles.background}
    resizeMode='cover'
    >
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  background: {
    flex1: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    width: 400,
    height: '100%',
      
  }
});
