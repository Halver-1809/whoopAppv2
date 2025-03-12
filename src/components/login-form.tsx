import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import { WebView } from 'react-native-webview';

import { useAuthToken } from '@/hooks/use-auth-token';

export const LoginForm = ({ onSubmit }: { onSubmit: (data: any) => void }) => {
  const [isWebViewVisible, setWebViewVisible] = useState(false);
  const { authToken, setAuthToken } = useAuthToken();
  const handleLoginPress = () => {
    setWebViewVisible(true);
  };

  const handleNavigationStateChange = (navState: any) => {
    const { url } = navState;
    console.log('Current URL:', url);

    if (url && url.includes('whoopapp://auth/callback')) {
      try {
        const params = new URLSearchParams(url.split('?')[1]);
        const token = params.get('token');

        if (token) {
          console.log('Token captured:', token);
          setAuthToken(token); // Guarda el token en AsyncStorage y en el estado
          setWebViewVisible(false);
          onSubmit({ accessToken: token });

          Alert.alert(
            'Autenticación Exitosa',
            'Token capturado correctamente.'
          );
        } else {
          throw new Error('Token no encontrado en la URL.');
        }
      } catch (error) {
        console.error('Error procesando la URL:', error);
        Alert.alert('Error', 'No se pudo capturar el token.');
      }
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={10}
    >
      <View style={styles.container}>
        {isWebViewVisible ? (
          <WebView
            source={{ uri: 'https://whoop-backend.vercel.app/authenticate' }}
            onNavigationStateChange={handleNavigationStateChange}
          />
        ) : (
          <View style={styles.content}>
            <View style={styles.topSection}>
              <Text style={styles.appTitle}>Whoop App</Text>
              <Text style={styles.subTitle}>Inicia sesión para continuar</Text>
            </View>
            <View style={styles.formContainer}>
              <Text style={styles.loginText}>Iniciar sesión</Text>
              <TouchableOpacity
                style={styles.submitButton}
                onPress={handleLoginPress}
              >
                <Text style={styles.submitButtonText}>
                  Iniciar sesión con Whoop
                </Text>
              </TouchableOpacity>
              <View style={styles.footer}>
                <Text style={styles.footerText}>Desarrollado por Santsoft</Text>
                <View style={styles.iconContainer}>
                  <TouchableOpacity>
                    <Ionicons name="logo-facebook" size={30} color="#282828" />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Ionicons name="logo-linkedin" size={30} color="#282828" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#282828',
  },
  content: {
    flex: 1,
  },
  topSection: {
    height: '40%',
    backgroundColor: '#282828',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingHorizontal: 20,
    paddingTop: 40,
    position: 'relative',
  },
  appTitle: {
    color: '#fff',
    fontSize: 32,
    fontWeight: '600',
    marginBottom: 10,
  },
  subTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '400',
    marginTop: 10,
  },
  formContainer: {
    backgroundColor: '#fff',
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    justifyContent: 'center',
  },
  loginText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#282828',
    marginBottom: 30,
    textAlign: 'center',
  },
  submitButton: {
    backgroundColor: '#282828',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    marginTop: 40,
    alignItems: 'center',
  },
  footerText: {
    color: '#282828',
    fontSize: 14,
    fontWeight: '400',
    marginBottom: 10,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },
});
