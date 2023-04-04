import { Text } from 'react-native'
import React from 'react'
import tw from 'tailwind-react-native-classnames'

export default function Title({text}) {
  return (
    
      <Text style={tw`text-2xl font-bold tracking-wide p-2 text-center`}>{text}</Text>
      
  )
}