import {
  StyleSheet,
  View,
  Text,
  ScrollView,
} from 'react-native';
import React, {Component} from 'react';
import {
  HeaderComponent,
  ListBuket,
  ListKategori2,
} from '../../components';
import {colors, fonts, responsiveHeight, responsiveWidth} from '../../utils';
import {dummyBuket, dummyKategori} from '../../data';

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
        <HeaderComponent navigation={navigation} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.body}>
            <View style={styles.pilihKategori}>
              <ListKategori2 pilihKategori={kategori} />
            </View>
            <View style={styles.pilihBuket}>
              <Text style={styles.label}>Pilih Buket Yang Anda Inginkan</Text>
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
    backgroundColor: colors.primary,
  },
  body: {
    backgroundColor: 'white',
    paddingBottom: 80,
  },
  pilihKategori: {
    marginTop: 20,
  },
  pilihBuket: {
    marginTop: 10,
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontFamily: fonts.primary.regular,
    marginHorizontal: 20,
    color: 'black',
  },
  containerTombol: {
    alignItems: 'center',
    marginBottom: 20,
  },
  tombol: {
    backgroundColor: colors.primary,
    width: responsiveWidth(300),
    height: responsiveHeight(40),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  textTombol: {
    fontSize: 18,
    fontFamily: fonts.primary.bold,
    textAlign: 'center',
    marginHorizontal: 10,
    color: 'white',
  },
});
