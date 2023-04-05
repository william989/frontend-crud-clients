import { View, Button, ScrollView, StyleSheet} from 'react-native'
import React from 'react'
import {useState} from 'react'
import firebase from '../../database/firebase'
import ClienteRegistro from '../molecules/ClienteRegistro'
import FormLabel from '../atoms/FormLabel'

export default function CreateClienteScreen(props: any) {

  let fechaActual = new Date();
  console.log(fechaActual.toLocaleDateString());

  const [state, setState] = useState({
    nombres:'',
    apellidos: '',
    dni:'',
    ciudad:'',
    anio:'',
    mes: '',
    dia:'',
  })

  const handleChangeText = (dato: any, value: any)=>{
    setState({...state,[dato]:value})
  }

  const saveNewClient = () =>{
    console.log("SAVE")

    if(!state.nombres) alert('Nombre es un campo obligatorio')
    else if (!state.apellidos) alert('Apellidos es un campo obligatorio')
    else if (!state.dni) alert('DNI es un campo obligatorio')
    else if (!state.anio) alert('Año es un campo obligatorio')
    else if (!state.mes) alert('Mes es un campo obligatorio')
    else if (!state.dia) alert('Dia es un campo obligatorio')
    else if (!Number.isInteger(Number(state.anio)))alert('Ingresar Correctamente el año (1999)')
    else if (parseInt(state.anio)>fechaActual.getFullYear()) alert('No puede ingresar un año mayor al actual')
    else if (!Number.isInteger(Number(state.mes)))alert('Ingresar Correctamente el mes (12)')
    else if (parseInt(state.mes)<1 || parseInt(state.mes)>12) alert('Ingresar Correctamente el mes (12)')
    else if (!Number.isInteger(Number(state.dia)))alert('Ingresar Correctamente el dia (28)')
    else if (parseInt(state.dia)<1 || parseInt(state.dia)>31) alert('Ingresar Correctamente el dia (28)')
    else if (!Number.isInteger(Number(state.dni)))alert('Ingresar Correctamente el DNI (28)')
    else if (state.dni.length<8)alert('DNI corresponde a 8 digitos')
    else{
      const fechaSeleccionada = new Date(
        state.anio + '-' + state.mes + '-' + state.dia
      );
      
      const diferencia = fechaActual.getTime() - fechaSeleccionada.getTime();
      const edad = Math.floor(diferencia / 3.154e+10);
      console.log(edad)
      if (edad >= 18) {
        /**VALIDACION DNI */
        // Obtener referencia de la colección 'clientes'
        const usersCollection = firebase.db.collection('clientes');

        // Realizar consulta por dni
        const query = usersCollection.where('dni', '==', state.dni);

        // Obtener resultado de la consulta
        query.get().then((querySnapshot) => {
          if (!querySnapshot.empty) {
            // El documento con ese dni fue encontrado
            const user = querySnapshot.docs[0].data();
            console.log('Usuario encontrado:', user);
            alert('Este DNI ya fue Registrado')
          } else {
                  
            try{
              firebase.db.collection('clientes').add({
                nombres:state.nombres,
                apellidos:state.apellidos,
                dni:state.dni,
                anio:state.anio,
                mes: state.mes,
                dia: state.dia,
                ciudad:state.ciudad,
              })
              console.log('Cliente guardado')
              props.navigation.navigate('ClientesList')

            }catch(error){
              console.log(error)
            }
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

  return (
    <ScrollView style={styles.container}>
      <ClienteRegistro
        onChangeText={(value: string)=>handleChangeText('nombres',value)}
        titulo="Nombres(*)"
      />
      <ClienteRegistro
        onChangeText={(value: string)=>handleChangeText('apellidos',value)}
        titulo="Apellidos(*)"
      />
      <ClienteRegistro
        onChangeText={(value: string)=>handleChangeText('dni', value)}
        titulo="DNI(*)"
      />
      
      <FormLabel text ="Fecha de Nacimiento(*)"/>
      <ClienteRegistro
        onChangeText={(value: string)=>handleChangeText('anio',value)}
        titulo="Año"
      />
      <ClienteRegistro
        onChangeText={(value: string)=>handleChangeText('mes',value)}
        titulo="Mes"
      />
      <ClienteRegistro
        onChangeText={(value: string)=>handleChangeText('dia',value)}
        titulo="Dia"
      />

      
      <ClienteRegistro
        onChangeText={(value: string)=>handleChangeText('ciudad',value)}
        titulo="Ciudad"
      />
        
        <View style={styles.inputGroup}>
          <Button color="#ffa400" title="Guardar Cliente" onPress={()=> saveNewClient()}
          />
        </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container:{
    fles:1,
    padding:15
  },
  inputGroup:{
    flex:1,
    padding:0,
    marginBottom:15,
    marginTop:25,
    borderBottomWidth:1,
    borderBottomColor: '#ffa400'
  }
})