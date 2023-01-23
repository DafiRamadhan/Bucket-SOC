import {
  Text,
  StyleSheet,
  View,
  Alert,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {createInvoice} from '../../actions/InvoiceAction';
import Pdf from 'react-native-pdf';
import {ActivityIndicator} from 'react-native';
import {
  colors,
  dropshadow,
  fonts,
  heightMobileUI,
  responsiveHeight,
  responsiveWidth,
} from '../../utils';
import DropShadow from 'react-native-drop-shadow';
import {IconBack, IconDownload} from '../../assets';
import {RFValue} from 'react-native-responsive-fontsize';
import RNFetchBlob from 'rn-fetch-blob';

class Invoice extends Component {
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
      pesanan: this.props.route.params.pesanan,
      date: new Date().toLocaleString('id-ID'),
    };
  }
  componentDidMount() {
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
    const {pesanan, date} = this.state;
    const {dispatch} = this.props;
    let status_tagihan = '';
    let itemList = [];
    Object.keys(pesanan.item).forEach(key => {
      itemList.push({
        name: pesanan.item[key].produk.nama,
        quantity: pesanan.item[key].jumlah,
        unit_cost: pesanan.item[key].produk.harga,
        description: 'Catatan: ' + pesanan.item[key].catatan,
      });
    });
    if (pesanan.url_midtrans) {
      if (pesanan.status_pesanan === 'Menunggu Pembayaran') {
        status_tagihan = 'BELUM DIBAYAR';
      } else if (
        pesanan.status_pesanan === 'Selesai (Pembayaran Gagal)' ||
        pesanan.status_pesanan === 'Selesai (Dibatalkan Pembeli)' ||
        pesanan.status_pesanan === 'Selesai (Dibatalkan Penjual)'
      ) {
        status_tagihan = 'DIBATALKAN';
      } else {
        status_tagihan = 'LUNAS';
      }
    } else {
      if (
        pesanan.status_pesanan === 'Selesai (Dibatalkan Pembeli)' ||
        pesanan.status_pesanan === 'Selesai (Dibatalkan Penjual)'
      ) {
        status_tagihan = 'DIBATALKAN';
      } else if (
        pesanan.status_pesanan === 'Selesai (Pesanan Telah Diterima)'
      ) {
        status_tagihan = 'LUNAS';
      } else {
        status_tagihan = 'BELUM DIBAYAR';
      }
    }

    const data = {
      header: 'Invoice',
      to_title: 'Pelanggan',
      ship_to_title: 'Alamat',
      invoice_number_title: 'ORDER ID #',
      date_title: 'Tanggal Pemesanan',
      quantity_header: 'Jumlah',
      unit_cost_header: 'Harga Satuan',
      amount_header: 'Total Harga',
      shipping_title: 'Total Ongkos Kirim',
      subtotal_title: 'Total Harga Barang',
      total_title: 'Total Pesanan',
      balance_title: 'Total Tagihan',
      notes_title: 'Catatan',
      terms_title: 'Diperbarui pada',
      logo: 'https://i.ibb.co/f0rbMfm/Rounded-Logo-Copy.png',
      number: pesanan.order_id,
      from: 'BUCKET SOC',
      to: pesanan.user.nama + ' (' + pesanan.user.nomerHp + ')',
      ship_to:
        pesanan.user.alamat + '. Detail Alamat: ' + pesanan.user.detail_alamat,
      currency: 'IDR',
      date: pesanan.tanggal_pemesanan,
      items: itemList,
      shipping: pesanan.total_ongkir,
      notes:
        'Invoice ini dibuat otomatis oleh sistem. Terimakasih atas pesanan Anda!',
      terms: date,
      custom_fields: [
        {
          name:
            pesanan.order_id.slice(-1) === 'A'
              ? 'Tanggal Permintaan Pengiriman'
              : 'Tanggal Permintaan Pengambilan',
          value: pesanan.tanggal_pengiriman,
        },
        {
          name: 'Metode Pengiriman dan Pembayaran',
          value: pesanan.metode_pengiriman,
        },
        {
          name: 'Status Tagihan',
          value: status_tagihan,
        },
      ],
    };
    dispatch(createInvoice(data));
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  handleBackButtonClick() {
    this.props.navigation.navigate('DetailPesanan');
    return true;
  }

  Download = () => {
    const {pesanan, date} = this.state;
    const {createInvoiceResult} = this.props;
    const newDate = date.replace(/\//g, '-');
    const DownloadDir = RNFetchBlob.fs.dirs.DownloadDir;
    let fileName = 'Invoice Bucket SOC #' + pesanan.order_id + ' ' + newDate + '.pdf';
    let pdfLocation = DownloadDir + '/' + fileName;
    let data = createInvoiceResult.substr(createInvoiceResult.indexOf(',') + 1);
    RNFetchBlob.fs.writeFile(pdfLocation, data, 'base64')
    .then(() => {
      RNFetchBlob.android.addCompleteDownload({
        title: fileName,
        description: 'Download Selesai',
        mime: 'application/pdf',
        path: pdfLocation,
        showNotification: true,
      });
      Alert.alert('Suskes', 'Invoice telah diunduh!');
    })
    .catch(error => {
      Alert.alert('Error', error.message)
    })
  };

  render() {
    const {createInvoiceResult, navigation} = this.props;
    const source = {
      uri: createInvoiceResult ? createInvoiceResult : null,
    };
    return (
      <View style={styles.page}>
        <DropShadow style={dropshadow.footer}>
          <TouchableOpacity
            style={styles.tombolBack}
            onPress={() => navigation.goBack()}>
            <IconBack />
          </TouchableOpacity>
          <View style={styles.header}>
            <Text style={styles.titleText}>Invoice Pembelian</Text>
          </View>
          {createInvoiceResult ? (
            <TouchableOpacity
              style={styles.tombolDownload}
              onPress={() => this.Download()}>
              <IconDownload />
            </TouchableOpacity>
          ) : null}
        </DropShadow>
        {createInvoiceResult ? (
          <Pdf
            trustAllCerts={false}
            source={source}
            onError={error => {
              Alert.alert('Error', error.message);
            }}
            style={styles.pdf}
          />
        ) : (
          <View style={styles.blank}>
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        )}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  createInvoiceLoading: state.InvoiceReducer.createInvoiceLoading,
  createInvoiceResult: state.InvoiceReducer.createInvoiceResult,
  createInvoiceError: state.InvoiceReducer.createInvoiceError,
});

export default connect(mapStateToProps, null)(Invoice);

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.white,
  },
  blank: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'center',
  },
  pdf: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.line,
  },
  tombolBack: {
    position: 'absolute',
    marginTop: 12,
    marginLeft: 10,
    zIndex: 1,
    padding: 5,
  },
  tombolDownload: {
    position: 'absolute',
    right: 0,
    marginTop: 14,
    marginRight: 13,
    zIndex: 1,
    padding: 5,
  },
  header: {
    height: responsiveHeight(70),
    width: '100%',
    backgroundColor: colors.white,
    paddingHorizontal: responsiveWidth(13),
    marginBottom: responsiveWidth(3),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  titleText: {
    color: colors.black,
    fontFamily: fonts.primary.medium,
    fontSize: RFValue(20, heightMobileUI),
  },
});
