import { StatusBar } from 'expo-status-bar'; 
import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Platform, Pressable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AwesomeAlert from 'react-native-awesome-alerts';

import RealizarLogin from './src/screens/realizarLogin';
import RealizarCadastro from './src/screens/realizarCadastro';
import telaInicial from './src/screens/telaInicial';
import telaGaleria from './src/screens/galeria';
import telaUpload from './src/screens/realizarUpload';
import telaPerfil from './src/screens/telaPerfil';

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

function AuthStack({ setIsLoggedIn }) {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Login">
        {(props) => <RealizarLogin {...props} setIsLoggedIn={setIsLoggedIn} />}
      </Stack.Screen>
      <Stack.Screen name="Cadastro" component={RealizarCadastro} />
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

function CustomDrawerContent({ navigation, state, descriptors, isLoggedIn, setIsLoggedIn }) {
  const [showLogoutAlert, setShowLogoutAlert] = useState(false);

  const handleLogout = () => {
    if (Platform.OS === 'web') {
      const confirmed = window.confirm('Tem certeza que deseja sair?');
      if (confirmed) {
        setIsLoggedIn(false);
        navigation.closeDrawer();
      }
    } else {
      setShowLogoutAlert(true);
    }
  };

  const confirmLogout = () => {
    setShowLogoutAlert(false);
    setIsLoggedIn(false);
    navigation.closeDrawer();
  };

  const cancelLogout = () => {
    setShowLogoutAlert(false);
  };

  // Clona as rotas originais do drawer
  const drawerRoutes = [...state.routes];

  // Adiciona 'Perfil' se estiver logado e não existir ainda
  if (isLoggedIn && !drawerRoutes.find(r => r.name === 'Perfil')) {
    drawerRoutes.push({ key: 'perfilKey', name: 'Perfil' });
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      <DrawerContentScrollView
        {...{ navigation, state, descriptors }}
        contentContainerStyle={{ backgroundColor: '#000' }}
      >
        <View style={styles.logoContainer}>
          <Image source={require('./src/assets/logo_fundopreto.png')} style={styles.logo} />
        </View>

        <View style={{ flex: 1, backgroundColor: '#000', paddingTop: 10 }}>
          {drawerRoutes.map((route, index) => {
            const focused = index === state.index;
            const onPress = () => {
              navigation.navigate(route.name);
            };

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

          {/* Botão Sair */}
          {isLoggedIn && (
            <Pressable
              onPress={handleLogout}
              style={({ hovered }) => [
                styles.drawerItem,
                hovered && Platform.OS === 'web' && styles.drawerItemHover,
                { marginTop: 20, borderTopWidth: 1, borderTopColor: '#444' },
              ]}
            >
              <Text style={[styles.drawerLabel, { color: '#f44336', fontWeight: 'bold' }]}>Sair</Text>
            </Pressable>
          )}
        </View>
      </DrawerContentScrollView>

      {/* Sweet Alert */}
      <AwesomeAlert
        show={showLogoutAlert}
        showProgress={false}
        title="Sair"
        message="Tem certeza que deseja sair?"
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={true}
        cancelText="Cancelar"
        confirmText="Sair"
        confirmButtonColor="#f44336"
        onCancelPressed={cancelLogout}
        onConfirmPressed={confirmLogout}
        onDismiss={cancelLogout}
      />
    </View>
  );
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <Drawer.Navigator
          initialRouteName="Início"
          drawerContent={(props) => (
            <CustomDrawerContent {...props} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          )}
          screenOptions={{
            headerStyle: { backgroundColor: '#000' },
            headerTintColor: '#fff',
            headerTitle: () => <LogoHeader />,
            drawerStyle: { backgroundColor: '#000' },
            drawerActiveTintColor: '#fff',
            drawerInactiveTintColor: '#aaa',
            drawerLabelStyle: { fontSize: 16, marginLeft: -10 },
          }}
        >
          <Drawer.Screen name="Início" component={telaInicial} />
          <Drawer.Screen name="Galeria" component={telaGaleria} />
          <Drawer.Screen name="Agendamento" component={AgendamentoStack} />
          <Drawer.Screen name="Upload de fotos" component={telaUpload} />
          <Drawer.Screen name="Perfil" component={telaPerfil} />
        </Drawer.Navigator>
      ) : (
        <AuthStack setIsLoggedIn={setIsLoggedIn} />
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
