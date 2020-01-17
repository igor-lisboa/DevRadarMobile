import React, { useEffect, useState } from 'react';
import { StyleSheet, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';

function Main() {
    const [currentRegion, setCurrentRegion] = useState(null);

    useEffect(() => {
        async function loadInitialPosition() {
            const { granted } = await requestPermissionsAsync();

            if (granted) {
                const { coords } = await getCurrentPositionAsync({
                    enableHighAccuracy: true,
                });

                const { latitude, longitude } = coords;
                setCurrentRegion(
                    {
                        latitude,
                        longitude,
                        latitudeDelta: 0.04,
                        longitudeDelta: 0.04,
                    }
                );
            }
        }

        loadInitialPosition();
    }, []);
    return (
        <MapView initialRegion={currentRegion} style={styles.map}>
            <Marker coordinate={{ latitude: -27.0000000, longitude: -49.0000000 }}>
                <Image style={styles.avatar} source={{ uri: 'https://avatars3.githubusercontent.com/u/45468193?s=460&v=4' }} />
            </Marker>
        </MapView>
    );
}

const styles = StyleSheet.create({
    map: {
        flex: 1,
    },
    avatar: {
        width: 54,
        height: 54,
        borderRadius: 4,
        borderWidth: 4,
        borderColor: '#FFF',
    }
});

export default Main;