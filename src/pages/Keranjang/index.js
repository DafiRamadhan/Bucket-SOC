import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React, {Component} from 'react';
import {ListKeranjang} from '../../components';
import {
  colors,
  dropshadow,
  fonts,
  getData,
  responsiveHeight,
  responsiveWidth,
} from '../../utils';
import DropShadow from 'react-native-drop-shadow';
import {EmptyCart, IconBack, IconCheckout} from '../../assets';
import {RFValue} from 'react-native-responsive-fontsize';
import {heightMobileUI} from '../../utils/constant';
import {connect} from 'react-redux';
import {getListKeranjang, updateKeranjang} from '../../actions/KeranjangAction';
import {getListProduk} from '../../actions/ProdukAction';
import { RefreshControl } from 'react-native';

class Keranjang extends Component {
  constructor(props) {
    super(props);

    this.state = {
      profile: false,
      refreshing: false,
    };
  }

  componentDidMount() {
    this.loadData();
  }

  loadData = () => {
    const {dispatch, navigation} = this.props;
    getData('user').then(res => {
      //cek apakah user sudah Login
      if (res) {
        this.setState({
          profile: res,
        });
        dispatch(getListProduk());
      } else {
        navigation.replace('Login');
      }
    });
  };

  //Ketika suatu komponen terdapat perubahan
  componentDidUpdate(prevProps) {
    const {
      deleteKeranjangResult,
      updateKeranjangResult,
      getListProdukResult,
      dispatch,
    } = this.props;

    if (
      getListProdukResult &&
      prevProps.getListProdukResult !== getListProdukResult
    ) {
      //jika nilainya true && nilai sebelumnya tidak sama dengan yang baru
      let produkList = [];
      Object.keys(getListProdukResult).forEach(key => {
        produkList.push({
          key: key,
          produk: getListProdukResult[key],
        });
      });
      //masuk dispatch updateKeranjang untuk cek status terbaru sesuai produk
      dispatch(updateKeranjang(this.state.profile.uid, produkList));
    }

    if (
      updateKeranjangResult &&
      prevProps.updateKeranjangResult !== updateKeranjangResult
    ) {
      //jika nilainya true && nilai sebelumnya tidak sama dengan yang baru
      dispatch(getListKeranjang(this.state.profile.uid));
    }

    if (
      deleteKeranjangResult &&
      prevProps.deleteKeranjangResult !== deleteKeranjangResult
    ) {
      //jika nilainya true && nilai sebelumnya tidak sama dengan yang baru
      dispatch(getListKeranjang(this.state.profile.uid));
    }
  }

  handleRefresh = () => {
    this.setState({refreshing: true});
    // Setelah tindakan refresh selesai, set state refreshing menjadi false.
    // Ini akan memicu pemanggilan loadData untuk menjalankan ulang tindakan saat komponen dimuat ulang.
    this.setState({refreshing: false});
    this.loadData();
  };

