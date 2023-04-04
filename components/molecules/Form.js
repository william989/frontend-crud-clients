import { View } from 'react-native'
import React from 'react'
import {useState} from 'react'
import tw from 'tailwind-react-native-classnames'
import FormLabel from '../atoms/FormLabel'
import FormInput from '../atoms/FormInput'
import FormButton from '../atoms/FormButton'
import { useNavigation } from '@react-navigation/native'

const FormInputGroup = ({children}) =>{
    return(
        <View style={tw`my-3`}>
            {children}
        </View>
    )
}

export default function Forms({signup, onSubmit}) {
  const navigation = useNavigation(),
  screen = signup ? "Home" : "Register";
  const [email, setEmail] = useState(""),
  [password, setPassword] = useState("")
  return (
    <View>
      <FormInputGroup>
        <FormLabel text ="Email"/>
        <FormInput onChangeText={(text)=>setEmail(text)}
        value={email}
        />
      </FormInputGroup>

      <FormInputGroup>
        <FormLabel text ="Password"/>
        <FormInput 
        onChangeText={(text)=>setPassword(text)}
        value={password}
        secureTextEntry={true}
        />
      </FormInputGroup>

      <FormButton primary={true} text={!signup ? "Login": "Register"} 
      onPress={()=>onSubmit(email,password)}></FormButton>

      <FormButton primary={false} text={signup ? "Login" : "Register"}
      onPress={()=>navigation.navigate(screen)}></FormButton>

    </View>
  )
}