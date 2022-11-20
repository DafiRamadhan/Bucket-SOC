import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { colors, fonts, responsiveHeight, responsiveWidth } from '../../../utils';
import { RFValue } from 'react-native-responsive-fontsize';
import { heightMobileUI } from '../../../utils/constant';

const CardOrders = ({pesanan, navigation}) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('DetailPesanan', {pesanan})}>
      <View style={styles.container}>
        <View style={styles.box}>
          <View style={styles.wrapTanggal}>
            <Text style={styles.tanggal}>{pesanan.tanggalPemesanan}</Text>
          </View>
          <View style={styles.wrapStatus}>
            <Text style={styles.status}>{pesanan.status}</Text>
          </View>
          <View style={styles.item}>
            <Image
              source={pesanan.items[0].product.gambar}
              style={styles.gambar}
            />
            <View style={styles.wrapDetail}>
              <Text style={styles.nama} numberOfLines={1}>
                {pesanan.items[0].product.nama}
              </Text>
              <Text style={styles.harga}>
                Rp{pesanan.items[0].product.harga.toLocaleString('id-ID')} x
                {pesanan.items[0].jumlahPesan}
              </Text>
              <View style={styles.wrapTotal}>
                <Text style={styles.harga}>Total Harga : </Text>
                <Text style={styles.hargaTotal}>
                  Rp{pesanan.items[0].totalHarga.toLocaleString('id-ID')}
                </Text>
              </View>
            </View>
          </View>
          {pesanan.items.length - 1 >= 1 ? (
            <Text style={styles.jumlahProduk}>
              +{pesanan.items.length - 1} Produk Lainnya
            </Text>
          ) : (
            <Text></Text>
          )}
          <View style={styles.wrapInvoice}>
            <View>
              <Text style={styles.labelInvoice}>Ongkos Kirim : </Text>
              <Text style={styles.labelInvoice}>Total Pesanan : </Text>
            </View>
            <View>
              <Text style={styles.amountInvoice}>
                Rp{pesanan.ongkir.toLocaleString('id-ID')}
              </Text>
              <Text style={styles.amountInvoice}>
                Rp
                {(pesanan.totalHarga + pesanan.ongkir).toLocaleString('id-ID')}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default CardOrders

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderBottomColor: '#E7E7E7',
    borderBottomWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: responsiveWidth(25),
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
  },
  box: {
    backgroundColor: colors.white,
    paddingVertical: responsiveHeight(25),
    width: '100%',
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
  },
  wrapTanggal: {
    alignItems: 'center',
  },
  tanggal: {
    fontSize: RFValue(18, heightMobileUI),
    fontFamily: fonts.primary.bold,
    color: '#A7A7A7',
  },
  wrapStatus: {
    backgroundColor: colors.primary,
    alignSelf: 'flex-end',
    paddingHorizontal: responsiveWidth(10),
    paddingVertical: responsiveHeight(2.5),
    marginVertical: responsiveHeight(13),
    borderRadius: 10,
  },
  status: {
    fontSize: RFValue(12.5, heightMobileUI),
    fontFamily: fonts.primary.bold,
    color: colors.white,
  },
  item: {
    flexDirection: 'row',
  },
  gambar: {
    width: responsiveWidth(80),
    height: responsiveHeight(80),
    marginRight: responsiveWidth(7),
    marginBottom: responsiveHeight(10),
    borderRadius: 5,
  },
  wrapDetail: {
    flex: 1,
  },
  nama: {
    fontSize: RFValue(15, heightMobileUI),
    fontFamily: fonts.primary.regular,
    color: colors.black,
    marginBottom: responsiveHeight(17),
  },
  harga: {
    fontSize: RFValue(12, heightMobileUI),
    fontFamily: fonts.primary.regular,
    color: colors.black,
    textAlign: 'right',
  },
  wrapTotal: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
  },
  hargaTotal: {
    fontSize: RFValue(12, heightMobileUI),
    fontFamily: fonts.primary.bold,
    color: colors.black,
  },
  jumlahProduk: {
    fontSize: RFValue(13, heightMobileUI),
    fontFamily: fonts.primary.regular,
    color: colors.black,
    marginBottom: responsiveHeight(17),
  },
  wrapInvoice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  labelInvoice: {
    fontSize: RFValue(15, heightMobileUI),
    fontFamily: fonts.primary.bold,
    color: colors.black,
  },
  amountInvoice: {
    fontSize: RFValue(15, heightMobileUI),
    fontFamily: fonts.primary.bold,
    color: colors.black,
    textAlign: 'right',
  },
});