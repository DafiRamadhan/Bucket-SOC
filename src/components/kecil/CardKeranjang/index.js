import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {Component} from 'react';
import {colors, fonts, responsiveHeight, responsiveWidth} from '../../../utils';
import {IconTrash} from '../../../assets';
import {RFValue} from 'react-native-responsive-fontsize';
import {heightMobileUI} from '../../../utils/constant';
import {connect} from 'react-redux';
import {deleteKeranjang} from '../../../actions/KeranjangAction';

class CardKeranjang extends Component {
  hapusKeranjang = (id, keranjang, totalKeranjang) => {
    const {dispatch} = this.props;
    dispatch(deleteKeranjang(id, keranjang, totalKeranjang));
  };

  render() {
    const {item, id, keranjang, produkList, totalKeranjang} = this.props;

    return (
      <View style={styles.container}>
        {produkList.find(
          x =>
            x.key === item.produk &&
            produkList.find(x => x.key === item.produk).produk.ready,
        ) ? (
          <View style={styles.box}>
            <Image
              source={{
                uri: produkList.find(x => x.key === item.produk).produk
                  .gambar[0],
              }}
              style={styles.gambar}
            />
            <View style={styles.desc}>
              <View style={styles.title}>
                <Text style={styles.nama}>
                  {produkList.find(x => x.key === item.produk).produk.nama}
                </Text>
                <Text style={styles.harga}>
                  Rp
                  {produkList
                    .find(x => x.key === item.produk)
                    .produk.harga.toLocaleString('id-ID')}
                </Text>
              </View>
              <View style={styles.deskripsi}>
                <View style={styles.deskripsiWrap}>
                  <Text style={styles.deskripsiTitle}>Jumlah : </Text>
                  <Text style={styles.deskripsiText}>{item.jumlah}</Text>
                </View>
                <View style={styles.deskripsiWrap}>
                  <Text style={styles.deskripsiTitle}>Total Harga : </Text>
                  <Text style={styles.deskripsiText}>
                    {produkList.find(x => x.key === item.produk).produk.harga *
                      item.jumlah}
                  </Text>
                </View>
                {item.catatan ? (
                  <Text style={styles.deskripsiTitle}>Catatan :</Text>
                ) : (
                  <Text></Text>
                )}
                <Text style={styles.deskripsiText}>{item.catatan}</Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.hapus}
              onPress={() =>
                this.hapusKeranjang(id, keranjang, totalKeranjang)
              }>
              <IconTrash />
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    );
  }
}

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
