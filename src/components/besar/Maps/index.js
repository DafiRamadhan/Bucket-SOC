import React, {Component} from 'react';
import {
  Alert,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import GetLocation from 'react-native-get-location';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import DropShadow from 'react-native-drop-shadow';
import {RFValue} from 'react-native-responsive-fontsize';
import { IconBack, IconBlueDots, IconLocation, IconMarker } from '../../../assets';
import { colors, dropshadow, fonts, responsiveHeight, responsiveWidth } from '../../../utils';
import { heightMobileUI } from '../../../utils/constant';

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
            });
            // .catch(err => {
            //   console.warn('Error ' + err.message + ', Code : ' + err.code);
            //   alert('Error ' + err.message + ', Code : ' + err.code);
            // });
          } else {
            GetLocation.openGpsSettings();
          }
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

  saveLocation = () => {
    this.props.updateLatitude(this.state.region.latitude);
    this.props.updateLongitude(this.state.region.longitude);
  };

  goBack = () => {
    this.props.goBack();
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
        <DropShadow style={dropshadow.footer}>
          <TouchableOpacity style={styles.tombolBack} onPress={this.goBack}>
            <IconBack />
          </TouchableOpacity>
        </DropShadow>
        <View style={styles.markerFixed}>
          <Text style={styles.markerText}>Titik Alamat Anda</Text>
          <IconMarker />
        </View>
        <DropShadow style={dropshadow.navmenubar}>
          <TouchableOpacity
            style={styles.currentBtn}
            onPress={this.requestLocation}>
            <IconLocation />
          </TouchableOpacity>
        </DropShadow>
        <TouchableOpacity
          style={styles.simpan}
          region={region}
          onPress={this.saveLocation}>
          <Text style={styles.simpanText}>Pilih</Text>
        </TouchableOpacity>
        {/* <Text style={styles.location}>{JSON.stringify(region, 0, 2)}</Text>
        <Text style={styles.location2}>{JSON.stringify(location, 0, 2)}</Text> */}
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
    bottom: 184,
    position: 'absolute',
    right: 20,
    padding: 4,
    borderRadius: 100,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,

    elevation: 8,
    backgroundColor: colors.white,
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
  simpan: {
    height: responsiveHeight(54),
    width: responsiveWidth(340),
    backgroundColor: colors.primary,
    borderRadius: 5,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: responsiveHeight(50),
  },
  simpanText: {
    color: colors.white,
    fontFamily: fonts.primary.bold,
    fontSize: RFValue(20, heightMobileUI),
  },
  tombolBack: {
    bottom: responsiveHeight(820),
    left: responsiveWidth(15),
    position: 'absolute',
    backgroundColor: colors.white,
    padding: 3,
    borderRadius: 100,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,

    elevation: 13,
  },
});
