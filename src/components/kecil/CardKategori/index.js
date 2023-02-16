import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {
  dropshadow,
  fonts,
  responsiveHeight,
  responsiveWidth,
} from '../../../utils';
import DropShadow from 'react-native-drop-shadow';
import {RFValue} from 'react-native-responsive-fontsize';
import {heightMobileUI} from '../../../utils/constant';
import {SvgUri} from 'react-native-svg';
import {connect} from 'react-redux';
import {getProdukByKategori} from '../../../actions/ProdukAction';

//'kategori' dikirim dari ListKategori
const CardKategori = ({kategori, navigation, id, dispatch}) => {
  const ProdukByKategori = (id, namaKategori) => {
    //ke ProdukAction
    dispatch(getProdukByKategori(id, namaKategori));

    //navigate ke halaman Bouquet
    navigation.navigate('Bouquet');
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => ProdukByKategori(id, kategori.nama)}>
      <DropShadow style={dropshadow.kategoriCard}>
        <View style={styles.card}>
          <SvgUri
            width={responsiveWidth(57)}
            height={responsiveHeight(57)}
            uri={kategori.gambar}
          />
        </View>
      </DropShadow>
      <Text numberOfLines={2} style={styles.label}>
        {kategori.nama}
      </Text>
    </TouchableOpacity>
  );
};

export default connect()(CardKategori);

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
  label: {
    fontSize: RFValue(15, heightMobileUI),
    fontFamily: fonts.primary.regular,
    marginTop: responsiveHeight(3),
    width: responsiveWidth(80),
    textAlign: 'center',
    color: 'black',
  },
});
