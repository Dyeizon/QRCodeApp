import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import { useState } from 'react'

export default function Index() {
  const router = useRouter()

  const [qrList, setQrList] = useState([
    "https://videira.ifc.edu.br",
    "https://reactnative.dev",
  ]);

  const irParaHistorico = () => {
    router.push({
      pathname: '/historico',
      params: {
        qrList: JSON.stringify(qrList)
      }
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.texto}>index</Text>
      <Button title="Escanear QRCode" onPress={() => console.log("Escanenado")}></Button>
      <Button title="Ver Histórico" onPress={irParaHistorico}></Button>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    texto: {
        fontSize: 40,
        fontWeight: 'bold'
    }
})