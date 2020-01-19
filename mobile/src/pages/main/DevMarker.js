import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { Marker, Callout } from 'react-native-maps';

const DevMarker = ({ navigation, name, github_username, bio, avatar_url, techs, location }) => {

    return (
        <Marker coordinate={{ latitude: location.coordinates[1], longitude: location.coordinates[0] }}>
            <Image style={styles.avatar} source={{ uri: avatar_url }} />
            <Callout onPress={() => navigation.navigate('Profile', { github_username })} >
                <View style={styles.callout}>
                    <Text style={styles.devName}>{name}</Text>
                    <Text style={styles.devBio}>{bio}</Text>
                    <Text style={styles.devTechs}>{techs.join(', ')}</Text>
                </View>
            </Callout>
        </Marker>
    );
};

const styles = StyleSheet.create({
    avatar: {
        width: 54,
        height: 54,
        borderRadius: 4,
        borderWidth: 4,
        borderColor: '#fff',
    },
    callout: {
        width: 260,
    },
    devName: {
        fontWeight: 'bold',
        fontSize: 16
    },
    devBio: {
        color: '#666',
        marginTop: 5,
    },
    devTechs: {
        marginTop: 5
    },
})

export default DevMarker;