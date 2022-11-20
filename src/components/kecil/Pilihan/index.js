import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors, fonts, responsiveHeight} from '../../../utils';
import {Picker} from '@react-native-picker/picker';
import { RFValue } from 'react-native-responsive-fontsize';
import { heightMobileUI } from '../../../utils/constant';

const Pilihan = ({
  label,
  datas,
  width,
  height,
  labelfontSize,
  formfontSize,
}) => {
  const [selectedValue, setSelectedValue] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.label(labelfontSize)}>{label} :</Text>
      <View style={styles.wrapperPicker(width, height)}>
        <Picker
          selectedValue={selectedValue}
          style={styles.picker(formfontSize)}
          onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}>
          <Picker.Item
            style={styles.picker(formfontSize)}
            label="--Pilih--"
            value=""
          />
          {datas.map((item, index) => {
            return <Picker.Item label={item} value={item} key={index} />;
          })}
        </Picker>
      </View>
    </View>
  );
};

export default Pilihan;

const styles = StyleSheet.create({
  container: {
    marginTop: 17,
  },
  label: labelfontSize => ({
    fontSize: labelfontSize ? labelfontSize : RFValue(18, heightMobileUI),
    fontFamily: fonts.primary.semibold,
    color: 'black',
  }),
  picker: formfontSize => ({
    fontSize: formfontSize ? formfontSize : RFValue(16, heightMobileUI),
    fontFamily: fonts.primary.bold,
    marginTop: -10,
    marginBottom: 10,
    color: 'black',
  }),
  wrapperPicker: (width, height) => ({
    borderBottomWidth: 1,
    borderColor: colors.borderInput,
    marginTop: 7,
    width: width,
    height: height ? height : responsiveHeight(43),
  }),
});
