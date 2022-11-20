import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {colors, fonts, responsiveHeight, responsiveWidth} from '../../../utils';
import {RFValue} from 'react-native-responsive-fontsize';
import {heightMobileUI} from '../../../utils/constant';
import {IconConfirmPassword, IconEmailGrey, IconEyeClose, IconEyeOpen, IconPasswordGrey, IconPhoneGrey, IconProfileGrey} from '../../../assets';

const Inputan = ({
  textarea,
  password,
  noLabel,
  passwordNoLabel,
  width,
  height,
  labelfontSize,
  formfontSize,
  label,
  placeholder,
  value,
  secureTextEntry,
  icon,
  keyboardType,
}) => {
  const [hidePass, setHidePass] = useState(true);
  const Icon = () => {
    if (icon === 'email') {
      return <IconEmailGrey />;
    }
    if (icon === 'password') {
      return <IconPasswordGrey />;
    }
    if (icon === 'profile') {
      return <IconProfileGrey />;
    }
    if (icon === 'phone') {
      return <IconPhoneGrey />;
    }
    if (icon === 'confirm-password') {
      return <IconConfirmPassword />;
    }
    //return default jika kondisi if tidak ada yang memenuhi
    return <IconEmailGrey />;
  };
  if (textarea) {
    return (
      <View style={styles.container}>
        <Text style={styles.label(labelfontSize)}>{label} :</Text>
        <TextInput
          style={styles.inputTextArea(formfontSize)}
          multiline={true}
          numberOfLines={5}
          placeholder={placeholder}
          value={value}
        />
      </View>
    );
  }
  if (password) {
    return (
      <View style={styles.container}>
        <Text style={styles.label(labelfontSize)}>{label} :</Text>
        <View style={styles.wrapPassBox}>
          <TextInput
            style={styles.inputPass(width, height, formfontSize)}
            value={value}
            secureTextEntry={hidePass ? true : false}
            placeholder={placeholder}
          />
          <View style={styles.iconEye}>
            <TouchableOpacity
              style={styles.eyePress}
              onPress={() => setHidePass(!hidePass)}>
              {hidePass ? <IconEyeClose /> : <IconEyeOpen />}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
  if (noLabel) {
    return (
      <View style={styles.containerNoLabel}>
        <Icon />
        <TextInput
          style={styles.inputNoLabel(width, height, formfontSize)}
          value={value}
          secureTextEntry={secureTextEntry}
          placeholder={placeholder}
          keyboardType={keyboardType}
        />
      </View>
    );
  }
  if (passwordNoLabel) {
    return (
      <View style={styles.containerNoLabel}>
        <View>
          <Icon />
        </View>
        <View style={styles.wrapPassBoxNoLabel}>
          <TextInput
            style={styles.inputPassNoLabel(width, height, formfontSize)}
            value={value}
            secureTextEntry={hidePass ? true : false}
            placeholder={placeholder}
          />
          <View style={styles.iconEye}>
            <TouchableOpacity
              style={styles.eyePress}
              onPress={() => setHidePass(!hidePass)}>
              {hidePass ? <IconEyeClose /> : <IconEyeOpen />}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Text style={styles.label(labelfontSize)}>{label} :</Text>
      <TextInput
        style={styles.input(width, height, formfontSize)}
        value={value}
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        keyboardType={keyboardType}
      />
    </View>
  );
};

export default Inputan;

const styles = StyleSheet.create({
  container: {
    marginTop: responsiveHeight(17),
  },
  containerNoLabel: {
    marginTop: responsiveHeight(30),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: labelfontSize => ({
    fontSize: labelfontSize ? labelfontSize : RFValue(18, heightMobileUI),
    fontFamily: fonts.primary.semibold,
    color: 'black',
  }),
  inputTextArea: formfontSize => ({
    fontSize: formfontSize ? formfontSize : RFValue(16, heightMobileUI),
    fontFamily: fonts.primary.regular,
    color: colors.black,
    borderWidth: 1,
    borderColor: colors.borderInput,
    borderRadius: 5,
    textAlignVertical: 'top',
    textAlign: 'justify',
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginTop: responsiveHeight(7),
  }),
  inputPass: (width, height, fontSize) => ({
    fontSize: fontSize ? fontSize : RFValue(16, heightMobileUI),
    fontFamily: fonts.primary.regular,
    color: colors.black,
    width: width,
    height: height ? height : responsiveHeight(43),
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginTop: responsiveHeight(7),
    flex: 1,
  }),
  inputNoLabel: (width, height, fontSize) => ({
    fontSize: fontSize ? fontSize : RFValue(16, heightMobileUI),
    fontFamily: fonts.primary.regular,
    color: colors.black,
    width: width,
    height: height ? height : responsiveHeight(43),
    paddingVertical: 5,
    marginLeft: responsiveWidth(10),
    borderBottomWidth: 1,
    borderColor: colors.borderInput,
    flex: 1,
  }),
  inputPassNoLabel: (width, height, fontSize) => ({
    fontSize: fontSize ? fontSize : RFValue(16, heightMobileUI),
    fontFamily: fonts.primary.regular,
    color: colors.black,
    width: width,
    height: height ? height : responsiveHeight(43),
    paddingVertical: 5,
    flex: 1,
  }),
  input: (width, height, fontSize) => ({
    fontSize: fontSize ? fontSize : RFValue(16, heightMobileUI),
    fontFamily: fonts.primary.regular,
    color: colors.black,
    width: width,
    height: height ? height : responsiveHeight(43),
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginTop: responsiveHeight(7),
    borderBottomWidth: 1,
    borderColor: colors.borderInput,
  }),
  wrapPassBox: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: colors.borderInput,
  },
  wrapPassBoxNoLabel: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: colors.borderInput,
    marginLeft: responsiveWidth(10),
    flex: 1,
  },
  iconEye: {
    alignSelf: 'center',
  },
  eyePress: {
    paddingTop: 5,
    paddingLeft: 5,
    paddingBottom: 5,
  },
});
