import { View ,
    Text ,TextInput } from 'react-native'
import React from 'react'


const DatePickerMolecule = ({ onChange1,onChange2,onChange3 }) => (
    <View>
      <Text>Año</Text>
      <TextInput onChange={onChange1} 
        keyboardType="numeric"/>
      <Text>Mes</Text>
      <TextInput onChange={onChange2} 
        keyboardType="numeric"/>
      <Text>Dia</Text>
      <TextInput onChange={onChange3} 
        keyboardType="numeric"/>
    </View>
  );
  
  export default DatePickerMolecule;