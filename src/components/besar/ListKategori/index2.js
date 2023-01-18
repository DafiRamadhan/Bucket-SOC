import {
  StyleSheet,
  View,
  ScrollView,
  ActivityIndicator,
  Text,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {CardKategori2} from '../../kecil';
import {
  colors,
  dropshadow,
  fonts,
  heightMobileUI,
  responsiveHeight,
  responsiveWidth,
} from '../../../utils';
import {connect} from 'react-redux';
import {RFValue} from 'react-native-responsive-fontsize';
import DropShadow from 'react-native-drop-shadow';
import { deleteKategoriFilter } from '../../../actions/ProdukAction';

//dikirim dari halaman Bouquet
const ListKategori2 = ({getListKategoriLoading, getListKategoriResult, navigation, idKategori, dispatch}) => {
  return (
    <View>
      {getListKategoriResult ? (
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          <View style={styles.container}>
            <DropShadow style={dropshadow.kategoriText}>
              <TouchableOpacity
                style={styles.semua(idKategori)}
                onPress={() => dispatch(deleteKategoriFilter())}>
                <Text style={styles.semuaText(idKategori)}>Semua</Text>
              </TouchableOpacity>
            </DropShadow>
            {Object.keys(getListKategoriResult).map(key => {
              return (
                <CardKategori2
                  navigation={navigation}
                  kategori={getListKategoriResult[key]}
                  key={key}
                  id={key}
                />
              );
            })}
          </View>
        </ScrollView>
      ) : getListKategoriLoading ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : (
        <View style={styles.wrapText}>
          <Text style={styles.text}>Tidak Ada Kategori Yang Tersedia</Text>
        </View>
      )}
    </View>
  );
};

const mapStateToProps = state => ({
  getListKategoriLoading: state.KategoriReducer.getListKategoriLoading,
  getListKategoriResult: state.KategoriReducer.getListKategoriResult,
  getListKategoriError: state.KategoriReducer.getListKategoriError,

  idKategori: state.ProdukReducer.idKategori,
  namaKategori: state.ProdukReducer.namaKategori,
});

export default connect(mapStateToProps, null)(ListKategori2);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: responsiveWidth(20),
    marginRight: responsiveWidth(10),
    marginTop: responsiveHeight(3),
  },
  loading: {
    marginVertical: responsiveHeight(10),
  },
  wrapText: {
    alignItems: 'center',
    marginVertical: responsiveHeight(10),
  },
  text: {
    color: colors.black,
    fontFamily: fonts.primary.regular,
    fontSize: RFValue(14, heightMobileUI),
  },
  semua: idKategori => ({
    alignItems: 'center',
    backgroundColor: idKategori ? colors.white : colors.primary,
    marginRight: responsiveWidth(10),
    borderRadius: 50,
    paddingHorizontal: responsiveWidth(13),
    paddingVertical: responsiveHeight(5),
    marginBottom: responsiveHeight(15),
  }),
  semuaText: (idKategori) => ({
    fontSize: RFValue(14, heightMobileUI),
    fontFamily: fonts.primary.bold,
    color: idKategori ? colors.desc : colors.white,
    textAlign: 'center',
  }),
});
