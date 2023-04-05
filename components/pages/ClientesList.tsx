import React, { useEffect, useState } from 'react';
import { View, Button, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import firebase from '../../database/firebase';
import FormLabel from '../atoms/FormLabel';
import { ListItem, Avatar } from 'react-native-elements';

interface Props {
  navigation: any;
}

interface User {
  id: string;
  nombres: string;
  apellidos: string;
  dni: string;
  ciudad: string;
}

export default function ClientesList({ navigation }: Props) {
const [loading, setLoading] = useState(true);
const [users, setUsers] = useState<User[]>([]);
const [page, setPage] = useState(1);
const [totalPages, setTotalPages] = useState(1);

useEffect(() => {
  try {
    setLoading(true);
    const pageSize = 5;
    firebase.db.collection('clientes').onSnapshot(querySnapshot => {
      const users: User[] = [];
      querySnapshot.docs.forEach(doc => {
        const { nombres, apellidos, dni, ciudad } = doc.data();
        users.push({
          id: doc.id,
          nombres,
          apellidos,
          dni,
          ciudad,
        });
      });
      setUsers(users);
      setTotalPages(Math.ceil(users.length / pageSize));
      setLoading(false);
    });
  } catch (error) {
    console.log(error);
  }
}, []);

const loadMore = () => {
console.log('Load more data');
};

if (loading) {
return (
  <View>
  <ActivityIndicator size="large" color="#9e9e9e" />
  </View>
);
}
return (
<View>
<View>
<Button
color="#910048"
title="Crear Nuevo Cliente "

onPress={() => navigation.navigate('CreateClienteScreen')}
/>
  </View>
    <FlatList
    data={users}
    renderItem={({ item }) => (
      <ListItem
        key={item.id}
        bottomDivider
        onPress={() => {
        navigation.navigate('ClienteDetailScreen', {
          userId: item.id,
          });
        }}>
        <ListItem.Chevron />
        <Avatar
          size={32}
          rounded
          title={item.nombres[0]}
          containerStyle={{ backgroundColor: '#910048' }}
        />
        <ListItem.Content>
          <FormLabel text={item.nombres + ' ' + item.apellidos} />
          <FormLabel text={item.dni} />
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
);
}

const styles = StyleSheet.create({
  inputGroup: {
    flex: 1,
    padding: 0,
    marginTop: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ffa400',
  },
});