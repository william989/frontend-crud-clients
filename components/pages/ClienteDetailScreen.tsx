import { View, 
  Button, 
  StyleSheet, 
  ScrollView, 
  ActivityIndicator,
  Alert} from 'react-native'
import React from 'react'
import {useEffect, useState} from 'react'
import firebase from '../../database/firebase'
import FormLabel from '../atoms/FormLabel'

import ClienteRegistroForm from '../molecules/ClienteRegistroForm'


type User = {
  id?: string;
  nombres: string;
  apellidos: string;
  dni: string;
  ciudad: string;
  anio: string;
  mes: string;
  dia: string;
};

export default function ClienteDetailScreen(props: any) {

  let fechaActual = new Date();
  const initialState:User = {
    nombres:'',
    apellidos: '',
    dni:'',
    ciudad:'',
    anio:'',
    mes: '',
    dia:'',
  }

  const [user, setUser] = useState(initialState);

  const [loading, setLoading] = useState(true);

  const getUserById = async (id: string) => {
    const dbRef = firebase.db.collection('clientes').doc(id);
    const doc = await dbRef.get();
    const user = doc.data() as User;
    console.log(user);
    setUser({
      ...user,
      id: doc.id,
    });
    setLoading(false);
  };

  useEffect(()=>{
    getUserById(props.route.params.userId)
  },[]);

  
  const handleChangeText = (name, value)=>{
    setUser({...user,[name]:value})
  };

  const deleteUser = async () => {
    const dbRef = firebase.db.collection('clientes').doc(props.route.params.userId);
    await dbRef.delete();
    props.navigation.navigate('ClientesList')
  }

  const updateUser = async() => {
    if(!user.nombres) alert('Nombre es un campo obligatorio')
    else if (!user.apellidos) alert('Apellidos es un campo obligatorio')
    else if (!user.dni) alert('DNI es un campo obligatorio')
    else if (!user.anio) alert('Año es un campo obligatorio')
    else if (!user.mes) alert('Mes es un campo obligatorio')
    else if (!user.dia) alert('Dia es un campo obligatorio')
    else if (!Number.isInteger(Number(user.anio)))alert('Ingresar Correctamente el año (1999)')
    else if (parseInt(user.anio)>fechaActual.getFullYear()) alert('No puede ingresar un año mayor al actual')
    else if (!Number.isInteger(Number(user.mes)))alert('Ingresar Correctamente el mes (12)')
    else if (parseInt(user.mes)<1 || parseInt(user.mes)>12) alert('Ingresar Correctamente el mes (12)')
    else if (!Number.isInteger(Number(user.dia)))alert('Ingresar Correctamente el dia (28)')
    else if (parseInt(user.dia)<1 || parseInt(user.dia)>31) alert('Ingresar Correctamente el dia (28)')
    else if (!Number.isInteger(Number(user.dni)))alert('Ingresar Correctamente el DNI (28)')
    else if (user.dni.length<8)alert('DNI corresponde a 8 digitos')
    else{
      const fechaSeleccionada = new Date(
        user.anio + '-' + user.mes + '-' + user.dia
      );
      const diferencia = fechaActual.getTime() - fechaSeleccionada.getTime();
      const edad = Math.floor(diferencia / 3.154e+10);
      if (edad >= 18) {
        /**VALIDACION DNI */
        // Obtener referencia de la colección 'clientes'
        const usersCollection = firebase.db.collection('clientes');
        // Realizar consulta por dni
        console.log("Busqueda por DNI",user.dni)
        const query = usersCollection.where('dni', '==', user.dni);
        // Obtener resultado de la consulta
        query.get().then((querySnapshot) => {
          
          if (!querySnapshot.empty) {
            if(user.id == querySnapshot.docs[0].id){
              console.log("MODIFICAR EL MISMO",user.id)
              const dbRef = firebase.db.collection('clientes').doc(user.id);
              dbRef.set({
                nombres:user.nombres,
                apellidos:user.apellidos,
                dni:user.dni,
                anio:user.anio,
                mes: user.mes,
                dia:user.dia,
                ciudad:user.ciudad,
              })
              setUser(initialState)
              RegistroConfirmado()
              props.navigation.navigate('ClientesList')
            }
            else{
              console.log("NO PERMITE, es otro",querySnapshot.docs[0].id)
              // El documento con ese dni fue encontrado
              console.log("CANTIDAD DE REGS",querySnapshot.docs.length)
              /*const usuario2 = querySnapshot.docs[0].data();
              console.log('Usuario encontrado:'+usuario2.id, user.id);*/
              alert('Este DNI ya fue Registrado')
            }
          } else {


            console.log('Actualizar con otro dni')

            const dbRef = firebase.db.collection('clientes').doc(user.id);
            dbRef.set({
              nombres:user.nombres,
              apellidos:user.apellidos,
              dni:user.dni,
              anio:user.anio,
              mes: user.mes,
              dia:user.dia,
              ciudad:user.ciudad,
            })
            setUser(initialState)
            RegistroConfirmado()
            props.navigation.navigate('ClientesList')
          }
          
        }).catch((error) => {
          console.error('Error al buscar usuario:', error);
        });
        /**VALIDACION DNI */

          
      } else {
        alert('Solo se pueden registrar mayores de 18')
      }
    }
  }

  const openConfirmationAlert = () => {
    Alert.alert('Borrar Cliente','Esta seguro de borrar',[
      {text: 'Si', onPress: () => deleteUser()},
      {text: 'No', onPress: () => console.log('False')}
    ])
  }

  
  const ValidarNombre = () => {
    Alert.alert('Nombres','Debe ingresar mas de 2 caracteres y maximo 20',[
      {text: 'OK', onPress: () => console.log('ValidarNombre')}
    ])
  }

  
  const RegistroConfirmado = () => {
    Alert.alert('Cliente','Los datos del cliente fueron actualizados con exito',[
      {text: 'OK', onPress: () => console.log('ValidarNombre')}
    ])
  }

  if(loading){
    return(
      <View>
        <ActivityIndicator size="large" color="#9e9e9e"/>
      </View>
    )
  }

  return (
    <ScrollView style={styles.container}>
      <ClienteRegistroForm 
        value={user.nombres}
        onChangeNombre={(value)=>handleChangeText('nombres',value)}
        titulo="Nombres"
      />
      
      <ClienteRegistroForm 
        value={user.apellidos}
        onChangeNombre={(value)=>handleChangeText('apellidos',value)}
        titulo="Correo del Cliente"
      />

      <ClienteRegistroForm 
        value={user.dni}
        onChangeNombre={(value)=>handleChangeText('dni',value)}
        titulo="DNI(*)"
      />
      
      <FormLabel text ="Fecha de Nacimiento(*)"/>
      <ClienteRegistroForm 
        value={user.anio}
        onChangeNombre={(value)=>handleChangeText('anio',value)}
        titulo="Año"
      />
      <ClienteRegistroForm 
        value={user.mes}
        onChangeNombre={(value)=>handleChangeText('mes',value)}
        titulo="Mes"
      />
      <ClienteRegistroForm 
        value={user.dia}
        onChangeNombre={(value)=>handleChangeText('dia',value)}
        titulo="Dia"
      />
      <ClienteRegistroForm 
        value={user.ciudad}
        onChangeNombre={(value)=>handleChangeText('ciudad',value)}
        titulo="Ciudad"
      />
        
        <View style={styles.inputGroup}>
          <Button 
            color="#ffa400"
            title="Actualizar Datos"
            onPress={()=> updateUser()}
            />
        </View>
        
        
        <View style={styles.inputGroup}>
          <Button 
            color="#910048"
            title="Eliminar Cliente"
            onPress={()=> openConfirmationAlert()}/>

        </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    padding:35
  },
  inputGroup:{
    flex:1,
    padding:0,
    marginTop:15,
    borderBottomWidth:1,
    borderBottomColor: '#ffa400'
  }
})