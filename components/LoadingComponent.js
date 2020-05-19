import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

function Loading() {
    return (
        <View style={styles.loadingView} >
            <ActivityIndicator size='large' color='#c9a47a' />
            <Text style={styles.loadingText}>Loading . . .</Text>
        </View>
    );
}

const styles = StyleSheet.create(
    {
        loadingView: {
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1
        },
        loadingText: {
            color: '#c9a47a',
            fontSize: 14,
            fontWeight: 'bold'
        }
    }
);

export default Loading;