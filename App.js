import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View, Text, Image, StyleSheet, Platform, Pressable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer';

import realizarLogin from './src/screens/realizarLogin';
import realizarCadastro from './src/screens/realizarCadastro';
import telaInicial from './src/screens/telaInicial';
import telaGaleria from './src/screens/galeria';
import telaUpload from './src/screens/realizarUpload';
import AgendamentosMenuScreen from './src/screens/AgendamentosMenuScreen';
import AgendamentoScreen from './src/screens/agendamento';
import MeusAgendamentosScreen from './src/screens/MeusAgendamentosScreen';

const Drawer = createDrawerNavigator();

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
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Login"
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          headerStyle: { backgroundColor: '#000' },
          headerTintColor: '#fff',
          headerTitle: () => <LogoHeader />,
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
        <Drawer.Screen name="Inicio" component={telaInicial} />
        <Drawer.Screen name="Galeria" component={telaGaleria} />
        <Drawer.Screen name="AgendamentosMenu" component={AgendamentosMenuScreen} />
        <Drawer.Screen name="Agendamento" component={AgendamentoScreen} />
        <Drawer.Screen name="MeusAgendamentos" component={MeusAgendamentosScreen} />
        <Drawer.Screen name="Upload de fotos" component={telaUpload} />
        <Drawer.Screen name="Login" component={realizarLogin} />
        <Drawer.Screen name="Cadastro" component={realizarCadastro} />
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