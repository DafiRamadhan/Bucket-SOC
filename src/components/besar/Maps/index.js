import React, {Component} from 'react';
import {
  Alert,
  Keyboard,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import GetLocation from 'react-native-get-location';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import DropShadow from 'react-native-drop-shadow';
import {RFValue} from 'react-native-responsive-fontsize';
import {
  IconBack,
  IconBlueDots,
  IconClearText,
  IconLocation,
  IconMarker,
  IconSearch,
} from '../../../assets';
import {
  colors,
  dropshadow,
  fonts,
  responsiveHeight,
  responsiveWidth,
} from '../../../utils';
import {heightMobileUI} from '../../../utils/constant';
import Geocoder from 'react-native-geocoding';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import { getAdminProfile } from '../../../actions/ProfileAction';
import { connect } from 'react-redux';

class Maps extends Component {
  state = {
    GOOGLE_MAPS_API: 'AIzaSyA4QbcD1J0EBKqTQ6iIX-fqo9QTAfPapVk',
    location: {
      latitude: 0,
      longitude: 0,
    },
    region: {
      latitude: this.props.latitude,
      longitude: this.props.longitude,
      latitudeDelta: 0.009,
      longitudeDelta: 0.009,
    },
    address: this.props.address,
    search: this.props.search,
  };

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch(getAdminProfile());
  }

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
      .catch(error => {
        if (error.code === 'UNAVAILABLE') {
          if (Platform.OS === 'android') {
            RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
              interval: 10000,
              fastInterval: 5000,
            })
              .then(() => {
                this.requestLocation();
              })
              .catch(error => {
                //Jika error nya disebabkan selain cancel oleh user (selain ERR00)
                if (error.code !== 'ERR00') {
                  Alert.alert('Error', error.message);
                }
              });
          } else {
            GetLocation.openGpsSettings();
          }
        }
        if (error.code === 'TIMEOUT') {
          Alert.alert('Timeout', 'Location request timed out');
        }
        if (error.code === 'UNAUTHORIZED') {
          Alert.alert('Unauthorized', 'Authorization denied');
        }
      });
  };

  onRegionChange = region => {
    this.setState({
      region,
    });
    if (this.state.search === true) {
      Geocoder.from({
        latitude: region.latitude,
        longitude: region.longitude,
      })
        .then(json => {
          var addressComponent = json.results[0].formatted_address;
          var newAddress = addressComponent.replace(', Indonesia', '');
          this.setState({
            address: newAddress,
          });
        })
        .catch(error =>
          Alert.alert(
            'Error',
            'Gagal mengambil data. Mohon periksa jaringan Anda!.',
          ),
        );
    } else {
      this.setState({
        search: true,
      });
    }
  };

  saveLocation = () => {
    const {getAdminProfileResult} = this.props;
    const latitude = this.state.region.latitude;
    const longitude = this.state.region.longitude;
    const adminLatitude = getAdminProfileResult
      ? getAdminProfileResult.latitude
      : 0;
    const adminLongitude = getAdminProfileResult
      ? getAdminProfileResult.longitude
      : 0;
    const R = 6371e3; // Jari-jari bumi dalam meter
    const lat1 = (adminLatitude * Math.PI) / 180; // Konversi ke radian
    const lat2 = (latitude * Math.PI) / 180; // Konversi ke radian
    const deltaLat = ((latitude - adminLatitude) * Math.PI) / 180; // Konversi ke radian
    const deltaLon = ((longitude - adminLongitude) * Math.PI) / 180; // Konversi ke radian
    const a =
      Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
      Math.cos(lat1) *
        Math.cos(lat2) *
        Math.sin(deltaLon / 2) *
        Math.sin(deltaLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    //Membatasi lokasi pengguna hanya maksimal 25km dari toko
    if (distance > 25000) {
      Alert.alert(
        'Tidak Dapat Memilih Lokasi',
        'Mohon Maaf. Belum tersedia untuk lokasi Anda!.',
      );
    } else {
      this.props.updateLocation(this.state);
    }
  };

  goBack = () => {
    this.props.goBack();
  };

  render() {
    const {GOOGLE_MAPS_API, location, region, address} = this.state;
    Geocoder.init(GOOGLE_MAPS_API, {language: 'id'});
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
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
          <View style={styles.searchBox}>
            <GooglePlacesAutocomplete
              placeholder="Cari"
              minLength={2}
              numberOfLines={5}
              isRowScrollable={false}
              onPress={(data = null) => {
                //console.log(data);
                Geocoder.from(data.description)
                  .then(json => {
                    var places = json.results[0].geometry.location;
                    var address = data.description.replace(', Indonesia', '');
                    this.setState({
                      region: {
                        latitude: places.lat,
                        longitude: places.lng,
                        latitudeDelta: 0.009,
                        longitudeDelta: 0.009,
                      },
                      search: false,
                      address: address,
                    });
                    //console.log(address);
                  })
                  .catch(error =>
                    Alert.alert(
                      'Error',
                      'Gagal mengambil data. Mohon periksa jaringan Anda!.',
                    ),
                  );
              }}
              query={{
                key: GOOGLE_MAPS_API,
                language: 'id',
                components: 'country:id',
              }}
              ref={instance => {
                this.GooglePlacesRef = instance;
              }}
              styles={{
                textInput: {
                  color: colors.black,
                  fontSize: RFValue(16, heightMobileUI),
                  fontFamily: fonts.primary.regular,
                },
              }}
              renderLeftButton={() => (
                <View style={styles.iconSearch}>
                  <IconSearch />
                </View>
              )}
              renderRightButton={() => (
                <View>
                  <TouchableOpacity
                    style={styles.iconClear}
                    onPress={() => {
                      this.GooglePlacesRef.setAddressText('');
                    }}>
                    <IconClearText />
                  </TouchableOpacity>
                </View>
              )}
            />
          </View>
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
          <View style={styles.infoBox}>
            <IconMarker />
            <View style={styles.wrapInfo}>
              <View>
                <Text numberOfLines={3} style={styles.infoText}>
                  {address}
                </Text>
              </View>
            </View>
          </View>
          <TouchableOpacity
            style={styles.simpan}
            region={region}
            onPress={this.saveLocation}>
            <Text style={styles.simpanText}>Pilih</Text>
          </TouchableOpacity>
          {/* <Text style={styles.location}>{JSON.stringify(region, 0, 2)}</Text>
        <Text style={styles.location2}>{JSON.stringify(location, 0, 2)}</Text> */}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const mapStateToProps = state => ({
  getAdminProfileLoading: state.ProfileReducer.getAdminProfileLoading,
  getAdminProfileResult: state.ProfileReducer.getAdminProfileResult,
  getAdminProfileError: state.ProfileReducer.getAdminProfileError,
});

export default connect(mapStateToProps, null)(Maps);

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
    bottom: responsiveHeight(245),
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
  searchBox: {
    position: 'absolute',
    flexDirection: 'row',
    top: responsiveHeight(30),
    width: responsiveWidth(340),
    alignSelf: 'center',
    backgroundColor: colors.white,
    borderRadius: 5,
    paddingHorizontal: responsiveWidth(10),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,
    elevation: 8,
    zIndex: 1,
  },
  iconSearch: {
    marginTop: responsiveHeight(12),
  },
  iconClear: {
    marginTop: responsiveHeight(17),
  },
  infoBox: {
    position: 'absolute',
    bottom: responsiveHeight(130),
    flexDirection: 'row',
    height: responsiveHeight(85),
    width: responsiveWidth(340),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    borderRadius: 10,
    paddingHorizontal: responsiveWidth(10),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,
    elevation: 8,
  },
  wrapInfo: {
    flex: 1,
    marginLeft: responsiveWidth(10),
  },
  infoText: {
    color: colors.black,
    fontFamily: fonts.primary.medium,
    fontSize: RFValue(14, heightMobileUI),
    textAlign: 'justify',
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
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,
    elevation: 8,
  },
  simpanText: {
    color: colors.white,
    fontFamily: fonts.primary.bold,
    fontSize: RFValue(20, heightMobileUI),
  },
  tombolBack: {
    bottom: responsiveHeight(245),
    position: 'absolute',
    left: 20,
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
});
