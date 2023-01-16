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
import { connect } from 'react-redux';
import { cancelPesanan } from '../../actions/PesananAction';

class DetailPesanan extends Component {
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
      pesanan: this.props.route.params.pesanan,
    };
  }

  componentDidMount() {
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
    const {cancelPesananResult} = this.props;
    if (
      cancelPesananResult &&
      prevProps.cancelPesananResult !== cancelPesananResult
    ) {
      //jika nilainya true && nilai sebelumnya tidak sama dengan yang baru
      Alert.alert('Sukses', 'Pembatalan Pesanan Berhasil!');
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

  render() {
    const {pesanan} = this.state;
    const {navigation, cancelPesananLoading} = this.props;
    const page = 'DetailPesanan';
    const data = pesanan;
    const selesai = pesanan.status_pesanan.substring(0, 7)
    return (
      <View style={styles.pages}>
        <Header
          title="Detail Pesanan"
          goBack={() => navigation.navigate('Orders')}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            <ListDetailPesanan pesanan={pesanan} navigation={navigation} />
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
              <TouchableOpacity onPress={() => navigation.navigate('Orders')}>
                <View style={styles.wrapButton}>
                  <View>
                    <Text style={styles.textMenu}>Lihat Invoice Pembelian</Text>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  Linking.openURL(
                    'whatsapp://send?text=Halo, saya memiliki pertanyaan untuk pesanan saya dengan order ID ' +
                      pesanan.order_id +
                      '. &phone=6288225276534',
                  )
                }>
                <View style={styles.wrapButton}>
                  <View>
                    <Text style={styles.textMenu}>Kontak Kami</Text>
                  </View>
                </View>
              </TouchableOpacity>
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
            </View>
          </View>
        </ScrollView>
        {cancelPesananLoading ? <Loading /> : null}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  cancelPesananLoading: state.PesananReducer.cancelPesananLoading,
  cancelPesananResult: state.PesananReducer.cancelPesananResult,
  cancelPesananError: state.PesananReducer.cancelPesananError,
});

export default connect(mapStateToProps, null)(DetailPesanan)

const styles = StyleSheet.create({
  pages: {
    flex: 1,
    backgroundColor: colors.white,
  },
  wrapPilihan: {
    marginVertical: responsiveHeight(20),
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
