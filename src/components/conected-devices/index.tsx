import { Ionicons } from '@expo/vector-icons'; // Para los íconos
import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import SvgComponent from './assets/bot';
import SvgComponent3 from './assets/humifi';
import SvgComponent2 from './assets/light';
import ConnectDeviceModal from './utils/boton-modal';

const DeviceScreen = () => {
  const [selectedDevice, setSelectedDevice] = useState<{
    name: string;
    id: string;
  } | null>(null);

  const handleDeviceSelected = (device: { name: string; id: string }) => {
    setSelectedDevice(device); // Guardamos el dispositivo seleccionado en el estado
  };

  // Función para seleccionar un SVG aleatorio
  const getRandomSvg = () => {
    const svgs = [SvgComponent, SvgComponent2, SvgComponent3];
    const randomIndex = Math.floor(Math.random() * svgs.length);
    return svgs[randomIndex];
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Search</Text>
        <Text style={styles.subHeaderText}>Wifi: tw1r_413_7G</Text>
      </View>
      <Text style={styles.devicesText}>3 new devices</Text>
      <View style={styles.devicesContainer}>
        <TouchableOpacity style={styles.deviceCard}>
          <SvgComponent style={styles.svg3} />
          <Text style={styles.deviceTitle}>Bork V530</Text>
          <Text style={styles.deviceSubtitle}>Vacuum cleaner</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deviceCard}>
          <SvgComponent2 style={styles.svg3} />
          <Text style={styles.deviceTitle}>LIFX LED Light</Text>
          <Text style={styles.deviceSubtitle}>Smart bulb</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deviceCard}>
          <SvgComponent3 style={styles.svg3} />
          <Text style={styles.deviceTitle}>Xiaomi DEM-F600</Text>
          <Text style={styles.deviceSubtitle}>Humidifier</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.deviceCard, styles.notFoundCard]}>
          <Ionicons name="wifi" size={40} color="#FF8C42" />
          <Text style={styles.deviceTitle}>Not found device?</Text>
          <Text style={[styles.deviceSubtitle, { color: '#FF8C42' }]}>
            Select manually
          </Text>
        </TouchableOpacity>
        {selectedDevice && (
          <View style={styles.deviceCard}>
            {React.createElement(getRandomSvg(), { style: styles.svg3 })}{' '}
            {/* SVG aleatorio */}
            <Text style={styles.deviceTitle}>{selectedDevice.name}</Text>
            <Text style={styles.deviceSubtitle}>ID: {selectedDevice.id}</Text>
          </View>
        )}
      </View>
      <ConnectDeviceModal onDeviceSelected={handleDeviceSelected} />
      <ScrollView contentContainerStyle={styles.deviceList}></ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
    paddingHorizontal: 16,
    paddingTop: 50,
  },
  deviceList: {
    marginTop: 20,
    paddingBottom: 20,
  },
  svg3: {
    marginBottom: 8,
  },
  header: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    color: '#FFFFFF',
    fontSize: 28,
    textAlign: 'left',
  },
  subHeaderText: {
    color: '#AAAAAA',
    fontSize: 14,
    textAlign: 'right',
  },
  devicesText: {
    color: '#FFFFFF',
    fontSize: 18,
    marginVertical: 10,
  },
  devicesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  deviceCard: {
    backgroundColor: '#292929',
    borderRadius: 12,
    padding: 16,
    width: '47%',
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notFoundCard: {
    borderColor: '#FF8C42',
    borderWidth: 1,
  },
  deviceImage: {
    width: 60,
    height: 60,
    marginBottom: 10,
  },
  deviceTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  deviceSubtitle: {
    color: '#AAAAAA',
    fontSize: 12,
    textAlign: 'center',
  },
  addButton: {
    backgroundColor: '#FF8C42',
    borderRadius: 25,
    paddingVertical: 12,
    marginVertical: 20,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    backgroundColor: '#292929',
    borderRadius: 25,
  },
  selectedDeviceContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  selectedDeviceText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default DeviceScreen;
