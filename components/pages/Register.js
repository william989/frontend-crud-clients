import React from 'react'
import {useState} from 'react'
import { View , Text} from 'react-native'
import Form from '../molecules/Form'
import Title from '../Title'
import tw from 'tailwind-react-native-classnames'
import Layout from './Layout'

import firebase from 'firebase/compat/app'

export default function Register() {
    const [errorMessage, setError]=useState(""),
    [successMessage, setSuccess]=useState("")

    const register = (email, password)=>{
        if(!email && !password) alert("Ingrese los datos requeridos")
        else{
            firebase.auth().
            createUserWithEmailAndPassword(email, password)
            .then(user =>{
                setSuccess("Usuario registrado satisfactoriamente")
                setError("")
            }).catch(err=>setError(err.message))
        }

    }


  return (
    <Layout>
      <View style={tw`w-3/4`}>
      <Title text="Register"></Title>
      {!!errorMessage && <Text style={tw`bg-red-400 p-1 my-2 text-red-700`}>{errorMessage}</Text>}
      {!!successMessage && <Text style={tw`bg-green-400 p-1 my-2 text-green-700`}>{successMessage}</Text>}
      <Form signup={true} onSubmit={register}/>
      </View>
    </Layout>
  )
}

