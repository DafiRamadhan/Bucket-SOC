import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, {Component} from 'react';
import {ListOrders} from '../../components';
import {colors, fonts, getData, responsiveHeight} from '../../utils';
import {RFValue} from 'react-native-responsive-fontsize';
import {heightMobileUI} from '../../utils/constant';
import {connect} from 'react-redux';
import {getListHistory, updateStatus} from '../../actions/HistoryAction';

class Orders extends Component {
  constructor(props) {
    super(props);

    this.state = {
      profile: false,
    };
  }

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      getData('user').then(res => {
        const data = res;
        if (data) {
          this.setState({
            profile: data,
          });
          this.props.dispatch(updateStatus(data.uid));
        } else {
          this.props.navigation.replace('Login');
        }
      });
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  //Ketika suatu komponen terdapat perubahan
  componentDidUpdate(prevProps) {
    const {profile} = this.state;
    const {updateStatusResult} = this.props;
    if (
      updateStatusResult &&
      prevProps.updateStatusResult !== updateStatusResult
    ) {
      //jika nilainya true && nilai sebelumnya tidak sama dengan yang baru
      this.props.dispatch(getListHistory(profile.uid));
    }
  }

  render() {
    const {profile} = this.state;
    const {navigation} = this.props;
    return (
      <View style={styles.pages}>
        <Text style={styles.title}>Orders</Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <View style={styles.listmenu}>
              {profile ? (
                <ListOrders navigation={navigation} />
              ) : (
                <View style={styles.loading}>
                  <ActivityIndicator size="large" color={colors.primary} />
                </View>
              )}
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  updateStatusLoading: state.HistoryReducer.updateStatusLoading,
  updateStatusResult: state.HistoryReducer.updateStatusResult,
  updateStatusError: state.HistoryReducer.updateStatusError,
});

export default connect(mapStateToProps, null)(Orders);

const styles = StyleSheet.create({
  pages: {
    backgroundColor: colors.primary,
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
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    paddingBottom: 120,
    marginTop: responsiveHeight(100),
  },
  loading: {
    marginTop: responsiveHeight(350),
  },
});
