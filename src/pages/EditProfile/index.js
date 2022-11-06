import React, {Component} from 'react';
import {Alert, Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {IconBlueDots, IconLocation, IconMarker} from '../../assets';
import GetLocation from 'react-native-get-location';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import DropShadow from 'react-native-drop-shadow';
import {colors, dropshadow, fonts, responsiveHeight, responsiveWidth} from '../../utils';
import { RFValue } from 'react-native-responsive-fontsize';
import { heightMobileUI } from '../../utils/constant';

export default class Maps extends Component {
  state = {
    location: {
      latitude: 0,
      longitude: 0,
    },
    region: {
      latitude: -7.575667,
      longitude: 110.824239,
      latitudeDelta: 0.009,
      longitudeDelta: 0.009,
    },
  };

  requestLocation = () => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 150000,
    })
      .then(location => {
        this.setState({
          location,
          region: {
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.009,
            longitudeDelta: 0.009,
          },
        });
      })
      .catch(ex => {
        const {code, message} = ex;
        console.warn(code, message);
        if (code === 'CANCELLED') {
          Alert.alert('Location cancelled by user or by another request');
        }
        if (code === 'UNAVAILABLE') {
          if (Platform.OS === 'android') {
            RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
              interval: 10000,
              fastInterval: 5000,
            })
              .catch(err => {
                console.warn('Error ' + err.message + ', Code : ' + err.code);
                //alert('Error ' + err.message + ', Code : ' + err.code);
              });
          }
          GetLocation.openGpsSettings();
        }
        if (code === 'TIMEOUT') {
          Alert.alert('Location request timed out');
        }
        if (code === 'UNAUTHORIZED') {
          Alert.alert('Authorization denied');
        }
      });
  };

  onRegionChange = region => {
    this.setState({
      region,
    });
  };

  render() {
    const {location, region} = this.state;
    return (
      <View style={styles.map}>
        <MapView
          style={styles.map}
          region={region}
          onRegionChangeComplete={this.onRegionChange}>
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}>
            <IconBlueDots />
          </Marker>
        </MapView>
        <View style={styles.markerFixed}>
          <Text style={styles.markerText}>Titik Lokasi Anda</Text>
          <IconMarker />
        </View>
        <DropShadow style={dropshadow.navmenubar}>
          <TouchableOpacity
            style={styles.currentBtn}
            onPress={this.requestLocation}>
            <IconLocation />
          </TouchableOpacity>
        </DropShadow>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  markerFixed: {
    position: 'absolute',
    alignItems: 'center',
    width: '100%',
    top: '41.5%',
  },
  markerText: {
    fontFamily: fonts.primary.bold,
    fontSize: RFValue(13, heightMobileUI),
    color: colors.white,
    backgroundColor: colors.primary,
    padding: 3,
    marginBottom: 5,
    borderRadius: 5,
  },
  currentBtn: {
    bottom: 150,
    position: 'absolute',
    right: 0,
  },
  location: {
    color: '#333333',
    marginBottom: 5,
    bottom: 400,
    position: 'absolute',
  },
  location2: {
    color: '#333333',
    marginBottom: 5,
    bottom: 200,
    position: 'absolute',
  },
  marker: {
    height: 48,
    width: 48,
  },
  footer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    bottom: 40,
    position: 'absolute',
    width: '100%',
  },
  region: {
    color: '#fff',
    lineHeight: 20,
    margin: 20,
  },
});
