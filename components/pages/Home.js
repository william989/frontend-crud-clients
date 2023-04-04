import React from 'react'
import {useState} from 'react'
import { View, Text } from 'react-native'
import Form from '../molecules/Form'
import Title from '../Title'
import tw from 'tailwind-react-native-classnames'
import Layout from './Layout'

import firebase from 'firebase/compat/app'

export default function Home() {
  const [errorMessage, setError]=useState(""),
  [successMessage, setSuccess]=useState("")
  const login = (email, password) =>{
    if(!email && !password) alert("Ingrese los datos requeridos")
    else{
      firebase.auth().signInWithEmailAndPassword(email, password)
      .then(user => {
        setSuccess(`Usuario logged satisfactoriamente, ${user.user.uid}`)
      }).catch(err =>{
        setError(err.message)
      })
    }
  }
  return (
    <Layout>
      <View style={tw`w-3/4`}>
      <Title text="Login"></Title>
      {!!errorMessage && <Text style={tw`bg-red-400 p-1 my-2 text-red-700`}>{errorMessage}</Text>}
      {!!successMessage && <Text style={tw`bg-green-400 p-1 my-2 text-green-700`}>{successMessage}</Text>}
      <Form signup={false} onSubmit={login}/>
      </View>
    </Layout>
  )
}

