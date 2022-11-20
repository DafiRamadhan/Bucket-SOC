import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {colors, fonts, responsiveHeight, responsiveWidth} from '../../../utils';
import {IconTrash} from '../../../assets';
import {RFValue} from 'react-native-responsive-fontsize';
import {heightMobileUI} from '../../../utils/constant';

const CardKeranjang = ({keranjang}) => {
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Image source={keranjang.product.gambar} style={styles.gambar} />
        <View style={styles.desc}>
          <View style={styles.title}>
            <Text numberOfLines={1} style={styles.nama}>
              {keranjang.product.nama}
            </Text>
            <Text style={styles.harga}>
              Rp{keranjang.product.harga.toLocaleString('id-ID')}
            </Text>
          </View>
          <View style={styles.deskripsi}>
            <View style={styles.deskripsiWrap}>
              <Text style={styles.deskripsiTitle}>Jumlah : </Text>
              <Text style={styles.deskripsiText}>{keranjang.jumlahPesan}</Text>
            </View>
            <View style={styles.deskripsiWrap}>
              <Text style={styles.deskripsiTitle}>Kategori Buket : </Text>
              <Text style={styles.deskripsiText}>
                {keranjang.product.kategori.nama}
              </Text>
            </View>
            {keranjang.catatan ? (
              <Text style={styles.deskripsiTitle}>Catatan :</Text>
            ) : (
              <Text></Text>
            )}
            <Text style={styles.deskripsiText} numberOfLines={2}>
              {keranjang.catatan}
            </Text>
          </View>
        </View>
        <TouchableOpacity style={styles.hapus}>
          <IconTrash />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CardKeranjang;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    //backgroundColor: colors.primary,
    borderBottomColor: '#E7E7E7',
    height: responsiveHeight(171),
    borderBottomWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: responsiveWidth(25),
  },
  box: {
    flexDirection: 'row',
    //backgroundColor: colors.primary,
    height: responsiveHeight(141),
    marginVertical: responsiveHeight(15),
  },
  gambar: {
    width: responsiveWidth(100),
    height: responsiveHeight(100),
    alignSelf: 'center',
    marginRight: responsiveWidth(10),
    borderRadius: 10,
  },
  hapus: {
    flex: 1,
    alignItems: 'flex-end',
  },
  desc: {
    //alignSelf: 'center',
  },
  title: {
    width: responsiveWidth(225),
    marginBottom: responsiveHeight(8),
  },
  deskripsi: {
    width: responsiveWidth(253),
  },
  nama: {
    fontFamily: fonts.primary.regular,
    fontSize: RFValue(15, heightMobileUI),
    color: colors.black,
  },
  harga: {
    fontFamily: fonts.primary.bold,
    fontSize: RFValue(16, heightMobileUI),
    color: colors.black,
  },
  deskripsiWrap: {
    flexDirection: 'row',
  },
  deskripsiTitle: {
    fontFamily: fonts.primary.bold,
    fontSize: RFValue(13, heightMobileUI),
    color: colors.black,
  },
  deskripsiText: {
    fontFamily: fonts.primary.regular,
    fontSize: RFValue(13, heightMobileUI),
    color: colors.black,
    textAlign: 'justify',
  },
});
