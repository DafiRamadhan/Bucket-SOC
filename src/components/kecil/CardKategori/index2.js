import {
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {
  colors,
  dropshadow,
  fonts,
  responsiveHeight,
  responsiveWidth,
} from '../../../utils';
import DropShadow from 'react-native-drop-shadow';
import {RFValue} from 'react-native-responsive-fontsize';
import {heightMobileUI} from '../../../utils/constant';

//'kategori' dikirim dari halaman ListKategori
const CardKategori2 = ({kategori}) => {
  return (
    <DropShadow style={dropshadow.kategoriText}>
      <TouchableOpacity style={styles.container}>
        <Text style={styles.label}>
          {kategori.nama}
        </Text>
      </TouchableOpacity>
    </DropShadow>
  );
};

export default CardKategori2;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    marginRight: 10,
    borderRadius: 50,
    paddingHorizontal: 13,
    paddingVertical: 4,
  },
  label: {
    fontSize: RFValue(14, heightMobileUI),
    fontFamily: fonts.primary.bold,
    color: colors.white,
    textAlign: 'center',
  },
});
