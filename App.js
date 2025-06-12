// App.js
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import realizarLogin from './src/screens/realizarLogin';
import realizarCadastro from './src/screens/realizarCadastro';
import telaInicial from './src/screens/telaInicial';
import telaGaleria from './src/screens/galeria';
import telaUpload from './src/screens/realizarUpload';

import AgendamentosMenuScreen from './src/screens/AgendamentosMenuScreen';
import AgendamentoScreen from './src/screens/agendamento';
import MeusAgendamentosScreen from './src/screens/MeusAgendamentosScreen';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function AgendamentoStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AgendamentosMenu" component={AgendamentosMenuScreen} />
      <Stack.Screen name="Agendamento" component={AgendamentoScreen} />
      <Stack.Screen name="MeusAgendamentos" component={MeusAgendamentosScreen} />
    </Stack.Navigator>
  );
}

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ backgroundColor: '#000' }}>
      <View style={styles.logoContainer}>
        <Image
          source={require('./src/assets/logo_fundopreto.png')}
          style={styles.logo}
        />
        <Text style={styles.logoText}>Ilumi Studiu</Text>
      </View>
      <View style={{ flex: 1, backgroundColor: '#000', paddingTop: 10 }}>
        <DrawerItemList {...props} />
      </View>
    </DrawerContentScrollView>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Início"
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          headerStyle: { backgroundColor: '#000' },
          headerTintColor: '#fff',
          drawerStyle: {
            backgroundColor: '#000',
          },
          drawerActiveTintColor: '#fff',
          drawerInactiveTintColor: '#aaa',
          drawerLabelStyle: {
            fontSize: 16,
            marginLeft: -10,
          },
        }}
      >
        <Drawer.Screen name="Login" component={realizarLogin} />
        <Drawer.Screen name="Cadastro" component={realizarCadastro} />
        <Drawer.Screen name="Início" component={telaInicial} />
        <Drawer.Screen name="Galeria" component={telaGaleria} />
        <Drawer.Screen name="Agendamento" component={AgendamentoStack} />
        <Drawer.Screen name="Upload de fotos" component={telaUpload} />
      </Drawer.Navigator>
      <StatusBar style="light" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#222',
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  logoText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
