import { Stack } from 'expo-router';
import React from 'react';
import { FlatList, Image, StyleSheet, View } from 'react-native';

import { Text } from '@/components/ui';

const UserProfile = () => {
  // Datos del usuario
  const userData = {
    primer_nombre: 'Juan',
    segundo_nombre: 'Pérez',
    correo: 'juan.perez@example.com',
    altura: '1.80 m',
    peso: '75 kg',
    nivel: 'Intermedio',
    edad: 28,
  };

  // Detalles personales
  const personalDetails = [
    { label: 'Altura', value: userData?.altura || 'N/A' },
    { label: 'Peso', value: userData?.peso || 'N/A' },
    { label: 'Nivel de Entrenamiento', value: userData?.nivel || 'N/A' },
    { label: 'Edad', value: userData?.edad || 'N/A' },
  ];

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Profile',
          headerBackTitle: 'Profile',
        }}
      />
      {/* Contenedor del Banner e Imagen */}
      <View style={styles.bannerContainer}>
        <View style={styles.banner}>
          <Image
            source={require('../../../assets/images/perfil-12.jpg')}
            style={styles.imageProfile}
          />
        </View>
      </View>

      <View style={styles.userInfo}>
        <Text style={styles.nameInfo}>
          {userData?.primer_nombre + ' ' + userData?.segundo_nombre}
        </Text>
        <Text style={styles.email}>{userData?.correo || 'N/A'}</Text>
      </View>

      {/* Información del Usuario */}
      <Text style={styles.title}>Información del Usuario</Text>
      <FlatList
        data={personalDetails}
        keyExtractor={(item) => item.label}
        renderItem={({ item }) => (
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>{item.label}:</Text>
            <Text style={styles.detailValue}>{item.value}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bannerContainer: {
    backgroundColor: '#8A2BE2', // Fondo del banner
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  banner: {
    position: 'relative',
    width: 120,
    height: 120,
    marginTop: 50, // Para centrar visualmente la imagen
  },
  imageProfile: {
    width: 120,
    height: 120,
    borderRadius: 60, // Para hacerla redonda
    borderWidth: 4,
    borderColor: '#fff', // Borde blanco
    position: 'absolute',
    bottom: -30, // Superponer la imagen
  },
  userInfo: {
    alignItems: 'center',
    marginTop: 40, // Ajuste para el espacio después del banner
    marginBottom: 20,
  },
  nameInfo: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 14,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 20,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  detailLabel: {
    fontSize: 16,
  },
  detailValue: {
    fontSize: 16,
  },
});

export default UserProfile;
