import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { useIsFirstTime } from '@/lib/hooks';

const { width, height } = Dimensions.get('window');

const COLORS = { primary: '#282828', white: '#fff' };

interface SlideData {
  id: string;
  image: any;
  title: string;
  subtitle: string;
}

const slides: SlideData[] = [
  {
    id: '1',
    image: require('../../assets/images/image1.png'),
    title: 'Best Digital Solution',
    subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    id: '2',
    image: require('../../assets/images/image2.png'),
    title: 'Achieve Your Goals',
    subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    id: '3',
    image: require('../../assets/images/image3.png'),
    title: 'Increase Your Value',
    subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
];

interface SlideProps {
  item: SlideData;
}

const Slide: React.FC<SlideProps> = ({ item }) => {
  return (
    <View style={{ alignItems: 'center', position: 'relative' }}>
      {/* Outer Circle */}
      <View
        style={[
          styles.circle,
          {
            backgroundColor: 'rgba(255, 255, 255, 0.2)', // Más claro
            width: width * 0.9,
            height: width * 0.9,
          },
        ]}
      />
      {/* Inner Circle */}
      <View
        style={[
          styles.circle,
          {
            backgroundColor: 'rgba(255, 255, 255, 0.1)', // Más oscuro
            width: width * 0.7,
            height: width * 0.7,
          },
        ]}
      />
      {/* Image */}
      <Image
        source={item?.image}
        style={{ height: '75%', width, resizeMode: 'contain' }}
      />
      <View>
        <Text style={styles.title}>{item?.title}</Text>
        <Text style={styles.subtitle}>{item?.subtitle}</Text>
      </View>
    </View>
  );
};

interface OnboardingScreenProps {
  navigation: any;
}

const Onboarding: React.FC<OnboardingScreenProps> = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = React.useState<number>(0);
  const ref = React.useRef<FlatList>(null);
  const [_, setIsFirstTime] = useIsFirstTime();
  const router = useRouter();

  const updateCurrentSlideIndex = (e: any) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
  };

  const goToNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    if (nextSlideIndex !== slides.length) {
      const offset = nextSlideIndex * width;
      ref?.current?.scrollToOffset({ offset });
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  const Footer = () => {
    return (
      <View
        style={{
          height: height * 0.25,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {currentSlideIndex === slides.length - 1 ? (
          <TouchableOpacity
            style={styles.getStartedBtn}
            onPress={() => {
              setIsFirstTime(false);
              router.replace('/login');
            }}
          >
            <Text style={styles.getStartedText}>GET STARTED</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.roundButton} onPress={goToNextSlide}>
            <Ionicons name="arrow-forward" size={32} color={COLORS.primary} />
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.primary }}>
      <StatusBar backgroundColor={COLORS.primary} />
      <FlatList
        ref={ref}
        onMomentumScrollEnd={updateCurrentSlideIndex}
        contentContainerStyle={{ height: height * 0.75 }}
        showsHorizontalScrollIndicator={false}
        horizontal
        data={slides}
        pagingEnabled
        renderItem={({ item }) => <Slide item={item} />}
      />
      <Footer />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  circle: {
    position: 'absolute',
    borderRadius: 1000, // Hace que el cuadrado sea un círculo
    alignSelf: 'center',
  },
  subtitle: {
    color: COLORS.white,
    fontSize: 13,
    marginTop: 10,
    maxWidth: '70%',
    textAlign: 'center',
    lineHeight: 23,
  },
  title: {
    color: COLORS.white,
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  roundButton: {
    height: 60,
    width: 60,
    borderRadius: 30,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  getStartedBtn: {
    height: 50,
    borderRadius: 5,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  getStartedText: {
    fontWeight: 'bold',
    fontSize: 15,
    color: COLORS.primary,
  },
});

export default Onboarding;
