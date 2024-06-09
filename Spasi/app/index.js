import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useRouter } from 'expo-router';

const parkingData = [
  { id: 1, location: 'ITB - GKUB', totalSlots: 20, availableSlots: 10 },
  { id: 2, location: 'ITB - Labtek V', totalSlots: 20, availableSlots: 7 },
  { id: 3, location: 'Masjid Salman - Utara', totalSlots: 20, availableSlots: 12 },
  { id: 4, location: 'Masjid Salman - Selatan', totalSlots: 20, availableSlots: 5 },
];

const App = () => {
  const router = useRouter();
  
  return (
    <ScrollView style={styles.container}>
      <Image source={require('../assets/adaptive-icon.png')} style={styles.logo} />
      {parkingData.map((item) => (
        <View key={item.id} style={styles.card}>
          <Text style={styles.location}>{item.location}</Text>
          <View style={styles.row}>
            <Icon name="map-marker" size={24} color="#fff" marginRight={8} />
            <Text style={styles.slots}>
              {item.availableSlots}/{item.totalSlots} | Tersisa {item.totalSlots - item.availableSlots} slot kosong
            </Text>
          </View>
          <TouchableOpacity 
            style={styles.button}
            onPress={() => router.push({
              pathname: "/[id]",
              params: { id: item.id, location: item.location, totalSlots: item.totalSlots, availableSlots: item.availableSlots }
            })}
          >
            <Text style={styles.buttonText}>Lihat Denah</Text>
            <Icon name="arrow-right" size={16} color="#0056A1" />
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  logo: {
    width: 100,
    height: 80,
    alignSelf: 'center',
    marginTop: 8,
  },
  card: {
    backgroundColor: '#0056A1',
    padding: 20,
    borderRadius: 15,
    marginVertical: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  slots: {
    color: '#fff',
    fontSize: 16,
    marginVertical: 10,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    alignSelf: 'flex-end',
  },
  buttonText: {
    color: '#0056A1',
    fontSize: 16,
    marginRight: 10,
  },
});

export default App;
