import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  Linking,
} from 'react-native';
import React, {Component} from 'react';
import {colors, fonts, responsiveHeight, responsiveWidth} from '../../utils';
import {RFValue} from 'react-native-responsive-fontsize';
import {heightMobileUI} from '../../utils/constant';
import {Header, Jarak} from '../../components';

export default class DetailPesanan extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pesanan: this.props.route.params.pesanan,
    };
  }

  render() {
    const {pesanan} = this.state;
    const {navigation} = this.props;
    return (
      <View style={styles.pages}>
        <Header
          title="Detail Pesanan"
          goBack={() => navigation.navigate('Orders')}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <View style={styles.wrapInfo}>
              <View style={styles.desc}>
                <Text style={styles.titleText}>Status</Text>
                <View style={styles.wrapStatus}>
                  <Text style={styles.status}>{pesanan.status}</Text>
                </View>
              </View>
              <View style={styles.desc}>
                <Text style={styles.labelText}>Order ID</Text>
                <Text style={styles.infoText}>{pesanan.orderId}</Text>
              </View>
              <View style={styles.desc}>
                <Text style={styles.labelText}>Tanggal Pemesanan</Text>
                <Text style={styles.infoText}>{pesanan.tanggalPemesanan}</Text>
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
              {pesanan.items.map((list, index) => {
                return (
                  <View key={index} style={styles.itemList}>
                    <View style={styles.item}>
                      <Image
                        source={list.product.gambar}
                        style={styles.gambar}
                      />
                      <View style={styles.wrapDetail}>
                        <Text style={styles.nama} numberOfLines={1}>
                          {list.product.nama}
                        </Text>
                        <Text style={styles.harga}>
                          Rp
                          {list.product.harga.toLocaleString('id-ID')} x
                          {list.jumlahPesan}
                        </Text>
                        <View style={styles.wrapTotal}>
                          <Text style={styles.harga}>Total Harga : </Text>
                          <Text style={styles.hargaTotal}>
                            Rp
                            {list.totalHarga.toLocaleString('id-ID')}
                          </Text>
                        </View>
                      </View>
                    </View>
                    {list.catatan ? (
                      <Text style={styles.catatanText}>Catatan :</Text>
                    ) : (
                      <Text></Text>
                    )}
                    {list.catatan ? (
                      <Text style={styles.catatan}>{list.catatan}</Text>
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
                  Informasi Pengiriman / Pengambilan
                </Text>
              </View>
              <View style={styles.desc}>
                <Text style={styles.labelText}>Permintaan Tanggal</Text>
                <Text style={styles.infoText}>{pesanan.tanggalKirim}</Text>
              </View>
              <View style={styles.desc}>
                <Text style={styles.labelText}>Metode Pengiriman</Text>
                <Text style={styles.infoText}>{pesanan.metodeKirim}</Text>
              </View>
              <View style={styles.desc}>
                <Text style={styles.labelText}>Alamat</Text>
                <Text style={styles.infoText}>{pesanan.profile.nama}</Text>
              </View>
              <Text style={styles.infoAlamat}>{pesanan.profile.nomerHp}</Text>
              <Text style={styles.infoAlamat}>
                {pesanan.profile.alamat}, {pesanan.profile.kelurahan}, Kec.{' '}
                {pesanan.profile.kecamatan}, {pesanan.profile.kota}
              </Text>
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
                  Rp{pesanan.totalHarga.toLocaleString('id-ID')}
                </Text>
              </View>
              <View style={styles.desc}>
                <Text style={styles.labelText}>Total Ongkos Kirim</Text>
                <Text style={styles.infoText}>
                  Rp{pesanan.ongkir.toLocaleString('id-ID')}
                </Text>
              </View>
              <View style={styles.desc}>
                <Text style={styles.totalText}>Total Pesanan</Text>
                <Text style={styles.totalInfo}>
                  Rp
                  {(pesanan.totalHarga + pesanan.ongkir).toLocaleString(
                    'id-ID',
                  )}
                </Text>
              </View>
            </View>
            <View style={styles.wrapPilihan}>
              <TouchableOpacity
                onPress={() => navigation.navigate('Orders')}>
                <View style={styles.wrapButton}>
                  <View>
                    <Text style={styles.textMenu}>
                      Lihat Halaman Pembayaran
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('Orders')}>
                <View style={styles.wrapButton}>
                  <View>
                    <Text style={styles.textMenu}>Lihat Invoice Pembelian</Text>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  Linking.openURL(
                    "whatsapp://send?text=Halo, saya memiliki pertanyaan untuk pesanan saya dengan order ID "+(pesanan.orderId)+". &phone=6288225276534",
                  )
                }>
                <View style={styles.wrapButton}>
                  <View>
                    <Text style={styles.textMenu}>Kontak Kami</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  pages: {
    flex: 1,
    backgroundColor: colors.white,
  },
  wrapInfo: {
    marginBottom: responsiveHeight(20),
    marginHorizontal: responsiveWidth(25),
  },
  wrapProduk: {
    marginHorizontal: responsiveWidth(25),
  },
  wrapPilihan: {
    marginVertical: responsiveHeight(20),
    marginHorizontal: responsiveWidth(25),
  },
  desc: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 17,
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
  },
  infoText: {
    fontFamily: fonts.primary.regular,
    fontSize: RFValue(15, heightMobileUI),
    color: colors.black,
    textAlign: 'right',
    width: responsiveWidth(220),
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
  itemList: {
    marginTop: responsiveHeight(20),
    borderBottomColor: '#E7E7E7',
    borderBottomWidth: 2,
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
  wrapButton: {
    flexDirection: 'row',
    borderColor: colors.primary,
    borderWidth: 2,
    borderRadius: 10,
    marginBottom: responsiveHeight(20),
    padding: responsiveHeight(10),
    alignItems: 'center',
    justifyContent: 'center',
    height: responsiveHeight(54),
  },
  textMenu: {
    fontSize: RFValue(16, heightMobileUI),
    fontFamily: fonts.primary.semibold,
    color: 'black',
  },
});
