import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, FlatList, ActivityIndicator  } from 'react-native';
import React, { useState, useEffect } from 'react';
import api from './src/Services/api';

export default function App(){
  
  const [ filmes, setFilmes ] = useState([])
  const [ loading , setLoading ] = useState(true)

  useEffect(() => {
    async function carregarFilmes() {
      const response = await api.get('r-api/?api=filmes')
      setFilmes(response.data)
      setLoading(false)
    }
    carregarFilmes()
  }, [])

  if(loading){
    return(
      <View style={styles.loading}>
        <ActivityIndicator style={styles.act}/>
      </View>
    )
  }
  else{
    return(
      <View style={styles.container}>
        <FlatList data={ filmes } key={ item => String(item.id)} 
                  renderItem={({ item }) => <Filmes data={ item }/>} 
        />
      </View>
    )
  }
  return(
    <View>

    </View>
  )
}

const styles = StyleSheet.create({
  loading, container:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  act:{
    size: 'large',
    color: '#00f'
  }
})