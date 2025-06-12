import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Platform, Pressable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer';
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

// Pilha de autenticação (login e cadastro), sem drawer
function AuthStack() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false, // Sem header aqui também
      }}
    >
      <Stack.Screen name="Login" component={realizarLogin} />
      <Stack.Screen name="Cadastro" component={realizarCadastro} />
    </Stack.Navigator>
  );
}

function LogoHeader() {
  return (
    <Image
      source={require('./src/assets/logo_fundopreto.png')}
      style={{ width: 50, height: 50, resizeMode: 'contain' }}
    />
  );
}

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ backgroundColor: '#000' }}>
      <View style={styles.logoContainer}>
        <Image source={require('./src/assets/logo_fundopreto.png')} style={styles.logo} />
      </View>
      <View style={{ flex: 1, backgroundColor: '#000', paddingTop: 10 }}>
        {props.state.routes.map((route, index) => {
          const focused = index === props.state.index;
          const onPress = () => props.navigation.navigate(route.name);

          return (
            <Pressable
              key={route.key}
              onPress={onPress}
              style={({ hovered }) => [
                styles.drawerItem,
                focused && styles.drawerItemFocused,
                hovered && Platform.OS === 'web' && styles.drawerItemHover,
              ]}
            >
              <Text style={styles.drawerLabel}>{route.name}</Text>
            </Pressable>
          );
        })}
      </View>
    </DrawerContentScrollView>
  );
}

export default function App() {
  // Aqui, você vai controlar se o usuário está logado
  // Por enquanto vamos usar um estado falso para simular
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <Drawer.Navigator
          initialRouteName="Início"
          drawerContent={(props) => <CustomDrawerContent {...props} />}
          screenOptions={{
            headerStyle: { backgroundColor: '#000' },
            headerTintColor: '#fff',
            headerTitle: () => <LogoHeader />, // Logo em todas as telas do drawer
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
          <Drawer.Screen name="Início" component={telaInicial} />
          <Drawer.Screen name="Galeria" component={telaGaleria} />
          <Drawer.Screen name="Agendamento" component={AgendamentoStack} />
          <Drawer.Screen name="Upload de fotos" component={telaUpload} />
        </Drawer.Navigator>
      ) : (
        <AuthStack />
      )}

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
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  drawerItem: {
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  drawerItemFocused: {
    backgroundColor: '#1a1a1a',
  },
  drawerItemHover: {
    backgroundColor: '#333',
  },
  drawerLabel: {
    color: '#fff',
    fontSize: 16,
  },
});
