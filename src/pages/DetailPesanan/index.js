import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  Linking,
  BackHandler,
} from 'react-native';
import React, {Component} from 'react';
import {colors, fonts, responsiveHeight, responsiveWidth} from '../../utils';
import {RFValue} from 'react-native-responsive-fontsize';
import {heightMobileUI} from '../../utils/constant';
import {Header, ListDetailPesanan} from '../../components';

export default class DetailPesanan extends Component {
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
      pesanan: this.props.route.params.pesanan,
    };
  }

  componentDidMount() {
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  handleBackButtonClick() {
    this.props.navigation.navigate('Orders');
    return true;
  }

  render() {
    const {pesanan} = this.state;
    const {navigation} = this.props;
    return (
      <View style={styles.pages}>
        <Header
          title="Detail Pesanan"
          goBack={() => navigation.navigate('Orders')}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            <ListDetailPesanan pesanan={pesanan} navigation={navigation} />
            <View style={styles.wrapPilihan}>
              {pesanan.url_midtrans ? (
                <TouchableOpacity
                  onPress={() => navigation.navigate('Midtrans', pesanan)}>
                  <View style={styles.wrapButton}>
                    <View>
                      <Text style={styles.textMenu}>
                        Lihat Halaman Pembayaran
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ) : null}
              <TouchableOpacity onPress={() => navigation.navigate('Orders')}>
                <View style={styles.wrapButton}>
                  <View>
                    <Text style={styles.textMenu}>Lihat Invoice Pembelian</Text>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  Linking.openURL(
                    'whatsapp://send?text=Halo, saya memiliki pertanyaan untuk pesanan saya dengan order ID ' +
                      pesanan.order_id +
                      '. &phone=6288225276534',
                  )
                }>
                <View style={styles.wrapButton}>
                  <View>
                    <Text style={styles.textMenu}>Kontak Kami</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  pages: {
    flex: 1,
    backgroundColor: colors.white,
  },
  wrapPilihan: {
    marginVertical: responsiveHeight(20),
    marginHorizontal: responsiveWidth(25),
  },
  wrapButton: {
    flexDirection: 'row',
    borderColor: colors.primary,
    borderWidth: 2,
    borderRadius: 10,
    marginBottom: responsiveHeight(20),
    padding: responsiveHeight(10),
    alignItems: 'center',
    justifyContent: 'center',
    height: responsiveHeight(54),
  },
  textMenu: {
    fontSize: RFValue(16, heightMobileUI),
    fontFamily: fonts.primary.semibold,
    color: 'black',
  },
});
