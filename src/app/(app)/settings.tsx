/* eslint-disable react/react-in-jsx-scope */
import { Env } from '@env';
import { router } from 'expo-router';
import { useColorScheme } from 'nativewind';
import React from 'react';
import { StyleSheet } from 'react-native';

import { Item } from '@/components/settings/item';
import { ItemsContainer } from '@/components/settings/items-container';
import { LanguageItem } from '@/components/settings/language-item';
import { ThemeItem } from '@/components/settings/theme-item';
import {
  colors,
  FocusAwareStatusBar,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from '@/components/ui';
import { Github, Rate, Share, Support, Website } from '@/components/ui/icons';
import { translate, useAuth } from '@/lib';

export default function Settings() {
  const signOut = useAuth.use.signOut();
  const { colorScheme } = useColorScheme();
  const iconColor =
    colorScheme === 'dark' ? colors.neutral[400] : colors.neutral[500];
  return (
    <>
      <FocusAwareStatusBar />
      <ScrollView>
        <View className="flex-1 px-4 pt-16 ">
          <Text className="text-xl font-bold">
            {translate('settings.title')}
          </Text>
          <TouchableOpacity
            style={styles.userInfoWrapper}
            onPress={() => router.push('../profile/profile-info')}
          >
            <Image
              source={require('assets/images/perfil-12.jpg')}
              style={styles.userImg}
            />
            <View style={styles.userDetailsWrapper}>
              <Text style={styles.nameInfo}>Santiago Rojas</Text>
              <Text style={styles.emailInfo}>santiagorqui@gmail.com</Text>
            </View>
          </TouchableOpacity>
          <ItemsContainer title="settings.generale">
            <LanguageItem />
            <ThemeItem />
          </ItemsContainer>

          <ItemsContainer title="settings.about">
            <Item text="settings.app_name" value={Env.NAME} />
            <Item text="settings.version" value={Env.VERSION} />
          </ItemsContainer>

          <ItemsContainer title="settings.support_us">
            <Item
              text="settings.share"
              icon={<Share color={iconColor} />}
              onPress={() => { }}
            />
            <Item
              text="settings.rate"
              icon={<Rate color={iconColor} />}
              onPress={() => { }}
            />
            <Item
              text="settings.support"
              icon={<Support color={iconColor} />}
              onPress={() => { }}
            />
          </ItemsContainer>

          <ItemsContainer title="settings.links">
            <Item text="settings.privacy" onPress={() => { }} />
            <Item text="settings.terms" onPress={() => { }} />
            <Item
              text="settings.github"
              icon={<Github color={iconColor} />}
              onPress={() => { }}
            />
            <Item
              text="settings.website"
              icon={<Website color={iconColor} />}
              onPress={() => { }}
            />
          </ItemsContainer>

          <View className="my-8">
            <ItemsContainer>
              <Item text="settings.logout" onPress={signOut} />
            </ItemsContainer>
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  userInfoWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingBottom: 20,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginBottom: 10,
    marginTop: 20,
  },
  userImg: {
    height: 80,
    width: 80,
    borderRadius: 40,
  },
  userDetailsWrapper: {
    marginLeft: 15,
    justifyContent: 'center',
  },
  nameInfo: {
    fontSize: 18,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  emailInfo: {
    fontSize: 16,
    marginTop: 5,
  },
});
