import React, { useEffect, useState } from 'react';
import { Button, Text, View } from 'react-native';
import Zeroconf from 'react-native-zeroconf';

interface Device {
  name: string;
  host: string;
  ip: string;
  port: number;
}

const ConnectDeviceModal = () => {
  const [zeroconf, setZeroconf] = useState<Zeroconf | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [devices, setDevices] = useState<Device[]>([]);

  useEffect(() => {
    const initializeZeroconf = () => {
      try {
        const zeroconfInstance = new Zeroconf();
        if (zeroconfInstance) {
          setZeroconf(zeroconfInstance); // Inicializa Zeroconf
          console.log('Zeroconf instance initialized');

          zeroconfInstance.on('resolved', (service) => {
            console.log('Service found:', service);
            setDevices((prevDevices) => [
              ...prevDevices,
              {
                name: service.name,
                host: service.host,
                ip: service.ip,
                port: service.port,
              },
            ]);
          });

          zeroconfInstance.on('error', (error: Error) => {
            console.error('Zeroconf Error:', error);
          });
        } else {
          console.error('Failed to initialize Zeroconf');
        }
      } catch (error) {
        console.error('Error initializing Zeroconf:', error);
      }
    };

    initializeZeroconf();

    return () => {
      if (zeroconf) {
        zeroconf.removeListeners(); // Limpia los listeners al desmontar
        console.log('Zeroconf listeners removed');
      }
    };
  }, []); // Solo se ejecuta una vez, al montar el componente

  const startScan = () => {
    if (zeroconf) {
      console.log(
        'Zeroconf instance available, checking if scan can be started...'
      );
      setIsScanning(true);

      // Comprobar si la instancia es válida antes de llamar a scan
      setTimeout(() => {
        if (zeroconf) {
          try {
            console.log('Starting scan...');
            zeroconf.scan(); // Intentar iniciar el escaneo
            console.log('Scan started');
          } catch (error) {
            console.error('Error starting scan:', error);
          }
        } else {
          console.warn('Zeroconf is still null or not ready');
        }
      }, 1000); // Retrasar el inicio del escaneo por 1 segundo para asegurar que Zeroconf esté listo
    } else {
      console.warn('Zeroconf is not initialized yet');
    }
  };

  const stopScan = () => {
    if (zeroconf) {
      console.log('Stopping scan...');
      setIsScanning(false);
      try {
        zeroconf.stop(); // Detiene el escaneo si Zeroconf está inicializado
        console.log('Scan stopped');
      } catch (error) {
        console.error('Error stopping scan:', error);
      }
    } else {
      console.warn('Zeroconf is not initialized yet');
    }
  };

  return (
    <View>
      <Button
        title={isScanning ? 'Detener escaneo' : 'Iniciar escaneo'}
        onPress={() => (isScanning ? stopScan() : startScan())}
      />
      <View>
        {devices.map((device, index) => (
          <Text key={index}>{device.name}</Text>
        ))}
      </View>
    </View>
  );
};

export default ConnectDeviceModal;
