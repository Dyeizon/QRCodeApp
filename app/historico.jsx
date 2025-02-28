import { View, Text, StyleSheet, Button, FlatList } from 'react-native'
import React from 'react'
import { useRouter, useLocalSearchParams } from 'expo-router'

export default function historico() {
    const router = useRouter()
    const {qrList} = useLocalSearchParams()
    const qrListArray = JSON.parse(qrList)

return (
    <View>
        <Text>historico</Text>
        <FlatList></FlatList>
        <Button title='Voltar' onPress={() => router.back()}></Button>
    </View>
  )
}

const styles = StyleSheet.create({})