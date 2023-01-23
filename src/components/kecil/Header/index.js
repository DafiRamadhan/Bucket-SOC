import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import React from 'react';
import DropShadow from 'react-native-drop-shadow';
import {
  colors,
  dropshadow,
  fonts,
  responsiveHeight,
  responsiveWidth,
} from '../../../utils';
import {IconBack} from '../../../assets';
import {RFValue} from 'react-native-responsive-fontsize';
import {heightMobileUI} from '../../../utils/constant';
import {useNavigation} from '@react-navigation/native';

const Header = ({goBack, title}) => {
  const navigation = useNavigation();
  return (
    <View>
      <DropShadow style={dropshadow.footer}>
        <TouchableOpacity
          style={styles.tombolBack}
          onPress={goBack}>
          <IconBack />
        </TouchableOpacity>
        <View style={styles.header(title)}>
          <Text style={styles.titleText}>{title}</Text>
        </View>
      </DropShadow>
    </View>
  );
};
export default Header;

const styles = StyleSheet.create({
  tombolBack: {
    position: 'absolute',
    marginTop: responsiveHeight(12),
    marginLeft: responsiveWidth(10),
    zIndex: 1,
    padding: 5,
  },
  header: (title) => ({
    height: responsiveHeight(70),
    width: '100%',
    backgroundColor: colors.white,
    paddingHorizontal: responsiveWidth(13),
    marginBottom: title==='Pembayaran' || title==='Detail Pesanan'  ? 0 : responsiveWidth(5),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  }),
  titleText: {
    color: colors.black,
    fontFamily: fonts.primary.medium,
    fontSize: RFValue(20, heightMobileUI),
  },
});
