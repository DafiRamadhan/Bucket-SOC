import {
  Alert,
  BackHandler,
  Linking,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import React, {Component} from 'react';
import WebView from 'react-native-webview';
import {Header, Loading} from '../../components';
import {connect} from 'react-redux';
import {updatePesanan} from '../../actions/PesananAction';
import {colors, responsiveHeight} from '../../utils';
import {getListHistory} from '../../actions/HistoryAction';
import {createRef} from 'react';
import {checkStatusCode, clearStatusCode} from '../../actions/PaymentAction';

class Midtrans extends Component {
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.webViewRef = createRef();
    this.state = {
      url: this.props.route.params.data.url_midtrans,
      refreshing: false,
      backButton: 'Checkout',
    };
  }

  componentDidMount() {
    //Jika dari halaman checkout
    if (this.props.route.params.page === 'Checkout') {
      // Menjalankan fungsi checkStatus setiap 1 detik
      this.interval = setInterval(this.checkStatus, 1000);
    }
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  componentWillUnmount() {
    // Menghentikan interval saat komponen tidak lagi digunakan
    clearInterval(this.interval);
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  handleBackButtonClick() {
    const {backButton} = this.state;
    if (this.props.route.params.page === 'Checkout') {
      if (backButton === 'Orders') {
        this.props.navigation.navigate('Orders');
        this.props.dispatch(clearStatusCode());
      } else {
        this.props.navigation.navigate('Checkout');
      }
      return true;
    } else {
      this.props.navigation.navigate('DetailPesanan');
      return true;
    }
  }

  checkStatus = () => {
    const {checkStatusCodeResult} = this.props;
    //Untuk cek apakah user sudah memilih metode pembayaran
    if (this.props.route.params.data.order_id) {
      //Jika belum memiliki status pesanan (baru membuat pesanan di halaman checkout)
      if (!this.props.route.params.data.status_pesanan) {
        //Untuk cek apakah user sudah memilih metode pembayaran
        this.props.dispatch(
          checkStatusCode(this.props.route.params.data.order_id),
        );

        // Menghentikan interval jika status_code === '201'
        if (checkStatusCodeResult.status_code === '201') {
          clearInterval(this.interval);
          this.setState({
            backButton: 'Orders',
          });
        }
      }
    }
  };

  //Ketika suatu komponen terdapat perubahan
  componentDidUpdate(prevProps) {
    const {updatePesananResult, checkStatusCodeResult} = this.props;
    if (
      checkStatusCodeResult &&
      prevProps.checkStatusCodeResult !== checkStatusCodeResult
    ) {
      //jika nilainya true && nilai sebelumnya tidak sama dengan yang baru
      if (checkStatusCodeResult.status_code === '201') {
        //Jalankan Action untuk hapus data keranjang dan masukkan data ke data pesanan
        this.props.dispatch(updatePesanan(this.props.route.params.data));
      }
    }
    if (
      updatePesananResult &&
      prevProps.updatePesananResult !== updatePesananResult
    ) {
      //jika nilainya true && nilai sebelumnya tidak sama dengan yang baru
      this.props.dispatch(
        getListHistory(this.props.route.params.data.user.uid),
      );
    }
  }

  checkBackButton = () => {
    const {backButton} = this.state;
    if (backButton === 'Orders') {
      this.props.navigation.navigate('Orders');
      this.props.dispatch(clearStatusCode());
    } else {
      this.props.navigation.navigate('Checkout');
    }
  };

  handleRefresh = () => {
    this.setState({refreshing: true});

    // Refresh URL halaman dalam komponen WebView
    this.webViewRef.current.reload();

    // Setelah tindakan refresh selesai, set state refreshing menjadi false.
    this.setState({refreshing: false});
  };

  render() {
    const {url} = this.state;
    const {navigation, updatePesananLoading} = this.props;
    return (
      <View style={styles.page}>
        {this.props.route.params.page === 'Checkout' ? (
          <Header
            noMargin="true"
            title="Pembayaran"
            goBack={() => this.checkBackButton()}
          />
        ) : (
          <Header
            title="Pembayaran"
            goBack={() => navigation.navigate('DetailPesanan')}
          />
        )}
        {updatePesananLoading ? (
          <Loading />
        ) : (
          <View style={{flex: 1}}>
            <ScrollView
              contentContainerStyle={{flexGrow: 1}}
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this.handleRefresh}
                  colors={[colors.primary]}
                />
              }>
              <WebView
                ref={this.webViewRef}
                source={{uri: url}}
                originWhitelist={['http://*', 'https://*', 'intent://*']}
                onShouldStartLoadWithRequest={request => {
                  let url = request.url;
                  if (url) {
                    Linking.openURL(url).catch(error => {
                      Alert.alert('Error', error.message);
                    });
                    return false;
                  } else {
                    return true;
                  }
                }}
              />
            </ScrollView>
          </View>
        )}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  updatePesananLoading: state.PesananReducer.updatePesananLoading,
  updatePesananResult: state.PesananReducer.updatePesananResult,
  updatePesananError: state.PesananReducer.updatePesananError,

  checkStatusCodeLoading: state.PaymentReducer.checkStatusCodeLoading,
  checkStatusCodeResult: state.PaymentReducer.checkStatusCodeResult,
  checkStatusCodeError: state.PaymentReducer.checkStatusCodeError,
});

export default connect(mapStateToProps, null)(Midtrans);

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  qris: {
    height: responsiveHeight(60),
    width: '100%',
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#F2F2F2',
  },
});
