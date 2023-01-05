import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {RFValue} from 'react-native-responsive-fontsize';
import {heightMobileUI} from '../../../utils/constant';
import {colors, fonts, responsiveHeight, responsiveWidth} from '../../../utils';
import {IconCalendar, IconClock} from '../../../assets';

const today = new Date();
export default class PilihTanggal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate()+1,
      ),
      time: today,
      showDate: false,
      showTime: false,
      tanggal: '',
      waktu: '',
    };
  }

  setDate = (event, selectedDate) => {
    var custom_bulan = [
      'Januari',
      'Februari',
      'Maret',
      'April',
      'Mei',
      'Juni',
      'Juli',
      'Agustus',
      'September',
      'Oktober',
      'November',
      'Desember',
    ];
    var custom_hari = [
      'Minggu',
      'Senin',
      'Selasa',
      'Rabu',
      'Kamis',
      'Jumat',
      'Sabtu',
    ];
    const newDate = new Date(selectedDate);
    const year = newDate.getFullYear();
    const month = newDate.getMonth();
    const dayDate = newDate.getDate();
    const dayName = newDate.getDay();
    const dateText =
      custom_hari[dayName] +
      ', ' +
      dayDate +
      ' ' +
      custom_bulan[month] +
      ' ' +
      year;
    if (custom_hari[dayName] == 'Minggu') {
      Alert.alert(
        'Tidak Dapat Memilih Tanggal',
        'Mohon Maaf, Tidak Ada Pengiriman di Hari Minggu',
      );
      this.setState({
        showDate: false,
      });
    } else {
      this.setState({
        tanggal: dateText,
        date: selectedDate,
        showDate: false,
      });
      this.props.updateTanggal(this.state.tanggal)
    }
  };

  setTime = (event, selectedTime) => {
    const newTime = new Date(selectedTime);
    var startTime = new Date();
    startTime.setHours(7);
    startTime.setMinutes(59);
    var finishTime = new Date();
    finishTime.setHours(20);
    finishTime.setMinutes(1);
    if (selectedTime < startTime || selectedTime > finishTime) {
      Alert.alert('Tidak Dapat Memilih Waktu', 'Mohon Maaf, Waktu Pengiriman Tersedia Pukul 8 Pagi - 8 Malam');
      this.setState({
        showTime: false,
      });
    } else {
      const clockText = newTime
        .toLocaleTimeString('id-ID')
        .replace(/(.*)\D\d+/, '$1');
      this.setState({
        waktu: clockText,
        time: selectedTime,
        showTime: false,
      });
      this.props.updateWaktu(this.state.waktu);
    }
  };

  datepicker = () => {
    this.setState({
      showDate: true,
    });
  };

  timepicker = () => {
    this.setState({
      showTime: true,
    });
  };

  render() {
    const {showDate, showTime, date, time, tanggal, waktu} = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.labelText}>
          Pilih Tanggal Pengiriman / Pengambilan
        </Text>
        <View style={styles.wrapDateTimePicker}>
          <TouchableOpacity onPress={this.datepicker}>
            <View style={styles.tanggal}>
              <IconCalendar />
              <TextInput
                editable={false}
                style={styles.text}
                value={tanggal}
                placeholder="--Pilih Tanggal--    "
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.timepicker}>
            <View style={styles.waktu}>
              <IconClock />
              <TextInput
                editable={false}
                style={styles.text}
                value={waktu}
                placeholder="--.--  "
              />
            </View>
          </TouchableOpacity>
        </View>
        {showDate && (
          <DateTimePicker
            value={date}
            mode={'date'}
            is24Hour={true}
            display="default"
            minimumDate={
              new Date(
                today.getFullYear(),
                today.getMonth(),
                today.getDate() + 1,
              )
            }
            maximumDate={
              new Date(
                today.getFullYear(),
                today.getMonth() + 6,
                today.getDate(),
              )
            }
            onChange={this.setDate}
          />
        )}
        {showTime && (
          <DateTimePicker
            value={time}
            mode={'time'}
            is24Hour={true}
            display={'spinner'}
            minuteInterval={30}
            onChange={this.setTime}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 17,
    marginBottom: 20,
  },
  labelText: {
    fontSize: RFValue(18, heightMobileUI),
    fontFamily: fonts.primary.semibold,
    color: 'black',
  },
  wrapDateTimePicker: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tanggal: {
    borderBottomWidth: 1,
    borderColor: colors.borderInput,
    marginTop: 7,
    width: responsiveWidth(255),
    height: responsiveHeight(43),
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 8,
  },
  waktu: {
    borderBottomWidth: 1,
    borderColor: colors.borderInput,
    marginTop: 7,
    width: responsiveWidth(100),
    height: responsiveHeight(43),
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 8,
  },
  text: {
    fontFamily: fonts.primary.regular,
    fontSize: RFValue(16, heightMobileUI),
    color: colors.black,
    marginLeft: 7,
  },
});
