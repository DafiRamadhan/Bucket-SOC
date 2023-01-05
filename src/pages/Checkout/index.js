import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {Component} from 'react';
import {
  colors,
  dropshadow,
  fonts,
  responsiveHeight,
  responsiveWidth,
} from '../../utils';
import DropShadow from 'react-native-drop-shadow';
import {IconWallet} from '../../assets';
import {heightMobileUI} from '../../utils/constant';
import {RFValue} from 'react-native-responsive-fontsize';
import {
  CardAlamat,
  Header,
  Jarak,
  Pilihan,
  PilihTanggal,
} from '../../components/kecil';
import {dummyPesanan, dummyProfile} from '../../data';
import { connect } from 'react-redux';
import { postOngkir } from '../../actions/BiteshipAction';

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: dummyProfile,
      pesanan: dummyPesanan[0],
      ekspedisi: ['gojek', 'grab'],
      selectedEkspedisi: '',
      selectedPengirimanIndex: '',
      pilihTanggal: '',
      pilihWaktu: '',
    };
  }

  updateTanggal = tanggal => {
    this.setState({
      pilihTanggal: tanggal,
    });
  };

  updateWaktu = waktu => {
    this.setState({
      pilihWaktu: waktu,
    });
  };

  pilihEkspedisi = selectedEkspedisi => {
    if (selectedEkspedisi) {
      this.setState({
        selectedEkspedisi: selectedEkspedisi,
      });
      const data = JSON.stringify({
        origin_latitude: -7.5584244,
        origin_longitude: 110.7841043,
        destination_latitude: -7.5433613,
        destination_longitude: 110.7655909,
        couriers: selectedEkspedisi,
        items: [
          {
            name: 'Shoes',
            description: 'Black colored size 45',
            value: 165000,
            length: 40,
            width: 40,
            height: 40,
            weight: 300,
            quantity: 1,
          },
        ],
      });
      this.props.dispatch(postOngkir(data));
    }
  };

  render() {
    const {profile, ekspedisi, pesanan, selectedEkspedisi} = this.state;
    const {navigation, ongkirResult} = this.props;
    return (
      <View style={styles.pages}>
        <Header
          title="Checkout"
          goBack={() => navigation.navigate('Keranjang')}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <CardAlamat profile={profile} />
          </View>
          <Jarak
            width={'100%'}
            height={responsiveHeight(7)}
            backgroundColor={colors.line}
          />
          <View style={styles.container}>
            <Pilihan
              label="Pilih Metode Pengiriman"
              datas={ekspedisi}
              selectedValue={selectedEkspedisi}
              onValueChange={selectedEkspedisi =>
                this.pilihEkspedisi(selectedEkspedisi)
              }
            />
          </View>
          <Jarak width={'100%'} height={responsiveHeight(20)} />
          <Jarak
            width={'100%'}
            height={responsiveHeight(7)}
            backgroundColor={colors.line}
          />
          <View style={styles.container}>
            <PilihTanggal
              updateTanggal={data => this.updateTanggal(data)}
              updateWaktu={data => this.updateWaktu(data)}
            />
          </View>
          <Jarak
            width={'100%'}
            height={responsiveHeight(7)}
            backgroundColor={colors.line}
          />
          <View style={styles.container}>
            <View style={styles.rincianHarga}>
              <Text style={styles.rincianText}>Rincian Harga</Text>
              <View style={styles.totalHarga}>
                <Text style={styles.totalText}>Total Harga</Text>
                <Text style={styles.totalText}>
                  Rp{pesanan.totalHarga.toLocaleString('id-ID')}
                </Text>
              </View>
              <View style={styles.totalHarga}>
                <Text style={styles.totalText}>Total Ongkos Kirim</Text>
                {ongkirResult ? (
                  <Text style={styles.totalText}>
                    Rp{ongkirResult.toLocaleString('id-ID')}
                  </Text>
                ) : (
                  <Text style={styles.totalText}>
                    Rp0
                  </Text>
                )}
              </View>
              <View style={styles.totalHarga}>
                <Text style={styles.tagihan}>Total Tagihan</Text>
                <Text style={styles.tagihan}>
                  Rp
                  {(pesanan.totalHarga + ongkirResult).toLocaleString('id-ID')}
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
        <DropShadow style={dropshadow.footer}>
          <View style={styles.footer}>
            <View style={styles.totalTagihan}>
              <Text style={styles.tagihanText}>Total Tagihan :</Text>
              <Text style={styles.hargaText}>
                Rp{(pesanan.totalHarga + 15000).toLocaleString('id-ID')}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.tombolBayar}
              onPress={() => navigation.navigate('Home')}>
              <IconWallet />
              <Text style={styles.bayarText}>Bayar</Text>
            </TouchableOpacity>
          </View>
        </DropShadow>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  ongkirResult: state.BiteshipReducer.ongkirResult,
});

export default connect(mapStateToProps, null)(Checkout);

const styles = StyleSheet.create({
  pages: {
    flex: 1,
    backgroundColor: colors.white,
  },
  container: {
    marginHorizontal: 25,
  },
  rincianHarga: {
    marginTop: 17,
    marginBottom: 20,
  },
  rincianText: {
    fontFamily: fonts.primary.semibold,
    fontSize: RFValue(18, heightMobileUI),
    color: colors.black,
  },
  totalHarga: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 17,
  },
  totalText: {
    fontFamily: fonts.primary.regular,
    fontSize: RFValue(16, heightMobileUI),
    color: colors.black,
  },
  tagihan: {
    fontFamily: fonts.primary.bold,
    fontSize: RFValue(18, heightMobileUI),
    color: colors.primary,
  },
  footer: {
    height: responsiveHeight(85),
    width: '100%',
    backgroundColor: colors.white,
    paddingHorizontal: responsiveWidth(25),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tagihanText: {
    color: colors.black,
    fontFamily: fonts.primary.regular,
    fontSize: RFValue(16, heightMobileUI),
  },
  hargaText: {
    color: colors.black,
    fontFamily: fonts.primary.bold,
    fontSize: RFValue(20, heightMobileUI),
  },
  tombolBayar: {
    backgroundColor: colors.primary,
    borderRadius: 5,
    width: responsiveWidth(165),
    height: responsiveHeight(54),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: responsiveWidth(16),
  },
  bayarText: {
    color: colors.white,
    fontFamily: fonts.primary.bold,
    fontSize: RFValue(18, heightMobileUI),
    paddingLeft: 20,
  },
});
