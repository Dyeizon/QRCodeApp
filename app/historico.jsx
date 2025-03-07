import { View, Text, StyleSheet, FlatList, Linking, Button, TouchableOpacity } from 'react-native'
import React, {useState, useEffect} from 'react'
import { useLocalSearchParams } from 'expo-router'

export default function historico() {
    const {qrList} = useLocalSearchParams()
    const [qrListArray, setQrListArray] = useState([])
    const [darkMode, setDarkMode] = useState(false)

    useEffect(() => {
        if (qrList) {
          setQrListArray(JSON.parse(qrList));
        } else {
          setQrListArray([]);
        }
    }, [qrList]);

    const renderItem = async ({ item, index }) => {
        const validURL = await Linking.canOpenURL(item.url);
        if (validURL) {
          return (
            <View style={styles.listItem}>
              <Text
                style={[
                  styles.listText,
                  { color: darkMode ? 'lightblue' : 'blue', textDecorationLine: "underline" },
                ]}
                onPress={() => Linking.openURL(item.url)}
              >
                {item.url}
              </Text>
              <Text style={{color: darkMode ? 'white' : 'black'}}>{item.timestamp}</Text>
            </View>
          );
        }
    
        return (
          <View style={styles.listItem}>
            <Text style={styles.listText}>{`${index + 1}. ${item.url}`}</Text>
          </View>
        );
    };

    return (
        <View style={[styles.historyContainer, darkMode && { backgroundColor: "#000"}]}>
            <Text style={[styles.historyTitle, darkMode && {color: 'white'}]}>Histórico de QR Codes Escaneados</Text>

            <TouchableOpacity style={[styles.darkButton, darkMode && {backgroundColor: 'white'}]} onPress={() => setDarkMode(!darkMode)}>
                <Text style={{color: darkMode ? 'black' : 'white', fontWeight: 'bold'}}>{darkMode ? 'Tema claro' : 'Tema escuro'}</Text>
            </TouchableOpacity>

            {qrListArray.length > 0 && (
                <Button title='Limpar lista' onPress={() => setQrListArray([])}></Button>
            )}

            <FlatList
                data={qrListArray}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                ListEmptyComponent={<Text style={{textAlign: 'center', color: darkMode ? 'white' : 'black'}}>Nenhum QR Code escaneado ainda</Text>}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    historyContainer: {
      flex: 1,
      padding: 20,
      backgroundColor: "#fff",
    },
    historyTitle: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 20,
      textAlign: "center",
    },
    listItem: {
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: "#ccc",
    },
    listText: {
      fontSize: 16,
    },
    darkButton: {
        paddingVertical: 10,
        fontSize: 20,
        borderWidth: 2,
        borderColor: 'black',
        borderStyle: 'solid',
        borderRadius: 5,
        alignItems: 'center',
        backgroundColor: 'black',
    }
});