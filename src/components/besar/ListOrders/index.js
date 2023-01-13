import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {CardOrders} from '../../kecil';
import {connect} from 'react-redux';
import {colors, fonts, heightMobileUI, responsiveHeight, responsiveWidth} from '../../../utils';
import {EmptyOrder} from '../../../assets';
import { RFValue } from 'react-native-responsive-fontsize';

const ListOrders = ({
  navigation,
  getListHistoryLoading,
  getListHistoryResult,
}) => {
  return (
    <View style={styles.container}>
      {getListHistoryResult ? (
        <View>
          {Object.keys(getListHistoryResult).reverse().map(key => {
            return (
              <CardOrders
                pesanan={getListHistoryResult[key]}
                key={key}
                id={key}
                navigation={navigation}
              />
            );
          })}
        </View>
      ) : getListHistoryLoading ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : (
        <View>
          <View style={styles.emptyOrder}>
            <EmptyOrder />
          </View>
          <Text style={styles.emptyText}>
            Anda belum memiliki pesanan.
          </Text>
        </View>
      )}
    </View>
  );
};

const mapStateToProps = state => ({
  getListHistoryLoading: state.HistoryReducer.getListHistoryLoading,
  getListHistoryResult: state.HistoryReducer.getListHistoryResult,
  getListHistoryError: state.HistoryReducer.getListHistoryError,
});

export default connect(mapStateToProps, null)(ListOrders);

const styles = StyleSheet.create({
  loading: {
    marginTop: responsiveHeight(350),
  },
  emptyOrder: {
    marginLeft: responsiveWidth(73),
    height: responsiveHeight(245),
    width: responsiveWidth(251),
    marginTop: responsiveHeight(210),
    marginBottom: responsiveHeight(35),
  },
  emptyText: {
    alignSelf: 'center',
    color: colors.black,
    fontFamily: fonts.primary.semibold,
    fontSize: RFValue(20, heightMobileUI),
  },
});
