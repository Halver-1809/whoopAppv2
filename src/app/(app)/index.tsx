import React from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { ProgressBar } from 'react-native-paper'; // Requiere instalación: npm install react-native-paper

const { width } = Dimensions.get('window');

// Mock Data
const userProfile = {
  name: 'Juan Pérez',
  profilePicture:
    'https://i.pinimg.com/236x/ca/cb/19/cacb196590d8f40c55d825902e8ab733.jpg',
  greeting: '¡Hola, Juan!',
  recoveryLevel: 85,
  sleepHours: 7.5,
  dailySteps: 8000,
  goalSteps: 10000,
};

const stats = [
  { id: '1', label: 'Sueño', value: '7.5 h', percentage: 75 },
  { id: '2', label: 'Recuperación', value: '85%', percentage: 85 },
  { id: '3', label: 'Pasos', value: '8,000', percentage: 80 },
];

const tips = [
  {
    id: '1',
    title: 'Descansa bien',
    description:
      'Intenta dormir al menos 8 horas para maximizar tu recuperación.',
  },
  {
    id: '2',
    title: 'Hidratación',
    description: 'Bebe al menos 2 litros de agua hoy.',
  },
  {
    id: '3',
    title: 'Ejercicio',
    description: 'Camina 10,000 pasos para alcanzar tu objetivo diario.',
  },
];

const HomeScreen: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={{ uri: userProfile.profilePicture }}
          style={styles.profilePicture}
        />
        <View>
          <Text style={styles.greeting}>{userProfile.greeting}</Text>
          <Text style={styles.subGreeting}>Hoy será un gran día 🚀</Text>
        </View>
      </View>

      {/* Daily Stats */}
      <View style={styles.stats}>
        <Text style={styles.sectionTitle}>Resumen Diario</Text>
        <View style={styles.statsContainer}>
          {stats.map((stat) => (
            <View key={stat.id} style={styles.statBox}>
              <Text style={styles.statLabel}>{stat.label}</Text>
              <Text style={styles.statValue}>{stat.value}</Text>
              <ProgressBar
                progress={stat.percentage / 100}
                color="#FE6B00"
                style={styles.progressBar}
              />
            </View>
          ))}
        </View>
      </View>

      {/* Tips */}
      <View style={styles.tips}>
        <Text style={styles.sectionTitle}>Recomendaciones</Text>
        {tips.map((tip) => (
          <View key={tip.id} style={styles.tipBox}>
            <Text style={styles.tipTitle}>{tip.title}</Text>
            <Text style={styles.tipDescription}>{tip.description}</Text>
          </View>
        ))}
      </View>

      {/* Call-to-Actions */}
      <View style={styles.ctaSection}>
        <Text style={styles.sectionTitle}>Acciones Rápidas</Text>
        <FlatList
          data={[
            'Configurar Objetivos',
            'Ver Notificaciones',
            'Conectar Dispositivo',
          ]}
          horizontal
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.ctaButton}>
              <Text style={styles.ctaText}>{item}</Text>
            </TouchableOpacity>
          )}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </ScrollView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePicture: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 12,
    borderWidth: 2,
    borderColor: '#FE6B00',
  },
  greeting: {
    color: '#FE6B00',
    fontSize: 22,
    fontWeight: '700',
  },
  subGreeting: {
    color: '#FFF',
    fontSize: 16,
    marginTop: 4,
  },
  stats: {
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statBox: {
    backgroundColor: '#1E1E1E',
    padding: 12,
    borderRadius: 12,
    width: (width - 48) / 3,
    alignItems: 'center',
  },
  statLabel: {
    color: '#AAA',
    fontSize: 14,
  },
  statValue: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
    marginVertical: 8,
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
    width: '100%',
  },
  tips: {
    marginBottom: 20,
  },
  tipBox: {
    backgroundColor: '#1E1E1E',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  tipTitle: {
    color: '#FE6B00',
    fontSize: 16,
    fontWeight: '700',
  },
  tipDescription: {
    color: '#FFF',
    fontSize: 14,
    marginTop: 4,
  },
  ctaSection: {
    marginBottom: 20,
  },
  ctaButton: {
    backgroundColor: '#FE6B00',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginRight: 10,
  },
  ctaText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '700',
  },
  sectionTitle: {
    color: '#FE6B00',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },
});

export default HomeScreen;
