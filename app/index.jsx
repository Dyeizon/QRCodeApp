import { StyleSheet, Text, View, Button, Alert, TouchableOpacity } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { CameraView, useCameraPermissions } from 'expo-camera';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

export default function Index() {
  const router = useRouter()
  const [facing, setFacing] = useState("back")
  const [permission, requestPermission] = useCameraPermissions()
  const [scanned, setScanned] = useState(false)
  const [qrData, setQrData] = useState('')

  const [qrList, setQrList] = useState([]);

  if(!permission) {
    return <View/>
  }

  if(!permission.granted) {
    return (
      <View style={styles.container}>
        <Text>Precisamos da sua permissão para usar a câmera.</Text>
        <Button onPress={requestPermission} title='Conceder permissão'></Button>
      </View>
    )
  }

  function toggleCameraFacing() {
    setFacing((atual) => (atual === 'back' ? 'front' : 'back'))
  }

  const handleCamera = ({data}) => {
    setScanned(true)
    setQrData(data)
    setQrList((prevList) => [...prevList, { url: data, timestamp: new Date().toLocaleString('pt-br') }])
    Alert.alert("QR Code Escaneado", `Conteúdo: ${data}`, [
      {text: "OK", onPress: () => console.log("OK")}
    ])
  }

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
      <CameraView 
        style={styles.camera} 
        facing={facing} 
        barcodeScannerSettings={{barcodeTypes: ['qr']}}
        onBarcodeScanned={scanned ? undefined : handleCamera}
      ></CameraView>

      <View style={styles.controles}>
        <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}><FontAwesome6 name="camera-rotate" size={24} color="white" /></TouchableOpacity>
        { scanned && (
          <>
              <TouchableOpacity style={styles.button} onPress={() => setScanned(false)}><Feather name="refresh-ccw" size={24} color="white" /></TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={irParaHistorico}><Text style={styles.text}>Ver histórico</Text></TouchableOpacity>
          </>
        )}
      </View>
      {qrData !== '' && (
          <View style={styles.result}>
            <Text style={styles.resultText}>{qrData}</Text>
          </View>
      )}

    <View style={styles.counterContainer}>
      <Text style={styles.counterText}>
        Total de QR Codes: {qrList.length}
      </Text>
    </View>
    </View>


  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    camera: {
      flex: 8
    },

    controles: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      paddingVertical: 10,
      backgroundColor: 'white'
    },

    button: {
      backgroundColor: "#007AFF",
      paddingVertical: 8,
      paddingHorizontal: 8,
      borderRadius: 5,
      minWidth: 100,
      alignItems: 'center'
    },

    text: {
      fontSize: 14,
      fontWeight: 'bold',
      color: 'white',
      textAlign: 'center',
    },

    result: {
      flex: 0.5,
      backgroundColor: '#CCC',
      alignItems: 'center',
      justifyContent: 'center',
    },

    resultText: {

    },

    counterContainer: {
      flex: 0.5,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "yellow",
    },

    counterText: {
      fontSize: 16,
      color: "#555",
    },
})