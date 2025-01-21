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
import Zeroconf from 'react-native-zeroconf';

interface ConnectDeviceModalProps {
  onDeviceSelected: (device: { name: string; id: string }) => void;
}

const ConnectDeviceModal: React.FC<ConnectDeviceModalProps> = ({
  onDeviceSelected,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [devices, setDevices] = useState<{ name: string; id: string }[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);
  const [showDevices, setShowDevices] = useState(false);

  const scaleAnim = new Animated.Value(0);
  const rotateAnim = new Animated.Value(0);
  const zeroconf = new Zeroconf();

  useEffect(() => {
    if (modalVisible) {
      startSearchingAnimation();

      // Inicia el escaneo de dispositivos en la red WiFi
      zeroconf.scan();

      zeroconf.on('resolved', (device: any) => {
        console.log('kheli hptaaaa:', device);
        setDevices((prevDevices) => {
          // Verifica si el dispositivo ya existe en la lista
          if (!prevDevices.some((d) => d.id === device.host)) {
            return [
              ...prevDevices,
              {
                name: device.name || device.fullName || 'Unknown Device',
                id: device.host || 'Unknown Host',
              },
            ];
          }
          return prevDevices;
        });
      });

      // Detener el escaneo cuando el modal se cierra
      return () => {
        zeroconf.stop();
      };
    }
  }, [modalVisible]);

  useEffect(() => {
    if (modalVisible) {
      const timer = setTimeout(() => {
        setShowDevices(true);
      }, 3000);
      return () => clearTimeout(timer);
    } else {
      setShowDevices(false);
    }
  }, [modalVisible]);

  const startSearchingAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.5,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();

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
    onDeviceSelected(device);
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
            <ScrollView contentContainerStyle={styles.deviceList}>
              {devices.map((device, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.deviceCard,
                    selectedDevice === device.name && styles.selectedDevice,
                  ]}
                  onPress={() => handleDeviceSelect(device)}
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
