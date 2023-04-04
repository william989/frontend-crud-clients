import React from 'react'
import { View,  StyleSheet } from 'react-native'

export default function Layout({children}) {
  return (
    <View style={styles.container}>
        {children}
    </View>
  )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: "100%",
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  }); 