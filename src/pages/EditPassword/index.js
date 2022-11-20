import {Text, StyleSheet, View, TouchableOpacity, TextInput} from 'react-native';
import React, {Component} from 'react';
import {colors, fonts, responsiveHeight, responsiveWidth} from '../../utils';
import {RFValue} from 'react-native-responsive-fontsize';
import {heightMobileUI} from '../../utils/constant';
import {Header, Inputan} from '../../components';
import { IconBack, IconCart } from '../../assets';

export default class EditProfile extends Component {
  render() {
    const {navigation} = this.props;
    return (
      <View style={styles.pages}>
        <Header
          title="Edit Password"
          goBack={() => navigation.navigate('Profile')}
        />
        <View style={styles.container}>
          <View>
            <Inputan
              password
              label="Password Lama"
            />
            <Inputan
              password
              label="Password Baru"
            />
            <Inputan
              password
              label="Konfirmasi Password Baru"
            />
          </View>
          <View>
            <TouchableOpacity style={styles.simpan}>
              <Text style={styles.simpanText}>Simpan</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  pages: {
    flex: 1,
    backgroundColor: colors.white,
  },
  container: {
    marginHorizontal: responsiveWidth(25),
    flex: 1,
    justifyContent: 'space-between',
  },
  simpan: {
    height: responsiveHeight(54),
    width: '100%',
    backgroundColor: colors.primary,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: responsiveHeight(40),
  },
  simpanText: {
    color: colors.white,
    fontFamily: fonts.primary.bold,
    fontSize: RFValue(20, heightMobileUI),
  },
});
