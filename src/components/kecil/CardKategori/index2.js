import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
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
import {connect} from 'react-redux';

//'kategori' dikirim dari ListKategori2
const CardKategori2 = ({kategori, id, dispatch, idKategori}) => {
  const ProdukByKategori = (id, namaKategori) => {
    //ke ProdukAction
    dispatch(getProdukByKategori(id, namaKategori));
  };

  return (
    <View>
      <DropShadow style={dropshadow.kategoriText}>
        <TouchableOpacity
          style={styles.container(id, idKategori)}
          onPress={() => ProdukByKategori(id, kategori.nama)}>
          <Text style={styles.label(id, idKategori)}>
            {kategori.nama}
          </Text>
        </TouchableOpacity>
      </DropShadow>
    </View>
  );
};

const mapStateToProps = state => ({
  idKategori: state.ProdukReducer.idKategori,
  namaKategori: state.ProdukReducer.namaKategori,
});

export default connect(mapStateToProps, null)(CardKategori2);

const styles = StyleSheet.create({
  container: (id, idKategori) => ({
    alignItems: 'center',
    backgroundColor: idKategori === id ? colors.primary : colors.white,
    marginRight: responsiveWidth(10),
    borderRadius: 50,
    paddingHorizontal: responsiveWidth(13),
    paddingVertical: responsiveHeight(5),
    marginBottom: responsiveHeight(15),
  }),
  label: (id, idKategori) => ({
    fontSize: RFValue(14, heightMobileUI),
    fontFamily: fonts.primary.bold,
    color: idKategori === id ? colors.white : colors.desc,
    textAlign: 'center',
  }),
});
