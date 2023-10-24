import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { useNavigation } from '@react-navigation/native';
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";


// const [back, onChangeback] = useState('white');



export default function Dashboard() {
    const [rang, setRang] = useState("white");
    const navigation = useNavigation();

    const logout = () => {
        // AsyncStorage.removeItem("username");
        navigation.navigate('LoginScreen')
    }

    const changeColor = () => {
        if (rang == "white") {
            setRang("black");


            // console.log("i ammmmmmmm " + global.username);
            AsyncStorage.getItem(global.username).then((data) => {
                if (data) {
                    const newRang = { backgroundColor: "black" }
                    const newData = JSON.parse(data);
                    newData.push(newRang)
                    if (Array.isArray(newData) && newData.some(item => Object.keys(item).length < 3)) {
                        if (Array.isArray(newData) && newData.some(item => Object.keys(item).length === 1)) {
                            AsyncStorage.setItem(global.username, JSON.stringify(newData))
                        }
                        else if (data[1].backgroundColor == "black") {
                            AsyncStorage.mergeItem(global.username, JSON.stringify(newData))
                        }
                    }


                }
                else {
                    console.log("ok");
                }

            })

        }
        else if (rang == "black") {
            setRang("white");
            AsyncStorage.getItem(global.username).then((data) => {
                if (data) {
                    const newRang = { backgroundColor: "white" }
                    const newData = JSON.parse(data);
                    newData.push(newRang)
                    if (Array.isArray(newData) && newData.some(item => Object.keys(item).length < 3)) {
                        if (Array.isArray(newData) && newData.some(item => Object.keys(item).length == 1)) {
                            AsyncStorage.setItem(global.username, JSON.stringify(newData))
                            // console.log(JSON.parse(data));
                        }
                        else if (data[1].backgroundColor == "black") {
                            AsyncStorage.mergeItem(global.username, JSON.stringify(newData))
                        }
                    }





                }
                else {
                    console.log("ok");
                }

            })

        }
    }
    useEffect(() => {
        // Function to get the background color based on username
        const getBackgroundColorByUsername = async (username) => {
            try {
                // Retrieve the JSON data from AsyncStorage
                const jsonData = await AsyncStorage.getItem(global.username);
                if (!jsonData) {
                    console.error('No user data found in AsyncStorage');
                    return null;
                }

                // Parse the JSON data into an array of objects
                const userData = JSON.parse(jsonData);
                console.log(userData[1].backgroundColor);

                // Search for the user by their username
                const user = userData.find((user) => user.username === username);
                console.log("user found" + user);
                const count = userData.length;
                console.log(count); // This will output 4

                if (user) {
                    // Extract and set the background color of the user
                    if (count == 1) {
                    setRang(userData[1].backgroundColor);

                    }
                    else{
                    setRang(userData[count-1].backgroundColor);

                    }
                    console.log();
                } else {
                    console.error('User not found in the data');
                }
            } catch (error) {
                console.error('Error retrieving background color from AsyncStorage:', error);
            }
        };

        getBackgroundColorByUsername(global.username);
    }, [username]);




    return (
        <View style={{ backgroundColor: rang, height: 1000 }}>
            <TouchableOpacity style={styles.button} onPress={changeColor}>
                <Text style={{ color: 'white' }}>Change Color</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() =>  { AsyncStorage.removeItem("username"); navigation.reset({ index: 0, routes: [{ name: 'LoginScreen' }] }) }}>
                <Text style={{ color: 'white' }}>Logout</Text>
            </TouchableOpacity>

        </View>
    );




}
const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        backgroundColor: 'green',
        padding: 10,
        marginTop: 40,
    },
});
