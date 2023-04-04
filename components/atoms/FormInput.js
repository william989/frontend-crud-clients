import { TextInput } from 'react-native'
import React from 'react'
import tw from 'tailwind-react-native-classnames'

export default function FormInput(props) {
    let {...others}= props
    console.log(props)
  return (
    
      <TextInput 
      style={tw`border border-yellow-400 rounded px-3 py-1`} 
      {...others} 
      value={props.value}/>

      
  )
}