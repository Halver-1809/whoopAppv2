import { Ionicons } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Notifications = () => {
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Notification',
          headerBackTitle: 'Notification',
        }}
      />
      <Ionicons
        name="notifications-outline"
        size={48}
        color="#FE6B00"
        style={styles.icon}
      />

      <Text style={styles.title}>No has recibido ninguna notificación</Text>
      <Text style={styles.subtitle}>
        Aquí podrás verlas cuando tengas nuevas notificaciones.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#FFF', // Fondo blanco o personalizable
  },
  icon: {
    marginBottom: 16, // Espacio entre el ícono y el texto
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333', // Color del título
    textAlign: 'center',
    marginBottom: 8, // Espacio entre título y subtítulo
  },
  subtitle: {
    fontSize: 14,
    color: '#666', // Color del subtítulo
    textAlign: 'center',
  },
});

export default Notifications;
