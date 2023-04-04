//import { StatusBar } from 'expo-status-bar';
import React  from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
/*
import Home from './components/pages/Home';
import Register from './components/pages/Register';*/

import ClienteDetailScreen from './components/pages/ClienteDetailScreen';
import ClientesList from './components/pages/ClientesList';
import CreateClienteScreen from './components/pages/CreateClienteScreen';
//import ListClientes from './components/pages/_ListClientes';
// v9 compat packages are API compatible with v8 code
/*import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { config } from './firebaseconfig';*/
import firebase from './database/firebase';
import { firebaseConfig } from './database/firebase';

const Stack = createNativeStackNavigator();

export default function App() {

  /*useEffect(()=>{
    if(!firebase.apps.length){
      firebase.initializeApp(firebaseConfig)
    }
    else{
      firebase.app()
    }
  },[])*/

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='ClientesList' screenOptions={{/*headerShown:false*/}}>
      {/*</ Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Register" component={Register} />*/}

        <Stack.Screen name="ClientesList" component={ClientesList} options={{title:'Lista de Clientes'}}/>
        <Stack.Screen name="ClienteDetailScreen" component={ClienteDetailScreen} options={{title:'Datos del Cliente'}}/>
        <Stack.Screen name="CreateClienteScreen" component={CreateClienteScreen} options={{title:'Registrar Cliente'}}/>
        {/*<Stack.Screen name="ListClientes" component={ListClientes} options={{title:'Registros de Clientes'}}/>*/}
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

