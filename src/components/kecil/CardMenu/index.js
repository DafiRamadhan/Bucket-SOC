import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { IconArrowRight } from '../../../assets'
import { colors, fonts, responsiveHeight, responsiveWidth } from '../../../utils'
import { RFValue } from 'react-native-responsive-fontsize'
import { heightMobileUI } from '../../../utils/constant'

const CardMenu = ({pilihan}) => {
  return (
    <TouchableOpacity style={styles.container}>
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