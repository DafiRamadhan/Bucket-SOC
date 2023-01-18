import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {colors, fonts, responsiveHeight, responsiveWidth} from '../../../utils';
import {IconTrash} from '../../../assets';
import {RFValue} from 'react-native-responsive-fontsize';
import {heightMobileUI} from '../../../utils/constant';
import { connect } from 'react-redux';
import { deleteKeranjang } from '../../../actions/KeranjangAction';

const CardKeranjang = ({item, dispatch, id, keranjang}) => {

  const hapusKeranjang = () => {
    dispatch(deleteKeranjang(id, keranjang, item))
  }
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Image source={{uri : item.produk.gambar[0]}} style={styles.gambar} />
        <View style={styles.desc}>
          <View style={styles.title}>
            <Text style={styles.nama}>
              {item.produk.nama}
            </Text>
            <Text style={styles.harga}>
              Rp{item.produk.harga.toLocaleString('id-ID')}
            </Text>
          </View>
          <View style={styles.deskripsi}>
            <View style={styles.deskripsiWrap}>
              <Text style={styles.deskripsiTitle}>Jumlah : </Text>
              <Text style={styles.deskripsiText}>{item.jumlah}</Text>
            </View>
            <View style={styles.deskripsiWrap}>
              <Text style={styles.deskripsiTitle}>Kategori Buket : </Text>
              <Text style={styles.deskripsiText}>
                {item.produk.nama_kategori}
              </Text>
            </View>
            {item.catatan ? (
              <Text style={styles.deskripsiTitle}>Catatan :</Text>
            ) : (
              <Text></Text>
            )}
            <Text style={styles.deskripsiText}>
              {item.catatan}
            </Text>
          </View>
        </View>
        <TouchableOpacity style={styles.hapus} onPress={() => hapusKeranjang()}>
          <IconTrash />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default connect()(CardKeranjang);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomColor: '#E7E7E7',
    borderBottomWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: responsiveWidth(25),
  },
  box: {
    flexDirection: 'row',
    marginVertical: responsiveHeight(15),
  },
  gambar: {
    width: responsiveWidth(100),
    height: responsiveHeight(100),
    alignSelf: 'center',
    marginRight: responsiveWidth(10),
    borderRadius: 5,
  },
  hapus: {
    flex: 1,
    alignItems: 'flex-end',
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
    textAlign: 'justify',
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
