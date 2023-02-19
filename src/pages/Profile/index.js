import {
  Text,
  StyleSheet,
  View,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, {Component} from 'react';
import {Menu} from '../../data';
import {
  colors,
  fonts,
  getData,
  responsiveHeight,
  responsiveWidth,
} from '../../utils';
import {defaultProfile, IconAlamat, IconEmail, IconPhone} from '../../assets';
import {RFValue} from 'react-native-responsive-fontsize';
import {heightMobileUI} from '../../utils/constant';
import {ListMenu} from '../../components/besar';
import {connect} from 'react-redux';
import { getAdminProfile } from '../../actions/ProfileAction';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      profile: false,
      menu: Menu,
    };
  }

  //Dijalankan ketika komponen/halaman pertama kali di buka / di load
  componentDidMount() {
    const {dispatch} = this.props;
    dispatch(getAdminProfile());
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.getUserData();
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  //mendapatkan userData dari Async Storage
  getUserData = () => {
    //mendapatkan data dari parameter 'user'
    getData('user').then(res => {
      const data = res;
      //jika datanya ada
      if (data) {
        this.setState({
          profile: data,
        });
        //jika tidak ada data
      } else {
        this.props.navigation.replace('Login');
      }
    });
  };

  render() {
    const {profile, menu} = this.state;
    const {getAdminProfileResult} = this.props;
    return (
      <View style={styles.pages}>
        {profile ? (
          <View>
            <Text style={styles.title}>Profile Pribadi</Text>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.container}>
                <View style={styles.header}>
                  <Image
                    source={
                      profile.avatar ? {uri: profile.avatar} : defaultProfile
                    }
                    style={styles.foto}
                  />
                  <View style={styles.wrapNama}>
                    <Text style={styles.nama}>{profile.nama}</Text>
                  </View>
                </View>
                <View style={styles.pembatas}></View>
                <View style={styles.detail}>
                  <View style={styles.containerData}>
                    <IconEmail />
                    <Text style={styles.data} numberOfLines={2}>
                      Email : {profile.email}
                    </Text>
                  </View>
                  <View style={styles.containerData}>
                    <IconPhone />
                    <Text style={styles.data}>No. HP : {profile.nomerHp}</Text>
                  </View>
                  <View style={styles.containerData}>
                    <IconAlamat />
                    <Text style={styles.data} numberOfLines={5}>
                      Alamat : {profile.alamat}
                    </Text>
                  </View>
                </View>
                <View style={styles.pembatas}></View>
                <View style={styles.listmenu}>
                  <ListMenu
                    pilihMenu={menu}
                    admin={getAdminProfileResult}
                    navigation={this.props.navigation}
                  />
                </View>
              </View>
            </ScrollView>
          </View>
        ) : (
          <View style={styles.blank}>
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        )}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  getAdminProfileLoading: state.ProfileReducer.getAdminProfileLoading,
  getAdminProfileResult: state.ProfileReducer.getAdminProfileResult,
  getAdminProfileError: state.ProfileReducer.getAdminProfileError,
});

export default connect(mapStateToProps, null)(Profile);

const styles = StyleSheet.create({
  pages: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  blank: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'center',
  },
  title: {
    fontSize: RFValue(32, heightMobileUI),
    fontFamily: fonts.primary.bold,
    color: 'white',
    alignSelf: 'center',
    marginVertical: responsiveHeight(30),
    position: 'absolute',
  },
  container: {
    backgroundColor: colors.white,
    width: '100%',
    borderRadius: 50,
    paddingBottom: 120,
    marginTop: responsiveHeight(100),
  },
  pembatas: {
    backgroundColor: '#E2E2E2',
    height: responsiveHeight(3),
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    marginTop: responsiveHeight(32),
    marginLeft: responsiveWidth(40),
    marginBottom: responsiveHeight(32),
  },
  foto: {
    height: responsiveHeight(124),
    width: responsiveWidth(124),
    borderRadius: 10,
  },
  wrapNama: {
    width: responsiveWidth(200),
    marginLeft: 20,
    justifyContent: 'center',
  },
  nama: {
    fontSize: RFValue(20, heightMobileUI),
    fontFamily: fonts.primary.bold,
    textAlign: 'center',
    color: 'black',
  },
  detail: {
    marginTop: responsiveHeight(32),
    marginBottom: responsiveHeight(16),
    width: responsiveWidth(350),
    alignSelf: 'center',
  },
  containerData: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  data: {
    fontSize: RFValue(16, heightMobileUI),
    fontFamily: fonts.primary.bold,
    textAlign: 'center',
    paddingBottom: 10,
    paddingLeft: 5,
    color: 'black',
  },
  listmenu: {
    marginTop: responsiveHeight(20),
  },
});
