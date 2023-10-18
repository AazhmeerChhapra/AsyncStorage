import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';

import { useNavigation } from '@react-navigation/native';
// import PostAPIHooks from './APIHooks/PostAPIHooks';

import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
// import  {useServerAuth}  from './APIHooks/useServerAuth';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen() {

    const [username, onChangeUsername] = useState('');
    const [name, onChangeName] = useState('');
    const [passsword, onChangePassword] = useState('');

    const navigation = useNavigation();


    const loginBtnPressed = () => {
        // await signup(email, passsword, username);
        // console.log("i am uid in login "+global.uid)
        // if (global.uid != null) {
        //   navigation.navigate('Home');

        // }
        // else{
        //   console.error('Failure');

        // }
        // getUserInfo(global.uid);
        AsyncStorage.getItem(username).then((data) => {
            if (data) {
                console.log(JSON.parse(data));
                global.username = username;

            }
            else {
                let myArray = [{ username: username, name: name, passsword: passsword }]
                global.username = username;

                // navigation.navigate('Home')
                AsyncStorage.setItem("username", JSON.stringify(myArray))
                AsyncStorage.setItem(username, JSON.stringify(myArray))
                // console.log(JSON.parse(data))

            }


            navigation.navigate('Dashboard')



        }
        )
    }
    useEffect(() => {
        AsyncStorage.getItem("username").then((data) => {
            if (data) {
                const userData = JSON.parse(data);
                const username = userData[0].username;
                global.username = username;
                navigation.navigate('Dashboard')

            }
        })
    })

    return (
        <View style={styles.container}>
            <Text> Login Screen! </Text>

            <TextInput
                style={styles.input}
                onChangeText={onChangeUsername}
                value={username}
                placeholder="User Name"
            />
            <TextInput
                style={styles.input}
                onChangeText={onChangeName}
                value={name}
                placeholder="Name"
            // keyboardType="numeric"
            />

            <TextInput
                style={styles.input}
                onChangeText={onChangePassword}
                value={passsword}
                placeholder="Password"
            // keyboardType="numeric"
            />

            <TouchableOpacity style={styles.button} onPress={loginBtnPressed}>
                <Text style={{ color: 'white' }}>Login</Text>
            </TouchableOpacity>

            <StatusBar style="auto" />
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    button: {
        alignItems: 'center',
        backgroundColor: 'green',
        padding: 10,
    },
});
