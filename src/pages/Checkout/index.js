import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
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
import {custom_bulan, custom_hari, heightMobileUI} from '../../utils/constant';
import {RFValue} from 'react-native-responsive-fontsize';
import {
  CardAlamat,
  Header,
  Jarak,
  Loading,
  Pilihan,
  PilihTanggal,
} from '../../components/kecil';
import {connect} from 'react-redux';
import {postOngkir} from '../../actions/BiteshipAction';
import {snapTransaction} from '../../actions/PaymentAction';
import {updatePesanan} from '../../actions/PesananAction';

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: false,
      ekspedisi: [
        'GoSend Instant (Pembayaran Online)',
        'GrabExpress Instant (Pembayaran Online)',
        'Ambil di Toko (Pembayaran Online)',
        'Ambil di Toko (Pembayaran di Tempat)',
      ],
      selectedEkspedisi: false,
      pilihTanggal: false,
      pilihWaktu: false,
      total_harga: this.props.route.params.total_harga,
      order_id: false,
      tanggal_pemesanan: false,
      itemList: false,
      dataCheckout: false,
    };
  }

  //Dijalankan ketika komponen/halaman pertama kali di buka / di load
  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.getUserData();
    });
    this.props.getOngkirResult = 0;
  }

  //Ketika suatu komponen terdapat perubahan
  componentDidUpdate(prevProps) {
    const {snapTransactionResult, updatePesananResult} = this.props;
    //Jika ada URL Midtrans, maka akan masuk halaman Midtrans
    if (
      snapTransactionResult &&
      prevProps.snapTransactionResult !== snapTransactionResult
    ) {
      //jika nilainya true && nilai sebelumnya tidak sama dengan yang baru
      const data = {
        url_midtrans: snapTransactionResult.redirect_url,
        ...this.state.dataCheckout,
      };
      this.props.navigation.navigate('Midtrans', data);
      //Jika tidak ada url Midtrans, maka akan langsung ke halaman DetailPesanan
    } else if (
      updatePesananResult &&
      prevProps.updatePesananResult !== updatePesananResult &&
      !updatePesananResult.pesanan.url_midtrans
    ) {
      //jika nilainya true && nilai sebelumnya tidak sama dengan yang baru && tidak ada URL Midtrans
      this.props.navigation.navigate('DetailPesanan', updatePesananResult);
    }
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
    //itemList adalah data2 yang diperlukan untuk Midtrans dan Biteship API
    let itemList = [];
    Object.keys(getListKeranjangResult.item).forEach(key => {
      itemList.push({
        name: getListKeranjangResult.item[key].produk.nama,
        description: getListKeranjangResult.item[key].catatan,
        value: getListKeranjangResult.item[key].produk.harga,
        price: getListKeranjangResult.item[key].produk.harga,
        quantity: getListKeranjangResult.item[key].jumlah,
      });
    });

    this.setState({
      itemList: itemList,
      selectedEkspedisi: selectedEkspedisi,
    });

    const nowDate = new Date();
    const year = nowDate.getFullYear();
    //+1 karena array dimulai dari 0 bukan 1 untuk bulan ke-
    const month = String(nowDate.getMonth() + 1).padStart(2, '0');
    const date = String(nowDate.getDate()).padStart(2, '0');
    //Nozero menjadikan tanpa 0 jika hanya 1 karakter
    const monthNoZero = nowDate.getMonth();
    const dateNoZero = nowDate.getDate();
    const day = nowDate.getDay();
    //Padstart membuat string menjadi dua karakter, jika hanya 1 maka menambahkan 0 didepannya
    const hour = String(nowDate.getHours()).padStart(2, '0');
    const minute = String(nowDate.getMinutes()).padStart(2, '0');
    const second = String(nowDate.getSeconds()).padStart(2, '0');

    const firstOrderid =
      'D' + date + month + year + 'T' + hour + minute + second;
    const fullDate =
      custom_hari[day] +
      ', ' +
      dateNoZero +
      ' ' +
      custom_bulan[monthNoZero] +
      ' ' +
      year +
      ' ' +
      hour +
      '.' +
      minute;

    if (
      selectedEkspedisi === 'GoSend Instant (Pembayaran Online)' ||
      selectedEkspedisi === 'GrabExpress Instant (Pembayaran Online)'
    ) {
      const data = JSON.stringify({
        origin_latitude: -7.548838191314486,
        origin_longitude: 110.83182951593932,
        destination_latitude: profile.latitude,
        destination_longitude: profile.longitude,
        couriers:
          selectedEkspedisi === 'GoSend Instant (Pembayaran Online)'
            ? 'gojek'
            : 'grab',
        items: itemList,
      });
      this.setState({
        order_id: firstOrderid + 'A',
        tanggal_pemesanan: fullDate,
      });
      dispatch(postOngkir(data));
    } else if (selectedEkspedisi === 'Ambil di Toko (Pembayaran Online)') {
      this.props.getOngkirResult = 0;
      this.setState({
        order_id: firstOrderid + 'B',
        tanggal_pemesanan: fullDate,
      });
    } else if (selectedEkspedisi === 'Ambil di Toko (Pembayaran di Tempat)') {
      this.props.getOngkirResult = 0;
      this.setState({
        order_id: firstOrderid + 'C',
        tanggal_pemesanan: fullDate,
      });
    } else {
      this.props.getOngkirResult = 0;
    }
  };

  onSubmit = () => {
    const {
      profile,
      selectedEkspedisi,
      total_harga,
      pilihTanggal,
      pilihWaktu,
      order_id,
      tanggal_pemesanan,
      itemList,
    } = this.state;
    const {dispatch, getOngkirResult, getListKeranjangResult} = this.props;
    const ongkir = getOngkirResult
      ? getOngkirResult + total_harga * (0.5 / 100)
      : 0;
    let ongkirList = [
      {
        price: ongkir,
        quantity: 1,
        name: 'Ongkos Kirim',
      },
    ];
    //Menggabungkan array itemList dan ongkirList ke dalam 1 array
    let dataItem = getOngkirResult ? itemList.concat(ongkirList) : itemList;

    //Untuk disimpan ke Firebase
    const dataCheckout = {
      order_id: order_id,
      tanggal_pemesanan: tanggal_pemesanan,
      tanggal_pengiriman: pilihTanggal + ' ' + pilihWaktu,
      metode_pengiriman: selectedEkspedisi,
      total_harga_barang: total_harga,
      total_ongkir: ongkir,
      total_tagihan: parseInt(total_harga + ongkir),
      item: getListKeranjangResult.item,
      user: profile,
    };

    this.setState({
      dataCheckout: dataCheckout,
    });

    //Untuk Midtrans SNAP API
    const dataMidtrans = {
      transaction_details: {
        order_id: order_id,
        gross_amount: parseInt(total_harga + ongkir),
      },
      credit_card: {
        secure: true,
      },
      item_details: dataItem,
      customer_details: {
        first_name: profile.nama,
        email: profile.email,
        phone: profile.nomerHp,
        address:
          profile.alamat + '. ' + 'Detail Alamat : ' + profile.detail_alamat,
        shipping_address: {
          first_name: profile.nama,
          email: profile.email,
          phone: profile.nomerHp,
          address:
            profile.alamat + '. ' + 'Detail Alamat : ' + profile.detail_alamat,
        },
      },
    };

    //Jika seluruh input sudah diisi
    if (selectedEkspedisi && pilihTanggal && pilihWaktu) {
      //Pengondisian sesuai metode pengiriman yang dipilih
      if (
        selectedEkspedisi === 'GoSend Instant (Pembayaran Online)' ||
        selectedEkspedisi === 'GrabExpress Instant (Pembayaran Online)'
      ) {
        //Ke Midtrans Action
        dispatch(snapTransaction(dataMidtrans));
      } else if (selectedEkspedisi === 'Ambil di Toko (Pembayaran Online)') {
        //Ke Midtrans Action
        dispatch(snapTransaction(dataMidtrans));
      } else if (selectedEkspedisi === 'Ambil di Toko (Pembayaran di Tempat)') {
        //Ke Pesanan Action
        dispatch(updatePesanan(dataCheckout));
      }
    } else {
      Alert.alert(
        'Error',
        'Metode Pengiriman dan Tanggal Pengiriman / Pengambilan harus dipilih!',
      );
    }
  };

  render() {
    const {profile, ekspedisi, selectedEkspedisi, total_harga} = this.state;
    const {
      navigation,
      getOngkirResult,
      snapTransactionLoading,
      getOngkirLoading,
      updatePesananLoading,
    } = this.props;
    //harga ongkir + asuransi (0,5% dari harga barang)
    const ongkir = getOngkirResult
      ? getOngkirResult + total_harga * (0.5 / 100)
      : 0;
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
              label="Pilih Metode Pengiriman / Pengambilan"
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
                <Text style={styles.totalText}>Ongkos Kirim</Text>
                {getOngkirResult ? (
                  <Text style={styles.totalText}>
                    Rp
                    {getOngkirResult.toLocaleString('id-ID')}
                  </Text>
                ) : getOngkirLoading ? (
                  <Text style={styles.totalText}>Menghitung...</Text>
                ) : (
                  <Text style={styles.totalText}>Rp0</Text>
                )}
              </View>
              <>
                {getOngkirResult ? (
                  <View style={styles.totalHarga}>
                    <Text style={styles.totalText}>Asuransi Pengiriman (wajib)</Text>
                    <Text style={styles.totalText}>
                      Rp
                      {(total_harga * (0.5 / 100)).toLocaleString('id-ID')}
                    </Text>
                  </View>
                ) : getOngkirLoading ? null : null}
              </>
              <View style={styles.totalHarga}>
                <Text style={styles.tagihan}>Total Pesanan</Text>
                <Text style={styles.tagihan}>
                  Rp
                  {(total_harga + ongkir).toLocaleString('id-ID')}
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
        <DropShadow style={dropshadow.footer}>
          <View style={styles.footer}>
            <View style={styles.totalTagihan}>
              <Text style={styles.tagihanText}>Total Pesanan :</Text>
              <Text style={styles.hargaText}>
                Rp{(total_harga + ongkir).toLocaleString('id-ID')}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.tombolBayar}
              disabled={getOngkirLoading ? true : false}
              onPress={() => this.onSubmit()}>
              <IconWallet />
              <Text style={styles.bayarText}>Bayar</Text>
            </TouchableOpacity>
          </View>
        </DropShadow>
        {snapTransactionLoading || updatePesananLoading ? <Loading /> : null}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  getOngkirLoading: state.BiteshipReducer.getOngkirLoading,
  getOngkirResult: state.BiteshipReducer.getOngkirResult,

  getListKeranjangResult: state.KeranjangReducer.getListKeranjangResult,

  snapTransactionLoading: state.PaymentReducer.snapTransactionLoading,
  snapTransactionResult: state.PaymentReducer.snapTransactionResult,

  updatePesananLoading: state.PesananReducer.updatePesananLoading,
  updatePesananResult: state.PesananReducer.updatePesananResult,
  updatePesananError: state.PesananReducer.updatePesananError,
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
