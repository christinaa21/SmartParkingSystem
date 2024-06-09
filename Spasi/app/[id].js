import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useRouter, useLocalSearchParams } from 'expo-router';

const ParkingDetail = () => {
  const { id, location, totalSlots: initialTotalSlots, availableSlots: initialAvailableSlots } = useLocalSearchParams();
  const router = useRouter();

  const [totalSlots, setTotalSlots] = useState(Number(initialTotalSlots));
  const [availableSlots, setAvailableSlots] = useState(Number(initialAvailableSlots));
  
  const initialSlots = Array(totalSlots)
    .fill()
    .map((_, index) => index < availableSlots ? 'available' : 'occupied');

  const [slots, setSlots] = useState(initialSlots);

  useEffect(() => {
    const interval = setInterval(() => {
      setSlots((currentSlots) => {
        const randomIndex = Math.floor(Math.random() * currentSlots.length);
        const newSlots = [...currentSlots];
        newSlots[randomIndex] = newSlots[randomIndex] === 'available' ? 'occupied' : 'available';
        
        const newAvailableSlots = newSlots.filter(slot => slot === 'available').length;
        setAvailableSlots(newAvailableSlots);
        
        return newSlots;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Icon name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Denah Parkir</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.location}>{location}</Text>
        <View style={styles.row}>
          <Icon name="map-marker" size={24} color="#0056A1" marginRight={8} />
          <Text style={styles.slots}>{availableSlots}/{totalSlots}</Text>
        </View>
      </View>
      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: '#4CAF50' }]} />
          <Text style={styles.legendText}>Tersedia</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: '#F44336' }]} />
          <Text style={styles.legendText}>Terisi</Text>
        </View>
      </View>
      <View style={styles.parkingMap}>
        <View style={styles.parkingColumn}>
          {slots.slice(0, Math.ceil(slots.length / 2)).map((slot, index) => (
            <View
              key={index}
              style={[
                styles.parkingSlot,
                { backgroundColor: slot === 'available' ? '#4CAF50' : '#F44336' },
              ]}
            />
          ))}
        </View>
        <View style={styles.columnSpacer} />
        <View style={styles.parkingColumn}>
          {slots.slice(Math.ceil(slots.length / 2)).map((slot, index) => (
            <View
              key={index + Math.ceil(slots.length / 2)}
              style={[
                styles.parkingSlot,
                { backgroundColor: slot === 'available' ? '#4CAF50' : '#F44336' },
              ]}
            />
          ))}
        </View>
      </View>
      <Icon name="arrow-up" size={24} color="#000" style={styles.arrowIcon} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6EEFF',
  },
  contentContainer: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    marginRight: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  infoContainer: {
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: "#DFEBFF",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 30
  },
  location: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0056A1',
    marginBottom: 5,
  },
  slots: {
    fontSize: 16,
    color: '#0056A1',
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  legendColor: {
    width: 20,
    height: 20,
    marginRight: 5,
    borderRadius: 5,
  },
  legendText: {
    fontSize: 16,
  },
  parkingMap: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  parkingColumn: {
    alignItems: 'center',
  },
  columnSpacer: {
    width: 90,
  },
  parkingSlot: {
    width: 80,
    height: 35,
    marginVertical: 5,
    borderRadius: 5,
  },
  arrowIcon: {
    alignSelf: 'center',
    marginTop: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default ParkingDetail;