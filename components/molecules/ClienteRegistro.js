import { View } from 'react-native'
import React from 'react'
import FormLabel from '../atoms/FormLabel'
import FormInput from '../atoms/FormInput'


export default function ClienteRegistro({titulo, onChangeText }) {
    
  return (
    <View>
        
        <View>
          <FormLabel text ={titulo}/> 
          <FormInput 
            onChangeText={onChangeText}
          />
          
        </View>
    </View>
  )
}