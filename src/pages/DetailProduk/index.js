import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
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
import {IconAddCart, IconBack} from '../../assets';
import {RFValue} from 'react-native-responsive-fontsize';
import {heightMobileUI} from '../../utils/constant';
import Inputan from '../../components/kecil/Inputan';
import DropShadow from 'react-native-drop-shadow';
import Counter from 'react-native-counters';
import BuketSlider from '../../components/besar/BuketSlider';
import {connect} from 'react-redux';
import {getDetailKategori} from '../../actions/KategoriAction';
import {masukKeranjang} from '../../actions/KeranjangAction';
import {Loading} from '../../components';

class DetailProduk extends Component {
  constructor(props) {
    super(props);
    this.state = {
      produk: this.props.route.params.produk,
      value: 1,
      catatan: '',
      uid: '',
    };
  }

  //dijalankan untuk mendapatkan nama kategori dari masing2 produk
  componentDidMount() {
    const {produk} = this.state;
    const {dispatch} = this.props;
    dispatch(getDetailKategori(produk.kategori));
  }

  //Ketika suatu komponen terdapat perubahan
  componentDidUpdate(prevProps) {
    const {saveKeranjangResult, getDetailKategoriResult} = this.props;

    if (
      getDetailKategoriResult &&
      prevProps.getDetailKategoriResult !== getDetailKategoriResult
    ) {
      //jika nilainya true && nilai sebelumnya tidak sama dengan yang baru
      //Menambahkan parameter nama_kategori ke state produk
      const produk = {
        ...this.state.produk,
        nama_kategori: getDetailKategoriResult.nama,
      };
      this.setState({
        produk: produk,
      });
    }

    if (
      saveKeranjangResult &&
      prevProps.saveKeranjangResult !== saveKeranjangResult
    ) {
      //jika nilainya true && nilai sebelumnya tidak sama dengan yang baru
      this.props.navigation.navigate('Keranjang');
    }
  }

  masukKeranjang = () => {
    const {catatan} = this.state;
    const {navigation, dispatch, getDetailKategoriResult} = this.props;
    getData('user').then(res => {
      //jika data user ditemukan (user sudah Login)
      if (res) {
        //simpan uid di Local storage ke state
        this.setState({
          uid: res.uid,
        });

        //validasi form jika catatan sudah diisi
        if (catatan) {
          const data = {
            ...this.state,
          };
          //masuk ke KeranjangAction
          dispatch(masukKeranjang(data));
        } else {
          Alert.alert('Alert', 'Catatan harus diisi!');
        }
        //jika user belum Login
      } else {
        Alert.alert('Alert', 'Silakan Login Terlebih Dahulu!');
        navigation.replace('Login');
      }
    });
  };

