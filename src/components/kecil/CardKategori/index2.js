import {StyleSheet, Text, TouchableOpacity} from 'react-native';
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
import {getProdukByKategori} from '../../../actions/ProdukAction';
import { connect } from 'react-redux';

//'kategori' dikirim dari halaman ListKategori
const CardKategori2 = ({kategori, id, dispatch}) => {
  const ProdukByKategori = (id, namaKategori) => {
    //ke ProdukAction
    dispatch(getProdukByKategori(id, namaKategori));
  };

  return (
    <DropShadow style={dropshadow.kategoriText}>
      <TouchableOpacity
        style={styles.container}
        onPress={() => ProdukByKategori(id, kategori.nama)}>
        <Text style={styles.label}>{kategori.nama}</Text>
      </TouchableOpacity>
    </DropShadow>
  );
};

const mapStateToProps = state => ({
  idKategori: state.ProdukReducer.idKategori,
  namaKategori: state.ProdukReducer.namaKategori,
});

export default connect(mapStateToProps, null)(CardKategori2);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    marginRight: responsiveWidth(10),
    borderRadius: 50,
    paddingHorizontal: responsiveWidth(13),
    paddingVertical: responsiveHeight(5),
    marginBottom: responsiveHeight(15),
  },
  label: {
    fontSize: RFValue(14, heightMobileUI),
    fontFamily: fonts.primary.bold,
    color: colors.white,
    textAlign: 'center',
  },
});
