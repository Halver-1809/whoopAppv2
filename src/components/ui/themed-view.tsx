import { useColorScheme } from 'nativewind';
import React from 'react';
import type { ViewProps, ViewStyle } from 'react-native';
import { StyleSheet, View as NNView } from 'react-native';
import { twMerge } from 'tailwind-merge';

interface Props extends ViewProps {
  className?: string;
}

export const ThemedView = ({
  className = '',
  style,
  children,
  ...props
}: Props) => {
  const { colorScheme } = useColorScheme(); // Detecta el tema actual

  const viewStyle = React.useMemo(
    () =>
      twMerge(
        colorScheme === 'dark' ? 'bg-darkbrading-200' : 'bg-white',
        className
      ),
    [className, colorScheme]
  );

  const nStyle = React.useMemo(
    () => StyleSheet.flatten([style]) as ViewStyle,
    [style]
  );

  return (
    <NNView className={viewStyle} style={nStyle} {...props}>
      {children}
    </NNView>
  );
};
