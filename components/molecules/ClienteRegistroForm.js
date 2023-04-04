import { View } from 'react-native'
import React from 'react'
import FormLabel from '../atoms/FormLabel'
import FormInput from '../atoms/FormInput'


export default function ClienteRegistroForm({titulo, value, onChangeNombre }) {
    
  return (
    <View>
        
        <View>
          <FormLabel text ={titulo}/> 
          <FormInput 
            onChangeText={onChangeNombre}
            value={value}
          />
          
        </View>
    </View>
  )
}