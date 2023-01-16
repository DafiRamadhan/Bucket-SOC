import {BackHandler, StyleSheet, Text, View} from 'react-native';
import React, {Component} from 'react';
import WebView from 'react-native-webview';
import {Header, Loading} from '../../components';
import {connect} from 'react-redux';
import {updatePesanan} from '../../actions/PesananAction';

class Midtrans extends Component {
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
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

  render() {
    const {navigation, updatePesananLoading} = this.props;
    return (
      <View style={styles.page}>
        {this.props.route.params.page === 'Checkout' ? (
          <Header
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
          <WebView source={{uri: this.props.route.params.data.url_midtrans}} />
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
});
