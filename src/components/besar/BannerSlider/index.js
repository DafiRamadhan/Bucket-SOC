import {StyleSheet, View} from 'react-native';
import React, {Component} from 'react';
import {Slider1, Slider2, Slider3} from '../../../assets';
import {colors, responsiveHeight, responsiveWidth} from '../../../utils';
import { SliderBox } from 'react-native-image-slider-box';

export default class BannerSlider extends Component {
  //Membuat state image dalam constructor
  constructor(props) {
    super(props);

    this.state = {
      images: [Slider1, Slider2, Slider3],
    };
  }

  render() {
    return (
      <View>
        <SliderBox
          autoplay
          autoplayInterval={5000}
          circleLoop
          images={this.state.images}
          disableOnPress
          sliderBoxHeight={responsiveHeight(150)}
          ImageComponentStyle={styles.slider}
          dotStyle={styles.dotStyle}
          dotColor={colors.navmenu}
          imageLoadingColor={colors.primary}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  slider: {
    borderRadius: 10,
    width: responsiveWidth(380),
  },
  dotStyle: {
    width: 10,
    height: 5,
    borderRadius: 5,
  },
});
