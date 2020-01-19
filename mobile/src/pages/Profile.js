import React from 'react';
import { WebView } from 'react-native-webview';

const Profile = ({ navigation }) => {
    // Receives props sent by the router
    const githubUsername = navigation.getParam('github_username');

    return (
        <WebView style={{ flex: 1 }} source={{ uri: `https://github.com/${githubUsername}` }}></WebView>
    );
};

export default Profile;