import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import DropShadow from 'react-native-drop-shadow';
import {
  colors,
  dropshadow,
  fonts,
  responsiveHeight,
  responsiveWidth,
} from '../../../utils';
import {RFValue} from 'react-native-responsive-fontsize';
import {heightMobileUI} from '../../../utils/constant';
import {connect} from 'react-redux';

const CardProduk = ({produk, id, navigation}) => {
  return (
    <View>
      <TouchableOpacity
        style={styles.container}
        onPress={() => navigation.navigate('DetailProduk', {produk, id})}>
        <DropShadow style={dropshadow.kategoriCard}>
          <View style={styles.card}>
            <Image source={{uri: produk.gambar[0]}} style={styles.gambar} />
            <Text numberOfLines={2} style={styles.title}>
              {produk.nama}
            </Text>
            <View style={styles.tombol}>
              <Text style={styles.harga}>
                Rp{produk.harga.toLocaleString('id-ID')}
              </Text>
            </View>
          </View>
        </DropShadow>
      </TouchableOpacity>
    </View>
  );
};

const mapStateToProps = state => ({
  keyword: state.ProdukReducer.keyword,
});

export default connect(mapStateToProps, null)(CardProduk);

const styles = StyleSheet.create({
  container: {
    marginVertical: responsiveHeight(10),
  },
  card: {
    width: responsiveWidth(180),
    height: responsiveHeight(260),
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: 10,
  },
  gambar: {
    width: responsiveWidth(160),
    height: responsiveHeight(160),
    borderRadius: 5,
    marginTop: 10,
  },
  title: {
    fontSize: RFValue(14, heightMobileUI),
    fontFamily: fonts.primary.bold,
    textAlign: 'center',
    marginTop: 5,
    paddingHorizontal: 10,
    color: 'black',
  },
  tombol: {
    backgroundColor: colors.primary,
    width: responsiveWidth(160),
    height: responsiveHeight(32),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    position: 'absolute',
    bottom: 8,
  },
  harga: {
    fontSize: RFValue(13, heightMobileUI),
    fontFamily: fonts.primary.extrabold,
    textAlign: 'center',
    marginHorizontal: 10,
    color: 'white',
  },
});
