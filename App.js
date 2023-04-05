
import React  from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import ClienteDetailScreen from './components/pages/ClienteDetailScreen';
import ClientesList from './components/pages/ClientesList';
import CreateClienteScreen from './components/pages/CreateClienteScreen';

const Stack = createNativeStackNavigator();

export default function App() {

  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='ClientesList' screenOptions={{/*headerShown:false*/}}>
        <Stack.Screen name="ClientesList" component={ClientesList} options={{title:'Lista de Clientes'}}/>
        <Stack.Screen name="ClienteDetailScreen" component={ClienteDetailScreen} options={{title:'Datos del Cliente'}}/>
        <Stack.Screen name="CreateClienteScreen" component={CreateClienteScreen} options={{title:'Registrar Cliente'}}/>
        
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

