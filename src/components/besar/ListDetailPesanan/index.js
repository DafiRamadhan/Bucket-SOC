import {Image, Linking, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {colors, fonts, responsiveHeight, responsiveWidth} from '../../../utils';
import {heightMobileUI} from '../../../utils/constant';
import {RFValue} from 'react-native-responsive-fontsize';
import {Jarak} from '../../kecil';

export default function ListDetailPesanan({pesanan, admin, navigation}) {
  const item = pesanan ? pesanan.item : '';
  return (
    <View>
      <View style={styles.wrapInfo}>
        <View style={styles.desc}>
          <Text style={styles.titleText}>Status Pesanan</Text>
          <View style={styles.wrapStatus}>
            <Text style={styles.status}>{pesanan.status_pesanan}</Text>
          </View>
        </View>
        <View style={styles.desc}>
          <Text style={styles.labelText}>ID Pesanan</Text>
          <Text style={styles.infoText}>{pesanan.order_id}</Text>
        </View>
        <View style={styles.desc}>
          <Text style={styles.labelText}>Tanggal Pemesanan</Text>
          <Text style={styles.infoText}>{pesanan.tanggal_pemesanan}</Text>
        </View>
      </View>
      <Jarak
        width={'100%'}
        height={responsiveHeight(7)}
        backgroundColor={colors.line}
      />
      <View style={styles.wrapProduk}>
        <View style={styles.desc}>
          <Text style={styles.titleText}>Detail Produk</Text>
        </View>
        {Object.keys(item).map((key, index, array) => {
          return (
            <View key={index} style={styles.itemList(index, array)}>
              <View style={styles.item}>
                <Image
                  source={{uri: item[key].produk.gambar[0]}}
                  style={styles.gambar}
                />
                <View style={styles.wrapDetail}>
                  <Text style={styles.nama}>{item[key].produk.nama}</Text>
                  <Text style={styles.harga}>
                    Rp
                    {item[key].produk.harga.toLocaleString('id-ID')} x
                    {item[key].jumlah}
                  </Text>
                  <View style={styles.wrapTotal}>
                    <Text style={styles.harga}>Total Harga : </Text>
                    <Text style={styles.hargaTotal}>
                      Rp
                      {item[key].total_harga.toLocaleString('id-ID')}
                    </Text>
                  </View>
                </View>
              </View>
              {item[key].catatan ? (
                <Text style={styles.catatanText}>Catatan :</Text>
              ) : (
                <Text></Text>
              )}
              {item[key].catatan ? (
                <Text style={styles.catatan}>{item[key].catatan}</Text>
              ) : null}
            </View>
          );
        })}
      </View>
      <Jarak
        width={'100%'}
        height={responsiveHeight(7)}
        backgroundColor={colors.line}
      />
      <View style={styles.wrapInfo}>
        <View style={styles.desc}>
          <Text style={styles.titleText}>
            {pesanan.order_id.slice(-1) === 'A'
              ? 'Informasi Pengiriman'
              : 'Informasi Pengambilan'}
          </Text>
        </View>
        <View style={styles.desc}>
          <Text style={styles.labelText}>Permintaan Tanggal</Text>
          <Text style={styles.infoText}>{pesanan.tanggal_pengiriman}</Text>
        </View>
        <View style={styles.desc}>
          <Text style={styles.labelText}>
            {pesanan.order_id.slice(-1) === 'A'
              ? 'Metode Pengiriman'
              : 'Metode Pengambilan'}
          </Text>
          <Text style={styles.infoText}>{pesanan.metode_pengiriman}</Text>
        </View>
        <View style={styles.desc}>
          <Text style={styles.labelText}>Info Kontak</Text>
          <Text style={styles.infoText}>{pesanan.user.nama}</Text>
        </View>
        <Text style={styles.infoAlamat}>({pesanan.user.nomerHp})</Text>
        {pesanan.order_id.slice(-1) === 'A' ? (
          <View style={styles.desc}>
            <Text style={styles.labelText}>Alamat Pengiriman</Text>
            <Text style={styles.infoText}>{pesanan.user.alamat}</Text>
          </View>
        ) : (
          <View style={styles.desc}>
            <Text style={styles.labelText}>Alamat Toko</Text>
            {admin.alamat ? (
              <TouchableOpacity
                onPress={() =>
                  Linking.openURL('https://maps.google.com/?q=' + admin.alamat)
                }>
                <Text style={styles.tokoText}>{admin.alamat}</Text>
              </TouchableOpacity>
            ) : null}
          </View>
        )}
        {pesanan.order_id.slice(-1) === 'A' ? (
          <View style={styles.desc}>
            <Text style={styles.labelText}>Detail Alamat Pengiriman</Text>
            <Text style={styles.infoText}>{pesanan.user.detail_alamat}</Text>
          </View>
        ) : (
          <View style={styles.desc}>
            <Text style={styles.labelText}>Detail Alamat Toko</Text>
            <Text style={styles.infoText}>Nusukan</Text>
          </View>
        )}
        {pesanan.biteship_id ? (
          <View>
            <View style={styles.desc}>
              <Text style={styles.idLabel}>ID Pengiriman</Text>
              <Text style={styles.idText}>{pesanan.biteship_id}</Text>
            </View>
            <TouchableOpacity
              style={styles.tombolLacak}
              onPress={() =>
                navigation.navigate('LacakPengiriman', pesanan.biteship_id)
              }>
              <Text style={styles.lacakText}>Lacak Pengiriman</Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
      <Jarak
        width={'100%'}
        height={responsiveHeight(7)}
        backgroundColor={colors.line}
      />
      <View style={styles.wrapInfo}>
        <View style={styles.desc}>
          <Text style={styles.titleText}>Rincian Harga</Text>
        </View>
        <View style={styles.desc}>
          <Text style={styles.labelText}>Total Harga Barang</Text>
          <Text style={styles.infoText}>
            Rp{pesanan.total_harga_barang.toLocaleString('id-ID')}
          </Text>
        </View>
        <View style={styles.desc}>
          <Text style={styles.labelText}>Total Ongkos Kirim</Text>
          <Text style={styles.infoText}>
            Rp{pesanan.total_ongkir.toLocaleString('id-ID')}
          </Text>
        </View>
        <View style={styles.desc}>
          <Text style={styles.totalText}>Total Pesanan</Text>
          <Text style={styles.totalInfo}>
            Rp
            {(pesanan.total_harga_barang + pesanan.total_ongkir).toLocaleString(
              'id-ID',
            )}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapInfo: {
    marginBottom: responsiveHeight(20),
    marginHorizontal: responsiveWidth(25),
  },
  wrapProduk: {
    marginHorizontal: responsiveWidth(25),
  },
  desc: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: responsiveHeight(17),
  },
  titleText: {
    fontFamily: fonts.primary.bold,
    fontSize: RFValue(16, heightMobileUI),
    color: colors.black,
  },
  labelText: {
    fontFamily: fonts.primary.regular,
    fontSize: RFValue(15, heightMobileUI),
    color: colors.black,
    width: responsiveWidth(140),
  },
  infoText: {
    fontFamily: fonts.primary.regular,
    fontSize: RFValue(15, heightMobileUI),
    color: colors.black,
    textAlign: 'right',
    width: responsiveWidth(220),
  },
  tokoText: {
    fontFamily: fonts.primary.regular,
    fontSize: RFValue(15, heightMobileUI),
    color: colors.black,
    textAlign: 'right',
    width: responsiveWidth(220),
    textDecorationLine: 'underline',
  },
  idLabel: {
    fontFamily: fonts.primary.regular,
    fontSize: RFValue(15, heightMobileUI),
    color: colors.black,
    width: responsiveWidth(120),
  },
  idText: {
    fontFamily: fonts.primary.regular,
    fontSize: RFValue(15, heightMobileUI),
    color: colors.black,
    textAlign: 'right',
    width: responsiveWidth(240),
  },
  wrapStatus: {
    backgroundColor: colors.primary,
    alignSelf: 'flex-end',
    paddingHorizontal: responsiveWidth(10),
    paddingVertical: responsiveHeight(2.5),
    borderRadius: 10,
  },
  status: {
    fontSize: RFValue(13, heightMobileUI),
    fontFamily: fonts.primary.bold,
    color: colors.white,
  },
  itemList: (index, array) => ({
    marginTop: responsiveHeight(20),
    borderBottomColor: '#E7E7E7',
    borderBottomWidth: index === array.length - 1 ? 0 : 2,
  }),
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
    textAlign: 'justify',
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
  catatanText: {
    fontSize: RFValue(13, heightMobileUI),
    fontFamily: fonts.primary.semibold,
    color: colors.black,
  },
  catatan: {
    fontSize: RFValue(12, heightMobileUI),
    fontFamily: fonts.primary.regular,
    color: colors.black,
    textAlign: 'justify',
    marginBottom: responsiveHeight(20),
  },
  infoAlamat: {
    fontFamily: fonts.primary.regular,
    fontSize: RFValue(15, heightMobileUI),
    color: colors.black,
    textAlign: 'right',
    alignSelf: 'flex-end',
    width: responsiveWidth(230),
  },
  totalText: {
    fontFamily: fonts.primary.bold,
    fontSize: RFValue(17, heightMobileUI),
    color: colors.primary,
  },
  totalInfo: {
    fontFamily: fonts.primary.bold,
    fontSize: RFValue(17, heightMobileUI),
    color: colors.primary,
    textAlign: 'right',
    width: responsiveWidth(220),
  },
  tombolLacak: {
    alignSelf: 'flex-end',
    marginTop: responsiveHeight(17),
  },
  lacakText: {
    fontFamily: fonts.primary.bold,
    fontSize: RFValue(17, heightMobileUI),
    color: colors.primary,
  },
});
