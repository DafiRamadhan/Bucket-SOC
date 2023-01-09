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
  getData,
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
import { connect } from 'react-redux';
import { postOngkir } from '../../actions/BiteshipAction';

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: false,
      ekspedisi: [
        'GoSend Instant',
        'GrabExpress Instant',
        'Ambil di Toko (COD)',
      ],
      selectedEkspedisi: false,
      pilihTanggal: '',
      pilihWaktu: '',
      total_harga: this.props.route.params.total_harga,
    };
  }

  //Dijalankan ketika komponen/halaman pertama kali di buka / di load
  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.getUserData();
    });
    this.props.getOngkirResult = 0;
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  //mendapatkan userData dari Async Storage
  getUserData = () => {
    //mendapatkan data dari parameter 'user'
    getData('user').then(res => {
      const data = res;
      //jika datanya ada
      this.setState({
        profile: data,
      });
    });
  };

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
    const {profile} = this.state;
    const {dispatch, getListKeranjangResult} = this.props;
    this.setState({
      selectedEkspedisi: selectedEkspedisi,
    });
    if (selectedEkspedisi && selectedEkspedisi !== 'Ambil di Toko (COD)') {
      let itemList = [];
      Object.keys(getListKeranjangResult.item).forEach(key => {
        itemList.push({
          name: getListKeranjangResult.item[key].produk.nama,
          description: getListKeranjangResult.item[key].catatan,
          value: getListKeranjangResult.item[key].produk.harga,
          quantity: getListKeranjangResult.item[key].jumlah,
        });
      });
      const data = JSON.stringify({
        origin_latitude: -7.548838191314486,
        origin_longitude: 110.83182951593932,
        destination_latitude: profile.latitude,
        destination_longitude: profile.longitude,
        couriers: selectedEkspedisi === 'GoSend Instant' ? 'gojek' : 'grab',
        items: itemList,
      });
      dispatch(postOngkir(data));
    } else {
      this.props.getOngkirResult = 0;
    }
  };

  render() {
    const {profile, ekspedisi, selectedEkspedisi, total_harga} = this.state;
    const {navigation, getOngkirResult} = this.props;
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
                <Text style={styles.totalText}>Total Harga Barang</Text>
                <Text style={styles.totalText}>
                  Rp{total_harga.toLocaleString('id-ID')}
                </Text>
              </View>
              <View style={styles.totalHarga}>
                <Text style={styles.totalText}>Total Ongkos Kirim</Text>
                {getOngkirResult ? (
                  <Text style={styles.totalText}>
                    Rp{getOngkirResult.toLocaleString('id-ID')}
                  </Text>
                ) : (
                  <Text style={styles.totalText}>Rp0</Text>
                )}
              </View>
              <View style={styles.totalHarga}>
                <Text style={styles.tagihan}>Total Tagihan</Text>
                <Text style={styles.tagihan}>
                  Rp
                  {(total_harga + getOngkirResult).toLocaleString('id-ID')}
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
                Rp{(total_harga + getOngkirResult).toLocaleString('id-ID')}
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
  getOngkirResult: state.BiteshipReducer.getOngkirResult,
  getListKeranjangResult: state.KeranjangReducer.getListKeranjangResult,
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
