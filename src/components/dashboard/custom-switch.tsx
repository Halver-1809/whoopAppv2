import React from 'react';

import { Text, TouchableOpacity, View } from '@/components/ui';

interface CustomSwitchProps {
  selectionMode: number;
  option1: string;
  option2: string;
  onSelectSwitch: (value: number) => void;
}

export default function CustomSwitch({
  selectionMode,
  option1,
  option2,
  onSelectSwitch,
}: CustomSwitchProps) {
  console.log('Datos recibidos del custom');
  const updateSwitchData = (value: number) => {
    onSelectSwitch(value);
  };

  return (
    <View
      style={{
        height: 44,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
      }}
    >
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => updateSwitchData(1)}
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          borderBottomWidth: 2,
          borderBottomColor: selectionMode === 1 ? '#B4AAF9' : '#e4e4e4',
        }}
      >
        <Text
          style={{
            fontSize: selectionMode === 2 ? 18 : 20,
          }}
        >
          {option1}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => updateSwitchData(2)}
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          alignContent: 'center',
          borderBottomWidth: 2,
          borderBottomColor: selectionMode === 2 ? '#b4aaf9' : '#e4e4e4',
        }}
      >
        <Text
          style={{
            fontSize: selectionMode === 2 ? 20 : 18,
          }}
        >
          {option2}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
