import {
  Alert,
  BackHandler,
  Linking,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {Component} from 'react';
import WebView from 'react-native-webview';
import {Header, Loading} from '../../components';
import {connect} from 'react-redux';
import {updatePesanan} from '../../actions/PesananAction';
import {colors, responsiveHeight} from '../../utils';
import {IconQRIS} from '../../assets';

class Midtrans extends Component {
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
      url: this.props.route.params.data.url_midtrans,
    };
  }

  componentDidMount() {
    const {dispatch} = this.props;
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
    if (this.props.route.params.data.order_id) {
      //Jika belum memiliki status pesanan (baru membuat pesanan di halaman checkout)
      if (!this.props.route.params.data.status_pesanan) {
        //Jalankan Action untuk hapus data keranjang dan masukkan data ke data pesanan
        dispatch(updatePesanan(this.props.route.params.data));
      }
    }
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  handleBackButtonClick() {
    if (this.props.route.params.page === 'Checkout') {
      this.props.navigation.navigate('Orders');
      return true;
    } else {
      this.props.navigation.navigate('DetailPesanan');
      return true;
    }
  }

  qris = ({url}) => {
    this.setState({
      url: url + '#/gopay-qris',
    });
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
            goBack={() => navigation.navigate('Orders')}
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
          <>
            <WebView
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
            {url.slice(-12) !== '#/gopay-qris' &&
            (!this.props.route.params.data.status_pesanan ||
              this.props.route.params.data.status_pesanan ===
                'Menunggu Pembayaran') ? (
              <TouchableOpacity
                style={styles.qris}
                onPress={() => this.qris({url})}>
                <IconQRIS />
              </TouchableOpacity>
            ) : null}
          </>
        )}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  updatePesananLoading: state.PesananReducer.updatePesananLoading,
  updatePesananResult: state.PesananReducer.updatePesananResult,
  updatePesananError: state.PesananReducer.updatePesananError,
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