  render() {
    const {profile} = this.state;
    const {
      navigation,
      getListKeranjangLoading,
      getListKeranjangResult,
      getListProdukLoading,
      getListProdukResult,
    } = this.props;
    let total_harga = 0;
    let produkList = [];
    if (getListKeranjangResult && getListProdukResult) {
      Object.keys(getListProdukResult).forEach(key => {
        produkList.push({
          key: key,
          produk: getListProdukResult[key],
        });
      });
      Object.keys(getListKeranjangResult.item).forEach(key => {
        let harga = produkList.find(
          x => x.key === getListKeranjangResult.item[key].produk,
        )
          ? produkList.find(
              x => x.key === getListKeranjangResult.item[key].produk,
            ).produk.harga * getListKeranjangResult.item[key].jumlah
          : 0;
        total_harga += harga;
      });
    }
    return (
      <View style={styles.page}>
        <DropShadow style={dropshadow.footer}>
          <TouchableOpacity
            style={styles.tombolBack}
            onPress={() => navigation.goBack()}>
            <IconBack />
          </TouchableOpacity>
          <View style={styles.header}>
            <Text style={styles.titleText}>Keranjang</Text>
          </View>
        </DropShadow>
        {!profile || getListKeranjangLoading || getListProdukLoading ? (
          <View style={styles.blank}>
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        ) : getListKeranjangResult && getListProdukResult ? (
          <View style={styles.page}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{flexGrow: 1}}
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this.handleRefresh}
                  colors={[colors.primary]}
                />
              }>
              {/* Mengirim isi state dari mapStateToProps */}
              <ListKeranjang {...this.props} produkList={produkList} />
            </ScrollView>
            <DropShadow style={dropshadow.footer}>
              <View style={styles.footer}>
                <View style={styles.totalHarga}>
                  <Text style={styles.totalText}>Total Harga :</Text>
                  <Text style={styles.hargaText}>
                    Rp{total_harga.toLocaleString('id-ID')}
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.tombolCheckout}
                  onPress={() =>
                    navigation.navigate('Checkout', {total_harga, produkList})
                  }>
                  <IconCheckout />
                  <Text style={styles.checkoutText}>Checkout</Text>
                </TouchableOpacity>
              </View>
            </DropShadow>
          </View>
        ) : (
          <View>
            <View style={styles.emptyImage}>
              <EmptyCart />
            </View>
            <Text style={styles.emptyText}>
              Keranjang belanja Anda masih kosong.
            </Text>
          </View>
        )}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  getListKeranjangLoading: state.KeranjangReducer.getListKeranjangLoading,
  getListKeranjangResult: state.KeranjangReducer.getListKeranjangResult,
  getListKeranjangError: state.KeranjangReducer.getListKeranjangError,

  deleteKeranjangLoading: state.KeranjangReducer.deleteKeranjangLoading,
  deleteKeranjangResult: state.KeranjangReducer.deleteKeranjangResult,
  deleteKeranjangError: state.KeranjangReducer.deleteKeranjangError,

  getListProdukLoading: state.ProdukReducer.getListProdukLoading,
  getListProdukResult: state.ProdukReducer.getListProdukResult,
  getListProdukError: state.ProdukReducer.getListProdukError,

  updateKeranjangLoading: state.KeranjangReducer.updateKeranjangLoading,
  updateKeranjangResult: state.KeranjangReducer.updateKeranjangResult,
  updateKeranjangError: state.KeranjangReducer.updateKeranjangResult,
});

export default connect(mapStateToProps, null)(Keranjang);

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
  tombolBack: {
    position: 'absolute',
    marginTop: 12,
    marginLeft: 10,
    zIndex: 1,
    padding: 5,
  },
  header: {
    height: responsiveHeight(70),
    width: '100%',
    backgroundColor: colors.white,
    paddingHorizontal: responsiveWidth(13),
    marginBottom: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
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
  tombolCheckout: {
    backgroundColor: colors.primary,
    borderRadius: 5,
    width: responsiveWidth(165),
    height: responsiveHeight(54),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: responsiveWidth(16),
  },
  titleText: {
    color: colors.black,
    fontFamily: fonts.primary.medium,
    fontSize: RFValue(20, heightMobileUI),
  },
  checkoutText: {
    color: colors.white,
    fontFamily: fonts.primary.bold,
    fontSize: RFValue(18, heightMobileUI),
    paddingLeft: 10,
  },
  totalText: {
    color: colors.black,
    fontFamily: fonts.primary.regular,
    fontSize: RFValue(16, heightMobileUI),
  },
  hargaText: {
    color: colors.black,
    fontFamily: fonts.primary.bold,
    fontSize: RFValue(20, heightMobileUI),
  },
  emptyImage: {
    alignSelf: 'center',
    height: responsiveHeight(242),
    width: responsiveWidth(290),
    marginTop: responsiveHeight(190),
    marginBottom: responsiveHeight(35),
  },
  emptyText: {
    alignSelf: 'center',
    color: colors.black,
    fontFamily: fonts.primary.semibold,
    fontSize: RFValue(20, heightMobileUI),
  },
});
