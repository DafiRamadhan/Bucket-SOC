import {StyleSheet, View, Text, ScrollView} from 'react-native';
import React, {Component} from 'react';
import {HeaderComponent, ListBuket, ListKategori2} from '../../components';
import {colors, fonts, responsiveHeight, responsiveWidth} from '../../utils';
import {dummyBuket, dummyKategori} from '../../data';
import {RFValue} from 'react-native-responsive-fontsize';
import {heightMobileUI} from '../../utils/constant';

export default class Bouquet extends Component {
  //konstanta untuk mengambil data dari JSON
  constructor(props) {
    super(props);

    //state akan dioper ke ListKategori
    this.state = {
      kategori: dummyKategori,
      buket: dummyBuket,
    };
  }

  render() {
    //membuat konstanta 'pilihKategori' dan 'pilihBuket'
    const {kategori, buket} = this.state;
    const {navigation} = this.props;
    return (
      <View style={styles.page}>
        <View style={styles.wrapTitle}>
          <Text style={styles.titleText}>Katalog Buket</Text>
        </View>
        <HeaderComponent navigation={navigation} />
        <View style={styles.pilihKategori}>
          <ListKategori2 pilihKategori={kategori} />
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.body}>
            <View style={styles.pilihBuket}>
              <Text style={styles.label}>Pilih Buket Favorit Anda</Text>
              <ListBuket pilihBuket={buket} navigation={navigation} />
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

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
    marginBottom: responsiveHeight(20),
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
