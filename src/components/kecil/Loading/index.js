import { ActivityIndicator, StyleSheet, View } from 'react-native'
import React from 'react'
import { colors, responsiveHeight } from '../../../utils';

export default function Loading() {
  return (
    <View style={styles.loading}>
      <View style={styles.loadingBox}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loading: {
    position: 'absolute',
    backgroundColor: 'rgba(52, 52, 52, 0.1)',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingBox: {
    backgroundColor: colors.white,
    width: responsiveHeight(100),
    height: responsiveHeight(90),
    borderRadius: 10,
    justifyContent: 'center',
  },
});