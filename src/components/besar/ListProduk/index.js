import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { CardProduk } from '../../kecil'
import { colors, fonts, heightMobileUI, responsiveHeight, responsiveWidth } from '../../../utils'
import { connect } from 'react-redux'
import { RFValue } from 'react-native-responsive-fontsize'

const ListProduk = ({getListProdukLoading, getListProdukResult, navigation, keyword}) => {
  return (
    <View>
      {getListProdukResult ? (
        <View style={styles.container}>
          {Object.keys(getListProdukResult)
            .filter(key => getListProdukResult[key].nama.toLowerCase().includes(keyword ? keyword.toLowerCase() : ''))
            .reverse()
            .map(key => {
              return (
                <CardProduk
                  produk={getListProdukResult[key]}
                  key={key}
                  navigation={navigation}
                />
              );
            })}
        </View>
      ) : getListProdukLoading ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : (
        <View style={styles.wrapText}>
          <Text style={styles.text}>Tidak Ada Produk Yang Tersedia</Text>
        </View>
      )}
    </View>
  );
}

const mapStateToProps = state => ({
  getListProdukLoading: state.ProdukReducer.getListProdukLoading,
  getListProdukResult: state.ProdukReducer.getListProdukResult,
  getListProdukError: state.ProdukReducer.getListProdukError,

  keyword: state.ProdukReducer.keyword,
});

export default connect(mapStateToProps, null)(ListProduk)

const styles = StyleSheet.create({
  container: {
    marginHorizontal: responsiveWidth(20),
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
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
});