  render() {
    const {navigation, getDetailKategoriResult, saveKeranjangLoading} =
      this.props;
    const {produk, catatan} = this.state;
    return (
      <View style={styles.page}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          <TouchableOpacity
            style={styles.tombolBack}
            onPress={() => navigation.goBack()}>
            <IconBack />
          </TouchableOpacity>
          <BuketSlider images={produk.gambar} />
          <View style={styles.container}>
            <View style={styles.desc}>
              <Text style={styles.harga}>
                Rp{produk.harga.toLocaleString('id-ID')}
              </Text>
              <Text style={styles.nama}>{produk.nama}</Text>
              <View style={styles.garis} />
              <Text style={styles.subtitle}>Deskripsi Produk : </Text>
              <Text style={styles.deskripsi}>{produk.deskripsi}</Text>
              <Text style={styles.subtitle}>
                Kategori Buket : {getDetailKategoriResult.nama}
              </Text>
              <Inputan
                label="Catatan"
                textarea
                labelfontSize={RFValue(18, heightMobileUI)}
                formfontSize={RFValue(14, heightMobileUI)}
                value={catatan}
                onChangeText={catatan => this.setState({catatan})}
                placeholder="Isi jika ingin melakukan kustomisasi terhadap pesanan Anda (jenis, warna, ucapan, dll) sesuai ketentuan pada deskripsi produk ini."
              />
            </View>
          </View>
        </ScrollView>
        <DropShadow style={dropshadow.footer}>
          <View style={styles.footer}>
            {produk.ready ? (
              <>
                <View style={styles.counter}>
                  <Counter
                    buttonStyle={styles.button}
                    buttonTextStyle={styles.buttonText}
                    countTextStyle={styles.countText}
                    start={1}
                    min={1}
                    max={20}
                    value={this.state.value}
                    onChange={value => this.setState({value})}
                  />
                </View>
                <TouchableOpacity
                  style={styles.tombolKeranjang}
                  onPress={() => this.masukKeranjang()}>
                  <IconAddCart />
                  <Text style={styles.keranjangText}>Keranjang</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Text style={styles.noReady}>
                  Mohon maaf, produk sedang tidak tersedia. Silakan hubungi
                  Admin untuk info lebih lanjut.
                </Text>
              </>
            )}
          </View>
        </DropShadow>
        {saveKeranjangLoading ? <Loading /> : null}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  getDetailKategoriResult: state.KategoriReducer.getDetailKategoriResult,

  saveKeranjangLoading: state.KeranjangReducer.saveKeranjangLoading,
  saveKeranjangResult: state.KeranjangReducer.saveKeranjangResult,
  saveKeranjangError: state.KeranjangReducer.saveKeranjangError,
});

export default connect(mapStateToProps, null)(DetailProduk);

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#F6ECEA',
  },
  container: {
    backgroundColor: colors.white,
    width: '100%',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingBottom: responsiveHeight(40),
  },
  tombolBack: {
    marginTop: responsiveHeight(10),
    marginLeft: responsiveWidth(10),
    padding: 5,
  },
  desc: {
    marginHorizontal: responsiveWidth(25),
    marginTop: responsiveHeight(15),
  },
  harga: {
    fontSize: RFValue(22, heightMobileUI),
    fontFamily: fonts.primary.bold,
    color: colors.primary,
    marginBottom: 3,
  },
  nama: {
    fontSize: RFValue(20, heightMobileUI),
    fontFamily: fonts.primary.semibold,
    color: 'black',
    textAlign: 'justify',
    textTransform: 'capitalize',
  },
  garis: {
    height: 0.5,
    backgroundColor: colors.borderInput,
    marginTop: responsiveHeight(10),
  },
  subtitle: {
    fontSize: RFValue(18, heightMobileUI),
    fontFamily: fonts.primary.semibold,
    color: 'black',
    marginTop: responsiveHeight(20),
  },
  deskripsi: {
    fontSize: RFValue(14, heightMobileUI),
    fontFamily: fonts.primary.regular,
    color: colors.desc,
    marginTop: responsiveHeight(7),
    textAlign: 'justify',
  },
  noReady: {
    fontSize: RFValue(14, heightMobileUI),
    fontFamily: fonts.primary.regular,
    color: 'red',
    textAlign: 'center',
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
  counter: {
    borderColor: colors.borderInput,
    borderWidth: 1,
    borderRadius: 5,
    height: responsiveHeight(36),
  },
  button: {
    borderColor: colors.borderInput,
    borderWidth: 0,
  },
  buttonText: {
    color: colors.primary,
    fontFamily: fonts.primary.bold,
    fontSize: RFValue(22, heightMobileUI),
  },
  countText: {
    color: 'black',
    fontFamily: fonts.primary.semibold,
    fontSize: RFValue(16, heightMobileUI),
  },
  tombolKeranjang: {
    backgroundColor: colors.primary,
    borderRadius: 5,
    width: responsiveWidth(165),
    height: responsiveHeight(54),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: responsiveWidth(16),
  },
  keranjangText: {
    color: colors.white,
    fontFamily: fonts.primary.bold,
    fontSize: RFValue(18, heightMobileUI),
    paddingLeft: 10,
  },
});
