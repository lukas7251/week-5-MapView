import { StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

export default function Map(props) {
  const [marker, setMarker] = useState(null);

  const [location, setLocation] = useState({
		latitude: 54.5,
		longitude: 11,
		latitudeDelta: 35,
		longitudeDelta: 55
  });

  useEffect(() => {
    (async () => {
      getUserPosition();
    })();
  }, []);

  const getUserPosition = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();

    try {
      if (status !== "granted") {
        console.log("Geolocation failed");
        return;
      }
      const position = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      setLocation({
        ...location,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
				latitudeDelta: 0.0922,
				longitudeDelta: 0.0421
      });
      setMarker(position.coords);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <MapView style={styles.map} region={location}>
        {marker && (
          <Marker
            title="Your location"
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
          />
        )}
      </MapView>
    </>
  );
}

const styles = StyleSheet.create({
  map: {
    height: "100%",
    width: "100%",
  },
});