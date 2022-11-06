import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import {colors, fonts, responsiveHeight} from '../../../utils';
import { RFValue } from 'react-native-responsive-fontsize';
import { heightMobileUI } from '../../../utils/constant';

const Inputan = ({textarea, width, height, labelfontSize, formfontSize, label, placeholder}) => {
  if (textarea) {
    return (
      <View style={styles.container}>
        <Text style={styles.label(labelfontSize)}>{label} :</Text>
        <TextInput
          style={styles.inputTextArea(formfontSize)}
          multiline={true}
          numberOfLines={5}
          placeholder={placeholder}
        />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Text style={styles.label(labelfontSize)}>{label} :</Text>
      <TextInput style={styles.input(width, height, formfontSize)} />
    </View>
  );
};

export default Inputan;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  label: labelfontSize => ({
    fontSize: labelfontSize ? labelfontSize : RFValue(18, heightMobileUI),
    fontFamily: fonts.primary.semibold,
    color: 'black',
  }),
  inputTextArea: formfontSize => ({
    fontSize: formfontSize ? formfontSize : RFValue(18, heightMobileUI),
    fontFamily: fonts.primary.regular,
    borderWidth: 1,
    borderColor: colors.borderInput,
    borderRadius: 5,
    textAlignVertical: 'top',
    textAlign: 'justify',
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginTop: responsiveHeight(7),
  }),
  input: (width, height, fontSize) => ({
    fontSize: fontSize ? fontSize : 18,
    fontFamily: fonts.primary.regular,
    width: width,
    height: height ? height : responsiveHeight(43),
    borderWidth: 1,
    borderColor: colors.borderInput,
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginTop: responsiveHeight(7),
  }),
});
