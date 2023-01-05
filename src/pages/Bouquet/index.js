import {StyleSheet, View, Text, ScrollView} from 'react-native';
import React, {Component} from 'react';
import {HeaderComponent, ListKategori2, ListProduk} from '../../components';
import {colors, fonts, responsiveHeight, responsiveWidth} from '../../utils';
import {RFValue} from 'react-native-responsive-fontsize';
import {heightMobileUI} from '../../utils/constant';
import {connect} from 'react-redux';
import {getListKategori} from '../../actions/KategoriAction';
import {getListProduk} from '../../actions/ProdukAction';

class Bouquet extends Component {
  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      const {idKategori} = this.props;
      this.props.dispatch(getListKategori());
      this.props.dispatch(getListProduk(idKategori));
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  //Ketika suatu komponen terdapat perubahan
  componentDidUpdate(prevProps) {
    const {idKategori} = this.props; //dari false menjadi data
    if (
      idKategori &&
      prevProps.idKategori !== idKategori
    ) {
      //jika nilainya true && nilai sebelumnya tidak sama dengan yang baru
      this.props.dispatch(getListProduk(idKategori));
    }
  }

  render() {
    const {navigation, namaKategori} = this.props;
    return (
      <View style={styles.page}>
        <View style={styles.wrapTitle}>
          <Text style={styles.titleText}>Katalog Buket</Text>
        </View>
        <HeaderComponent navigation={navigation} />
        <View style={styles.pilihKategori}>
          <ListKategori2 navigation={navigation} />
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          <View style={styles.body}>
            <View style={styles.pilihBuket}>
              <Text style={styles.label}>Pilih Buket Favorit Anda</Text>
              <Text style={styles.label}>{namaKategori}</Text>
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
