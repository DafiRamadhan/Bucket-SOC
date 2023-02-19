import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  Linking,
  BackHandler,
  Alert,
} from 'react-native';
import React, {Component} from 'react';
import {colors, fonts, responsiveHeight, responsiveWidth} from '../../utils';
import {RFValue} from 'react-native-responsive-fontsize';
import {heightMobileUI} from '../../utils/constant';
import {Header, ListDetailPesanan, Loading} from '../../components';
import {connect} from 'react-redux';
import {cancelPesanan, pesananSelesai} from '../../actions/PesananAction';
import {getAdminProfile} from '../../actions/ProfileAction';

class DetailPesanan extends Component {
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
      pesanan: this.props.route.params.pesanan,
    };
  }

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch(getAdminProfile());
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  //Ketika suatu komponen terdapat perubahan
  componentDidUpdate(prevProps) {
    const {pesanan} = this.state;
    const {cancelPesananResult, pesananSelesaiResult} = this.props;
    if (
      cancelPesananResult &&
      prevProps.cancelPesananResult !== cancelPesananResult
    ) {
      //jika nilainya true && nilai sebelumnya tidak sama dengan yang baru
      Alert.alert(
        'Sukses',
        pesanan.url_midtrans &&
          pesanan.status_pesanan === 'Menunggu Konfirmasi Admin'
          ? 'Pembatalan pesanan berhasil. Proses pencairan dana Anda sedang berlangsung!'
          : 'Pembatalan pesanan berhasil!',
      );
      this.props.navigation.navigate('Orders');
    }

    if (
      pesananSelesaiResult &&
      prevProps.pesananSelesaiResult !== pesananSelesaiResult
    ) {
      //jika nilainya true && nilai sebelumnya tidak sama dengan yang baru
      Alert.alert('Sukses', 'Pesanan berhasil diselesaikan!');
      this.props.navigation.navigate('Orders');
    }
  }

  handleBackButtonClick() {
    this.props.navigation.navigate('Orders');
    return true;
  }

  cancelDialog = pesanan => {
    return Alert.alert(
      'Konfirmasi Pembatalan',
      'Anda yakin ingin membatalkan pesanan ini?',
      [
        {
          text: 'Tidak',
        },
        {
          text: 'Ya',
          onPress: () => this.cancelOrder(pesanan),
        },
      ],
    );
  };

  cancelOrder = pesanan => {
    const {dispatch} = this.props;
    dispatch(cancelPesanan(pesanan));
  };

  finishDialog = pesanan => {
    return Alert.alert(
      'Konfirmasi Pesanan Selesai',
      "Apakah pesanan telah diterima? Klik 'Ya' hanya jika Anda telah menerima pesanan!",
      [
        {
          text: 'Tidak',
        },
        {
          text: 'Ya',
          onPress: () => this.finishOrder(pesanan),
        },
      ],
    );
  };

  finishOrder = pesanan => {
    const {dispatch} = this.props;
    dispatch(pesananSelesai(pesanan));
  };

  render() {
    const {pesanan} = this.state;
    const {
      navigation,
      cancelPesananLoading,
      pesananSelesaiLoading,
      getAdminProfileResult,
    } = this.props;
    const page = 'DetailPesanan';
    const data = pesanan;
    const selesai = pesanan.status_pesanan.substring(0, 7);
    return (
      <View style={styles.pages}>
        <Header
          noMargin
          title="Detail Pesanan"
          goBack={() => navigation.navigate('Orders')}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            <ListDetailPesanan
              pesanan={pesanan}
              admin={getAdminProfileResult}
              navigation={navigation}
            />
            <View style={styles.wrapPilihan}>
              {pesanan.url_midtrans && selesai !== 'Selesai' ? (
                <TouchableOpacity
                  onPress={() => navigation.navigate('Midtrans', {data, page})}>
                  <View style={styles.wrapButton}>
                    <View>
                      <Text style={styles.textMenu}>
                        Lihat Halaman Pembayaran
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ) : null}
              <TouchableOpacity
                onPress={() => navigation.navigate('Invoice', {pesanan})}>
                <View style={styles.wrapButton}>
                  <View>
                    <Text style={styles.textMenu}>Lihat Invoice Pembelian</Text>
                  </View>
                </View>
              </TouchableOpacity>
              {getAdminProfileResult.nomerHp ? (
                <TouchableOpacity
                  onPress={() =>
                    Linking.openURL(
                      'https://wa.me/' +
                        getAdminProfileResult.nomerHp +
                        '?text=Halo%2C%20saya%20memiliki%20pertanyaan%20untuk%20pesanan%20saya%20dengan%20order%20ID%20' +
                        pesanan.order_id,
                    )
                  }>
                  <View style={styles.wrapButton}>
                    <View>
                      <Text style={styles.textMenu}>Kontak Kami</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ) : null}
              {pesanan.status_pesanan === 'Menunggu Pembayaran' ||
              pesanan.status_pesanan === 'Menunggu Konfirmasi Admin' ? (
                <TouchableOpacity onPress={() => this.cancelDialog(pesanan)}>
                  <View style={styles.wrapButton}>
                    <View>
                      <Text style={styles.textMenu}>Batalkan Pesanan</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ) : null}
              {pesanan.status_pesanan === 'Terkirim' ||
              (pesanan.status_pesanan === 'Siap Diambil' &&
                pesanan.url_midtrans) ? (
                <TouchableOpacity onPress={() => this.finishDialog(pesanan)}>
                  <View style={styles.wrapButton}>
                    <View>
                      <Text style={styles.textMenu}>Selesaikan Pesanan</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ) : null}
            </View>
          </View>
        </ScrollView>
        {cancelPesananLoading || pesananSelesaiLoading ? <Loading /> : null}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  cancelPesananLoading: state.PesananReducer.cancelPesananLoading,
  cancelPesananResult: state.PesananReducer.cancelPesananResult,
  cancelPesananError: state.PesananReducer.cancelPesananError,

  pesananSelesaiLoading: state.PesananReducer.pesananSelesaiLoading,
  pesananSelesaiResult: state.PesananReducer.pesananSelesaiResult,
  pesananSelesaiError: state.PesananReducer.pesananSelesaiError,

  getAdminProfileLoading: state.ProfileReducer.getAdminProfileLoading,
  getAdminProfileResult: state.ProfileReducer.getAdminProfileResult,
  getAdminProfileError: state.ProfileReducer.getAdminProfileError,
});

export default connect(mapStateToProps, null)(DetailPesanan);

const styles = StyleSheet.create({
  pages: {
    flex: 1,
    backgroundColor: colors.white,
  },
  wrapPilihan: {
    marginTop: responsiveHeight(10),
    marginBottom: responsiveHeight(25),
    marginHorizontal: responsiveWidth(25),
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
