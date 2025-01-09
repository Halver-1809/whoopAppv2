import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
  Animated,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface ConnectDeviceModalProps {
  onDeviceSelected: (device: { name: string; id: string }) => void;
}

const ConnectDeviceModal: React.FC<ConnectDeviceModalProps> = ({
  onDeviceSelected,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [devices, setDevices] = useState([
    { name: 'Xiaomi Mi Dual Mode Wireless Silent', id: 'XM11X45F78' },
    { name: 'Diflesi Wi-fi Smart Bulb', id: 'DF98Y22G34' },
    { name: 'Samsung Smart Thermostat', id: 'SS42Z15H89' },
    { name: 'Google Nest Hub', id: 'GN56W78P23' },
    { name: 'Amazon Echo Dot', id: 'AE10P33D45' },
    { name: 'Philips Hue Lightstrip', id: 'PH56Z77L12' },
  ]);
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);
  const [showDevices, setShowDevices] = useState(false);

  // Animación para los círculos
  console.log(selectedDevice);
  const scaleAnim = new Animated.Value(0); // Empezamos con escala 0
  const rotateAnim = new Animated.Value(0); // Empezamos sin rotación

  // Iniciar animación cuando se muestre el modal
  useEffect(() => {
    if (modalVisible) {
      startSearchingAnimation();
      // Retrasa la visualización de los dispositivos 3 segundos
      const timer = setTimeout(() => {
        setShowDevices(true);
      }, 3000);

      return () => clearTimeout(timer); // Limpia el temporizador cuando el modal se cierra
    } else {
      setShowDevices(false); // Oculta los dispositivos cuando el modal se cierra
    }
  }, [modalVisible]);

  // Animación de los círculos y la lupa
  const startSearchingAnimation = () => {
    // Animar los círculos
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.5, // Escala al 150%
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1, // Vuelve a la escala original
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Animar la lupa
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      })
    ).start();
  };

  const handleDeviceSelect = (device: { name: string; id: string }) => {
    setSelectedDevice(device.name);
    onDeviceSelected(device); // Pasamos el dispositivo al padre
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => setModalVisible(true)}
      >
        <Ionicons name="add" size={24} color="#FFFFFF" />
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.header}>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.backText}>BACK</Text>
              </TouchableOpacity>
              <Text style={styles.selectedDeviceText}>Selected Device</Text>
            </View>
            <View style={styles.searchContainer}>
              {/* Animación para los círculos */}
              <Animated.View
                style={[
                  styles.circle,
                  styles.outerCircle3,
                  { transform: [{ scale: scaleAnim }] },
                ]}
              />
              <Animated.View
                style={[
                  styles.circle,
                  styles.outerCircle2,
                  { transform: [{ scale: scaleAnim }] },
                ]}
              />
              <Animated.View
                style={[
                  styles.circle,
                  styles.outerCircle1,
                  { transform: [{ scale: scaleAnim }] },
                ]}
              />
              <Animated.View style={styles.mainCircle}>
                <Ionicons name="search-outline" size={65} color="#FFFFFF" />
              </Animated.View>
            </View>
            <Text style={styles.title}>Find something</Text>
            <Text style={styles.subtitle}>Devices</Text>
            <Text style={styles.description}>
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do
              amet sint.
            </Text>

            <ScrollView contentContainerStyle={styles.deviceList}>
              {devices.map((device, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.deviceCard,
                    selectedDevice === device.name && styles.selectedDevice,
                  ]}
                  onPress={() => handleDeviceSelect(device)} // Llamamos a handleDeviceSelect
                >
                  <Ionicons
                    name="bulb-outline"
                    size={24}
                    color="#FFFFFF"
                    style={styles.deviceIcon}
                  />
                  <View>
                    <Text style={styles.deviceName}>{device.name}</Text>
                    <Text style={styles.deviceId}>{device.id}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
    backgroundColor: '#FF6B00',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#1A1A1A',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  backText: {
    color: '#FF6B00',
    fontSize: 14,
    textAlign: 'left',
  },
  selectedDeviceText: {
    flex: 1,
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 35,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    color: '#AAAAAA',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  deviceList: {
    marginTop: 20,
    paddingBottom: 20,
  },
  deviceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333333',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
  },
  deviceIcon: {
    marginRight: 16,
  },
  deviceName: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  deviceId: {
    color: '#AAAAAA',
    fontSize: 12,
  },
  searchContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 60,
    marginTop: 60,
  },
  circle: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: '#333333',
  },
  outerCircle3: {
    opacity: 0.2,
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  outerCircle2: {
    opacity: 0.4,
    width: 180,
    height: 180,
    borderRadius: 90,
  },
  outerCircle1: {
    opacity: 0.6,
    width: 160,
    height: 160,
    borderRadius: 80,
  },
  mainCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#333333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedDevice: {
    backgroundColor: '#FF6B00',
  },
});

export default ConnectDeviceModal;
