import { View, Button, FlatList ,StyleSheet ,ActivityIndicator } from 'react-native'
import React from 'react'
import {useEffect, useState} from 'react'
import firebase from '../../database/firebase'

import FormLabel from '../atoms/FormLabel'
import {ListItem, Avatar} from 'react-native-elements'

export default function ClientesList(props) {

  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([])


  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(()=> {
    try{
      setLoading(true);
      const pageSize = 5;
      firebase.db.collection('clientes').onSnapshot(querySnapshot=>{

        const users = [];

        querySnapshot.docs.forEach(doc => {
          console.log(doc.data())
          const {nombres, apellidos, dni,  ciudad} = doc.data()
          users.push({
            id: doc.id ,
            nombres,
            apellidos,
            dni,
            ciudad
          })
        });

        setUsers(users);
        setTotalPages(Math.ceil(users.size / pageSize));
        setLoading(false);
      })
    }catch(error){
      console.log(error)
    }
  },[])

  if(loading){
    return(
      <View>
        <ActivityIndicator size="large" color="#9e9e9e"/>
      </View>
    )
  }
  return (
    <View>
      
      <View>
      <Button 
            color="#910048"
      title ="Crear Nuevo Cliente " style="color:'#ffa400'"
      onPress={() => props.navigation.navigate("CreateClienteScreen")}
      />
      </View>
      <FlatList
        data={users}
        renderItem={({ item }) => (
              <ListItem
                key={item.id} bottomDivider onPress={()=>{
                  props.navigation.navigate('ClienteDetailScreen',{
                    userId : item.id
                  })
                }}
                >
                <ListItem.Chevron/>
                <Avatar size={32}
                    rounded
                    title={item.nombres[0]}
                    containerStyle={{ backgroundColor: "#910048" }}>

                    </Avatar>
                  <ListItem.Content>
                    <FormLabel text ={item.nombres+' '+item.apellidos}/>
                    <FormLabel text ={item.dni}/>
                  </ListItem.Content>
              </ListItem>
        )}
        keyExtractor={item => item.id}
        onEndReached={() => {
            if (page < totalPages) {
            setPage(page + 1);
            loadMore();
            }
        }}
        onEndReachedThreshold={0.1}
        ListFooterComponent={loading ? <ActivityIndicator /> : null}
        />
      
      
    </View>
  )
}


const styles = StyleSheet.create({
  inputGroup:{
    flex:1,
    padding:0,
    marginTop:15,
    borderBottomWidth:1,
    borderBottomColor: '#ffa400'
  }
})