import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import realizarLogin from './src/screens/realizarLogin';
import realizarCadastro from './src/screens/realizarCadastro';
import telaInicial from './src/screens/telaInicial';
import telaGaleria from './src/screens/galeria';
import telaAgendamento from './src/screens/agendamento';
import telaUpload from './src/screens/realizarUpload';

// const Drawer = createDrawerNavigator();
const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Início">
        <Drawer.Screen name="Login" component={realizarLogin} />
        <Drawer.Screen name="Início" component={telaInicial} />
        <Drawer.Screen name="Cadastro" component={realizarCadastro} />
        <Drawer.Screen name="Galeria" component={telaGaleria} />
        <Drawer.Screen name="Agendamento" component={telaAgendamento} />
        <Drawer.Screen name="Upload de fotos" component={telaUpload} />
      </Drawer.Navigator>
    </NavigationContainer>

  );
}

// export default function App() {
//   return (
//     <NavigationContainer>
//       <View style={styles.container}>
//         <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Login">
//           <Stack.Screen name="Login" component={realizarLogin} />
//           <Stack.Screen name="Cadastro" component={realizarCadastro} />
//           <Stack.Screen name="Principal" component={DrawerNavigator} />
//         </Stack.Navigator>
//         <StatusBar style="auto" />
//       </View>
//     </NavigationContainer>
//   );
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
