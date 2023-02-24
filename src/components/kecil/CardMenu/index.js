import { StyleSheet, Text, TouchableOpacity, View, Linking, Alert } from 'react-native'
import React from 'react'
import { IconArrowRight } from '../../../assets'
import { clearData, colors, fonts, responsiveHeight, responsiveWidth } from '../../../utils'
import { RFValue } from 'react-native-responsive-fontsize'
import { heightMobileUI } from '../../../utils/constant'
import {signOut} from 'firebase/auth';
import { auth } from '../../../config/FIREBASE';

const CardMenu = ({pilihan, admin, navigation}) => {

  const onSubmit = () => {
    if(pilihan.halaman === "Login") {
      signOut(auth)
        .then(() => {
          // Sign-out successful.
          clearData();
          navigation.replace('Login');
        })
        .catch(error => {
          // An error happened.
          Alert.alert('Error', error.message);
        });
  }else {
    navigation.navigate(pilihan.halaman)
  }
}

  if (pilihan.nama == "Kontak Kami") {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        Linking.openURL(
          admin.nomerHp ? 'https://wa.me/' + admin.nomerHp : 'https://wa.me/',
        )
      }>
      <View style={styles.menu}>
        {pilihan.gambar}
        <Text style={styles.text}>{pilihan.nama}</Text>
      </View>
      <IconArrowRight />
    </TouchableOpacity>
  );
  }
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onSubmit()}>
      <View style={styles.menu}>
        {pilihan.gambar}
        <Text style={styles.text}>{pilihan.nama}</Text>
      </View>
      <IconArrowRight />
    </TouchableOpacity>
  );
}

export default CardMenu

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: responsiveHeight(15),
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    borderColor: colors.primary,
    borderWidth: 2,
    borderRadius: 10,
    marginHorizontal: responsiveWidth(40),
    padding: responsiveHeight(10),
    alignItems: 'center',
  },
  menu: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: RFValue(18, heightMobileUI),
    fontFamily: fonts.primary.bold,
    marginLeft: 20,
    color: 'black'
  },
});