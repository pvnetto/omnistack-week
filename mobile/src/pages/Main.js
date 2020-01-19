import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity } from 'react-native';
import MapView from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons';

import DevMarker from './main/DevMarker';
import { connect, disconnect, subscribeToNewDevs } from '../services/socket';

const Main = ({ navigation }) => {
    const [devs, setDevs] = useState([]);
    const [currentRegion, setCurrentRegion] = useState(null);
    const [inputTechs, setInputTechs] = useState('');

    useEffect(() => {
        const loadInitialPosition = async () => {
            const { granted } = await requestPermissionsAsync();        // Requests permission to use position

            if (granted) {                                              // If permission was granted, get the user's current position
                const { coords } = await getCurrentPositionAsync({
                    enableHighAccuracy: true,
                });

                const { latitude, longitude } = coords;

                setCurrentRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.04,
                    longitudeDelta: 0.04,
                });
            }
        }

        loadInitialPosition();
    }, []);

    useEffect(() => {
        subscribeToNewDevs(dev => setDevs([...devs, dev]));
    }, [devs])

    // Connects to the backend web socket
    const setupWebsocket = () => {
        disconnect();

        const { latitude, longitude } = currentRegion;
        connect(latitude, longitude, inputTechs);
    }

    const loadDevs = async () => {
        const { latitude, longitude } = currentRegion;

        const response = await fetch(`http://192.168.100.107:3333/search?latitude=${latitude}&longitude=${longitude}&techs=${inputTechs}`);
        const devData = await response.json();
        setDevs(devData);
        setupWebsocket();
    }

    const handleRegionChange = (region) => {
        setCurrentRegion(region);
    }

    if (!currentRegion) return null;

    return (
        <>
            <MapView onRegionChangeComplete={handleRegionChange} initialRegion={currentRegion} style={styles.map} >
                {devs.map((dev, idx) => <DevMarker key={idx} navigation={navigation} {...dev} />)}
            </MapView>

            <View style={styles.searchForm}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Buscar devs por techs..."
                    placeholderTextColor="#999"
                    autoCapitalize="words"
                    autoCorrect={false}
                    value={inputTechs}
                    onChangeText={setInputTechs}
                />

                <TouchableOpacity onPress={loadDevs} style={styles.loadButton}>
                    <MaterialIcons name="my-location" size={20} color="#fff" />
                </TouchableOpacity>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    map: {
        flex: 1
    },
    searchForm: {
        position: 'absolute',
        top: 20,
        left: 20,
        right: 20,
        zIndex: 5,
        flexDirection: 'row'
    },
    searchInput: {
        flex: 1,
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 25,
        paddingHorizontal: 20,
        fontSize: 16,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 4, height: 4,
        },
        elevation: 2,
    },
    loadButton: {
        width: 50,
        height: 50,
        backgroundColor: '#8e4dff',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15
    }
})

export default Main;