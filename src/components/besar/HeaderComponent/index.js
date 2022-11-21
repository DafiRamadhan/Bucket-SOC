import {StyleSheet, View, TextInput} from 'react-native';
import React, {Component} from 'react';
import {fonts, responsiveHeight} from '../../../utils';
import {IconSearch} from '../../../assets';
import {KeranjangIcon} from '../../kecil';
import {RFValue} from 'react-native-responsive-fontsize';
import {heightMobileUI} from '../../../utils/constant';

export default class HeaderComponent extends Component {
  render() {
    const {navigation} = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.wrapperHeader}>
          {/* search bar */}
          <View style={styles.searchBar}>
            <IconSearch />
            <TextInput placeholder="Cari..." style={styles.input} />
          </View>
          {/* Tombol Keranjang */}
          <KeranjangIcon
            icon="keranjang2"
            totalKeranjang={5}
            onPress={() => navigation.navigate('Keranjang')}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: responsiveHeight(90),
  },
  wrapperHeader: {
    marginTop: responsiveHeight(20),
    marginLeft: responsiveHeight(20),
    marginRight: responsiveHeight(30),
    marginBottom: responsiveHeight(20),

    flexDirection: 'row',
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#EEEEEE',
    paddingLeft: 12,
    borderRadius: 40,
    alignItems: 'center',
  },
  input: {
    fontSize: RFValue(18, heightMobileUI),
    width: 260,
    fontFamily: fonts.primary.regular,
  },
});
