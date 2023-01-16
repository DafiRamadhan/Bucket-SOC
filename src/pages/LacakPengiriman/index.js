import {
  Text,
  StyleSheet,
  View,
  ActivityIndicator,
  ScrollView,
  BackHandler,
} from 'react-native';
import React, {Component} from 'react';
import {
  colors,
  fonts,
  heightMobileUI,
  responsiveHeight,
  responsiveWidth,
} from '../../utils';
import {RFValue} from 'react-native-responsive-fontsize';
import {Header, Jarak} from '../../components/kecil';
import {getTrackingInfo} from '../../actions/BiteshipAction';
import {connect} from 'react-redux';

class LacakPengiriman extends Component {
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
      tracking_id: this.props.route.params,
    };
  }

  componentDidMount() {
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      const {tracking_id} = this.state;
      this.props.dispatch(getTrackingInfo(tracking_id));
    });
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
    this._unsubscribe();
  }

  handleBackButtonClick() {
    this.props.navigation.navigate('DetailPesanan');
    return true;
  }

  render() {
    const {navigation, getTrackingInfoResult} = this.props;
    const history = getTrackingInfoResult
      ? getTrackingInfoResult.courier.history
      : '';
    return (
      <View style={styles.page}>
        {getTrackingInfoResult ? (
          <View>
            <Header
              title="Lacak Pengiriman"
              goBack={() => navigation.goBack()}
            />
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.wrapInfo}>
                <View style={styles.desc}>
                  <Text style={styles.titleText}>Status Pengiriman</Text>
                  <View style={styles.wrapStatus}>
                    <Text style={styles.status}>
                      {getTrackingInfoResult.status}
                    </Text>
                  </View>
                </View>
                <View style={styles.desc}>
                  <Text style={styles.labelText}>ID Pengiriman</Text>
                  <Text style={styles.IDText}>{getTrackingInfoResult.id}</Text>
                </View>
                <View style={styles.desc}>
                  <Text style={styles.labelText}>Layanan Kurir</Text>
                  <Text style={styles.infoText}>
                    {getTrackingInfoResult.courier.company === 'grab'
                      ? 'GrabExpress Instant'
                      : 'GoSend Instant'}
                  </Text>
                </View>
              </View>
              <Jarak
                width={'100%'}
                height={responsiveHeight(7)}
                backgroundColor={colors.line}
              />
              <View style={styles.wrapInfo}>
                <View style={styles.desc}>
                  <Text style={styles.titleText}>Informasi Kurir</Text>
                </View>
                <View style={styles.desc}>
                  <Text style={styles.labelText}>Nomor Resi</Text>
                  <Text style={styles.infoText}>
                    {getTrackingInfoResult.courier.waybill_id}
                  </Text>
                </View>
                <View style={styles.desc}>
                  <Text style={styles.labelText}>Nama Driver</Text>
                  <Text style={styles.infoText}>
                    {getTrackingInfoResult.courier.name}
                  </Text>
                </View>
                <View style={styles.desc}>
                  <Text style={styles.labelText}>Nomor Telepon</Text>
                  <Text style={styles.infoText}>
                    {getTrackingInfoResult.courier.phone}
                  </Text>
                </View>
              </View>
              <Jarak
                width={'100%'}
                height={responsiveHeight(7)}
                backgroundColor={colors.line}
              />
              <View style={styles.wrapHistory}>
                <View style={styles.desc}>
                  <Text style={styles.titleText}>Riwayat Pengiriman</Text>
                </View>
                {history.reverse().map((list, index) => {
                  return (
                    <View key={index}>
                      <View style={styles.wrapLine}>
                        <View style={styles.line(history, index)} />
                      </View>
                      <View style={styles.wrapDesc}>
                        <View style={styles.wrapSymbol}>
                          <View style={styles.circle}></View>
                        </View>
                        <View>
                          <View style={styles.historyDesc}>
                            <Text style={styles.statusText}>{list.status}</Text>
                            <Text style={styles.waktuText}>
                              {list.updated_at.substring(8, 10) +
                                '-' +
                                list.updated_at.substring(5, 7) +
                                '-' +
                                list.updated_at.substring(0, 4) +
                                ' ' +
                                list.updated_at.substring(11, 13) +
                                '.' +
                                list.updated_at.substring(14, 16)}
                            </Text>
                          </View>
                          <Text style={styles.deskripsi}>{list.note}.</Text>
                        </View>
                      </View>
                    </View>
                  );
                })}
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
  getTrackingInfoLoading: state.BiteshipReducer.getTrackingInfoLoading,
  getTrackingInfoResult: state.BiteshipReducer.getTrackingInfoResult,
  getTrackingInfoError: state.BiteshipReducer.getTrackingInfoError,
});

export default connect(mapStateToProps, null)(LacakPengiriman);

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  blank: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'center',
  },
  wrapInfo: {
    marginBottom: responsiveHeight(20),
    marginHorizontal: responsiveWidth(25),
  },
  wrapHistory: {
    marginBottom: responsiveHeight(100),
    marginHorizontal: responsiveWidth(25),
  },
  desc: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: responsiveHeight(17),
  },
  wrapDesc: {
    flexDirection: 'row',
    marginVertical: responsiveHeight(8.5),
  },
  historyDesc: {
    flexDirection: 'row',
  },
  titleText: {
    fontFamily: fonts.primary.bold,
    fontSize: RFValue(16, heightMobileUI),
    color: colors.black,
  },
  wrapStatus: {
    backgroundColor: colors.primary,
    alignSelf: 'flex-end',
    paddingHorizontal: responsiveWidth(10),
    paddingVertical: responsiveHeight(2.5),
    borderRadius: 10,
  },
  status: {
    fontSize: RFValue(13, heightMobileUI),
    fontFamily: fonts.primary.bold,
    color: colors.white,
    textTransform: 'capitalize',
  },
  labelText: {
    fontFamily: fonts.primary.regular,
    fontSize: RFValue(15, heightMobileUI),
    color: colors.black,
    width: responsiveWidth(140),
  },
  infoText: {
    fontFamily: fonts.primary.regular,
    fontSize: RFValue(15, heightMobileUI),
    color: colors.black,
    textAlign: 'right',
    width: responsiveWidth(220),
  },
  IDText: {
    fontFamily: fonts.primary.regular,
    fontSize: RFValue(15, heightMobileUI),
    color: colors.black,
    textAlign: 'right',
    width: responsiveWidth(230),
    textTransform: 'uppercase',
  },
  statusText: {
    fontSize: RFValue(17, heightMobileUI),
    fontFamily: fonts.primary.bold,
    color: colors.primary,
    width: responsiveWidth(139),
    textTransform: 'capitalize',
  },
  waktuText: {
    fontFamily: fonts.primary.regular,
    fontSize: RFValue(15, heightMobileUI),
    color: colors.black,
    textAlign: 'right',
    width: responsiveWidth(200),
  },
  deskripsi: {
    fontFamily: fonts.primary.regular,
    fontSize: RFValue(15, heightMobileUI),
    color: colors.black,
    textAlign: 'justify',
    marginTop: responsiveHeight(5),
    width: responsiveWidth(339),
  },
  wrapSymbol: {
    alignSelf: 'center',
    marginRight: responsiveWidth(10),
  },
  circle: {
    backgroundColor: colors.primary,
    width: 15,
    height: 15,
    borderRadius: 100,
  },
  wrapLine: {
    width: '4.1%',
  },
  line: (history, index) => ({
    backgroundColor: colors.primary,
    width: 2,
    height:
      (index === 0 && history.length !== 1) ||
      (index === history.length - 1 && history.length !== 1)
        ? responsiveHeight(47)
        : index === 0 && history.length === 1
        ? 0
        : responsiveHeight(100),
    marginTop: index === 0 ? responsiveHeight(35) : 0,
    position: 'absolute',
    alignSelf: 'center',
  }),
});
