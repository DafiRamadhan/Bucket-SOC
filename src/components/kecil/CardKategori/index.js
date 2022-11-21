import { StyleSheet, Text, Image, View, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { dropshadow, fonts, responsiveHeight, responsiveWidth } from '../../../utils';
import DropShadow from 'react-native-drop-shadow';
import { RFValue } from 'react-native-responsive-fontsize';
import { heightMobileUI } from '../../../utils/constant';
import { SvgUri } from 'react-native-svg';

//'kategori' dikirim dari halaman ListKategori
const CardKategori = ({kategori}) => {
  return (
    <TouchableOpacity style={styles.container}>
      <DropShadow style={dropshadow.kategoriCard}>
        <View style={styles.card}>
          {/* <Image source={kategori.gambar} style={styles.logo} /> */}
          <SvgUri
            style={styles.logo}
            uri={kategori.gambar}
          />
        </View>
      </DropShadow>
      <Text numberOfLines={2} style={styles.label}>
        {kategori.nama}
      </Text>
    </TouchableOpacity>
  );
}

export default CardKategori

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingRight: responsiveWidth(10),
    marginTop: responsiveHeight(10),
  },
  card: {
    width: responsiveWidth(80),
    height: responsiveHeight(80),
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  logo: {
    width: responsiveWidth(57),
    height: responsiveHeight(57),
  },
  label: {
    fontSize: RFValue(15, heightMobileUI),
    fontFamily: fonts.primary.regular,
    marginTop: 3,
    width: responsiveWidth(80),
    textAlign: 'center',
    color: 'black',
  },
});