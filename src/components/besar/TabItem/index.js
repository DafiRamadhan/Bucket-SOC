import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react';
import {IconHome, IconHomeAktif, IconBouquet, IconBouquetAktif, IconOrders, IconOrdersAktif, IconProfile, IconProfileAktif,} from '../../../assets';
import { colors, fonts } from '../../../utils';
import { RFValue } from 'react-native-responsive-fontsize';
import { heightMobileUI } from '../../../utils/constant';

const TabItem = ({isFocused, onLongPress, onPress, label}) => {

    const Icon = () => {
        //jika label "Home" dipencet/aktif maka IconHomeAktif yang muncul dan sebaliknya
        if(label === "Home") {
            return isFocused ? <IconHomeAktif /> : <IconHome />
        }

        if (label === 'Bouquet') {
          return isFocused ? <IconBouquetAktif /> : <IconBouquet />;
        }

        if (label === 'Orders') {
          return isFocused ? <IconOrdersAktif /> : <IconOrders />;
        }

        if (label === 'Profile') {
          return isFocused ? <IconProfileAktif /> : <IconProfile />;
        }

        return <IconHome />
    }

  return (
    <TouchableOpacity
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.container}>
        <Icon />
      <Text style={styles.text(isFocused)}>{label}</Text>
    </TouchableOpacity>
  );
}

export default TabItem

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  text: isFocused => ({
    color: isFocused ? colors.primary : colors.navmenu,
    fontSize: RFValue(14, heightMobileUI),
    marginTop: 3,
    fontFamily: fonts.primary.extrabold,
  }),
});