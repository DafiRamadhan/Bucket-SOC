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
    if (this.props.route.params.order_id) {
      //Jika belum memiliki status pesanan (baru membuat pesanan di halaman checkout)
      if (!this.props.route.params.status_pesanan) {
        //Jalankan Action untuk hapus data keranjang dan masukkan data ke data pesanan
        dispatch(updatePesanan(this.props.route.params));
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
    this.props.navigation.navigate('DetailPesanan', this.props.updatePesananResult);
    return true;
  }

  render() {
    const {navigation, updatePesananLoading} = this.props;
    return (
      <View style={styles.page}>
        <Header
          title="Pembayaran"
          goBack={() =>
            navigation.navigate('DetailPesanan', this.props.updatePesananResult)
          }
        />
        {updatePesananLoading ? (
          <Loading />
        ) : (
          <WebView source={{uri: this.props.route.params.url_midtrans}} />
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
