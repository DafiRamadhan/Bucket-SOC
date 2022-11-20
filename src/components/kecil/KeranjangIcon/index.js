import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {IconCart, IconCart2} from '../../../assets';
import {colors, fonts, responsiveHeight, responsiveWidth} from '../../../utils';
import {RFValue} from 'react-native-responsive-fontsize';
import {heightMobileUI} from '../../../utils/constant';

//dibuat konstanta Tombol dengan parameter icon
const KeranjangIcon = ({icon, totalKeranjang, onPress}) => {
  //konstanta icon yang berisi pengondisian untuk tiap2 icon
  const Icon = () => {
    if (icon === 'keranjang') {
      return <IconCart />;
    }
    //return default jika kondisi if tidak ada yang memenuhi
    return <IconCart2 />;
  };
  if (totalKeranjang >= 99) {
    return (
      <TouchableOpacity style={styles.container} onPress={onPress}>
        <Icon />
        {totalKeranjang && (
          <View style={styles.notif}>
            <Text style={styles.textNotif}>99</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  }
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Icon />
      {totalKeranjang && (
        <View style={styles.notif}>
          <Text style={styles.textNotif}>{totalKeranjang}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default KeranjangIcon;

const styles = StyleSheet.create({
  container: {
    //backgroundColor: colors.white,
    left: 10,
    top: 3,
  },
  notif: {
    position: 'absolute',
    left: 25,
    bottom: 31,
    backgroundColor: 'red',
    padding: 3,
    borderRadius: 200,
    height: responsiveHeight(20),
    width: responsiveWidth(20),
  },
  textNotif: {
    color: colors.white,
    fontFamily: fonts.primary.bold,
    fontSize: RFValue(10, heightMobileUI),
    textAlign: 'center',
  },
});
