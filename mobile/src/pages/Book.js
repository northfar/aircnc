import React, {useState} from 'react';
import {SafeAreaView, Alert, Text, TextInput, AsyncStorage, StyleSheet, TouchableOpacity} from 'react-native';

import api from '../services/api';

export default function Book({navigation}){

    const id = navigation.getParam('id');
    const [date, setDate] = useState('');

    async function handleSubmit(){
        const user_id = await AsyncStorage.getItem('user');
        console.log(user_id);
        
        await api.post(`/spots/${id}/bookings`, {
            date
        },{
            headers: {user_id}
        });

        Alert.alert('Solicitação de reserva enviada!');

        navigation.navigate('List');
    }

    function handleCancel(){
        navigation.navigate('List');

    }

    return (
                
        <SafeAreaView style={styles.container}>
            <Text style={styles.label}> DATA DE RESERVA * </Text>
            <TextInput
                style={styles.input}
                placeholder="Escolha uma data para a reserva"
                placeholderTextColor="#999"
                autoCapitalize="words"
                autoCorrect={false}
                value={date}
                onChangeText={setDate}
        />
         <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                    <Text style={styles.buttonText}>Fazer reserva</Text>
         </TouchableOpacity>
         <TouchableOpacity onPress={handleCancel} style={[styles.button, styles.cancelButton]}>
                    <Text style={styles.buttonText}>Cancelar</Text>
         </TouchableOpacity>
       </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        margin:30
    },
    label: {
       fontWeight: 'bold',
       color: '#444',
       marginBottom: 8,
       marginTop:30 
    },
    input:{
        borderWidth: 1,
        borderColor: '#444',
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#444',
        height: 44,
        marginBottom: 20,
        borderRadius: 2
    },
    button:{
        height: 42,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2
    },
    cancelButton:{
        backgroundColor:'#ccc',
        marginTop:10
    },
    buttonText:{
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16
    }
});
