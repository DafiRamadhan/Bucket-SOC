import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { CardProduk } from '../../kecil'
import { colors, fonts, heightMobileUI, responsiveHeight, responsiveWidth } from '../../../utils'
import { connect } from 'react-redux'
import { RFValue } from 'react-native-responsive-fontsize'

const ListLimitProduk = ({getListLimitProdukLoading, getListLimitProdukResult, navigation, keyword}) => {
  return (
    <View>
      {getListLimitProdukResult ? (
        <View style={styles.container}>
          {Object.keys(getListLimitProdukResult)
            .filter(key => getListLimitProdukResult[key].nama.toLowerCase().includes(keyword ? keyword.toLowerCase() : ''))
            .reverse()
            .map(key => {
              return (
                <CardProduk
                  produk={getListLimitProdukResult[key]}
                  key={key}
                  id={key}
                  navigation={navigation}
                />
              );
            })}
        </View>
      ) : getListLimitProdukLoading ? (
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
  getListLimitProdukLoading: state.ProdukReducer.getListLimitProdukLoading,
  getListLimitProdukResult: state.ProdukReducer.getListLimitProdukResult,
  getListLimitProdukError: state.ProdukReducer.getListLimitProdukError,

  keyword: state.ProdukReducer.keyword,
});

export default connect(mapStateToProps, null)(ListLimitProduk)

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