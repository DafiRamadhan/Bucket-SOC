import {StyleSheet, View, Text, ScrollView, RefreshControl} from 'react-native';
import React, {Component} from 'react';
import {HeaderComponent, ListKategori2, ListProduk} from '../../components';
import {colors, fonts, responsiveHeight, responsiveWidth} from '../../utils';
import {RFValue} from 'react-native-responsive-fontsize';
import {heightMobileUI} from '../../utils/constant';
import {connect} from 'react-redux';
import {getListKategori} from '../../actions/KategoriAction';
import {getListProduk} from '../../actions/ProdukAction';
import {LogBox} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
LogBox.ignoreAllLogs();

class Bouquet extends Component {
  constructor(props) {
    super(props);

    this.state = {
      refreshing: false,
    };
  }

  componentDidMount() {
    this.loadData();
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  loadData = () => {
    const {idKategori} = this.props;
    this.props.dispatch(getListKategori());
    this.props.dispatch(getListProduk(idKategori));
  };

  //Ketika suatu komponen terdapat perubahan
  componentDidUpdate(prevProps) {
    const {idKategori} = this.props;

    //jika nilai idKategori true && nilai sebelumnya tidak sama dengan yang baru
    if (idKategori && prevProps.idKategori !== idKategori) {
      //tampilkan produk By Kategori
      this.props.dispatch(getListProduk(idKategori));

      //jika nilai idKategori false && nilai sebelumnya tidak sama dengan yang baru
    } else if (idKategori === false && prevProps.idKategori !== idKategori) {
      //tampilkan semua produk
      this.props.dispatch(getListProduk());
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
    const {navigation, keyword, namaKategori} = this.props;
    return (
      <View style={styles.page}>
        <View style={styles.wrapTitle}>
          <Text style={styles.titleText}>Katalog Buket</Text>
        </View>
        <HeaderComponent navigation={navigation} page="Bouquet" />
        <View style={styles.pilihKategori}>
          <ListKategori2 navigation={navigation} />
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{flexGrow: 1}}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.handleRefresh}
              colors={[colors.primary]}
            />
          }>
          <View style={styles.body}>
            <View style={styles.pilihBuket}>
              {keyword ? (
                <Text style={styles.label}>
                  Menampilkan hasil untuk "{keyword}"
                </Text>
              ) : namaKategori ? (
                <Text style={styles.label}>
                  Menampilkan kategori "{namaKategori}"
                </Text>
              ) : (
                <Text style={styles.label}>Pilih Buket Favorit Anda</Text>
              )}
              <ListProduk navigation={navigation} />
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  idKategori: state.ProdukReducer.idKategori,
  namaKategori: state.ProdukReducer.namaKategori,
  keyword: state.ProdukReducer.keyword,

  getListProdukLoading: state.ProdukReducer.getListProdukLoading,
  getListProdukResult: state.ProdukReducer.getListProdukResult,
  getListProdukError: state.ProdukReducer.getListProdukError,

  getListKategoriLoading: state.KategoriReducer.getListKategoriLoading,
  getListKategoriResult: state.KategoriReducer.getListKategoriResult,
  getListKategoriError: state.KategoriReducer.getListKategoriError,
});

export default connect(mapStateToProps, null)(Bouquet);

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.white,
  },
  wrapTitle: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: responsiveHeight(20),
  },
  titleText: {
    fontSize: RFValue(20, heightMobileUI),
    fontFamily: fonts.primary.semibold,
    color: 'black',
  },
  body: {
    backgroundColor: 'white',
    paddingBottom: responsiveHeight(80),
  },
  pilihBuket: {
    marginBottom: responsiveHeight(20),
  },
  label: {
    fontSize: RFValue(18, heightMobileUI),
    fontFamily: fonts.primary.semibold,
    marginHorizontal: responsiveWidth(20),
    color: 'black',
  },
  containerTombol: {
    alignItems: 'center',
    marginBottom: responsiveHeight(20),
  },
});
