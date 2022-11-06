import {Text, StyleSheet, View} from 'react-native';
import React, {Component} from 'react';
import {Slider1, Slider2} from '../../../assets';
import {SliderBox} from 'react-native-image-slider-box';
import {colors, responsiveHeight, responsiveWidth} from '../../../utils';

export default class BannerSlider extends Component {
  //Membuat state image dalam constructor
  constructor(props) {
    super(props);

    this.state = {
      images: [Slider1, Slider2],
    };
  }

  render() {
    return (
      <View>
        <SliderBox
          images={this.state.images}
          autoplay
          circleLoop
          sliderBoxHeight={responsiveHeight(146)}
          ImageComponentStyle={styles.slider}
          dotStyle={styles.dotStyle}
          dotColor={colors.primary}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
    slider: {
        borderRadius: 10,
        width: responsiveWidth(390)
    },
    dotStyle: {
        width: 10,
        height: 5,
        borderRadius: 5,
    }
});
