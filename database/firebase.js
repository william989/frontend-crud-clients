import firebase from 'firebase/compat/app';
import "firebase/compat/firestore"

var firebaseConfig   ={
    apiKey: "AIzaSyCamwpVF0yj7MHVfAvmV7M7Csi8C5a38wE",
    authDomain: "clientes-crud-d79bd.firebaseapp.com",
    projectId: "clientes-crud-d79bd",
    storageBucket: "clientes-crud-d79bd.appspot.com",
    messagingSenderId: "79974750247",
    appId: "1:79974750247:web:fcbeeb8933bb21408e9602"
}


firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export default{
    firebase,
    db
}