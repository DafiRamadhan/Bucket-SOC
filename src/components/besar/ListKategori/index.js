import {StyleSheet, View, ScrollView, ActivityIndicator, Text} from 'react-native';
import React from 'react';
import {CardKategori} from '../../kecil';
import {colors, fonts, heightMobileUI, responsiveHeight, responsiveWidth} from '../../../utils';
import {connect} from 'react-redux';
import { RFValue } from 'react-native-responsive-fontsize';

//pilihKateogri dikirim dari halaman Home
const ListKategori = ({getListKategoriLoading, getListKategoriResult, navigation}) => {
  return (
    <View>
      {getListKategoriResult ? (
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          <View style={styles.container}>
            {Object.keys(getListKategoriResult).map(key => {
              return (
                <CardKategori navigation={navigation} kategori={getListKategoriResult[key]} key={key} id={key}/>
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
});

export default connect(mapStateToProps, null)(ListKategori);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: responsiveWidth(20),
    marginRight: responsiveWidth(10),
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
  }
});
