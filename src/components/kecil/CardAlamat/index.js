import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import { colors, fonts, responsiveHeight } from '../../../utils';
import { RFValue } from 'react-native-responsive-fontsize';
import { heightMobileUI } from '../../../utils/constant';
import { useNavigation } from '@react-navigation/native';

const CardAlamat = ({profile}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titleText}>Alamat Pengiriman :</Text>
        <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
          <Text style={styles.ubahText}>Ubah Alamat</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text style={styles.nama} numberOfLines={2}>
          {profile.nama} ({profile.nomerHp})
        </Text>
        <Text style={styles.alamat} numberOfLines={3}>
          {profile.alamat}.
        </Text>
        <Text numberOfLines={3} style={styles.alamat}>
          Detail Alamat : {profile.detail_alamat}
        </Text>
      </View>
    </View>
  );
};

export default CardAlamat;

const styles = StyleSheet.create({
  container: {
    marginTop: responsiveHeight(17),
    marginBottom: responsiveHeight(17),
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 7,
  },
  titleText: {
    fontFamily: fonts.primary.semibold,
    fontSize: RFValue(18, heightMobileUI),
    color: colors.black,
  },
  ubahText: {
    fontFamily: fonts.primary.bold,
    fontSize: RFValue(18, heightMobileUI),
    color: colors.primary,
  },
  nama: {
    fontFamily: fonts.primary.semibold,
    fontSize: RFValue(14, heightMobileUI),
    color: colors.black,
  },
  alamat: {
    fontFamily: fonts.primary.regular,
    fontSize: RFValue(14, heightMobileUI),
    color: colors.black,
    textAlign: 'justify',
  },
});
