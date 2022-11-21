import React, {Component} from 'react';
import {StyleSheet, View, Modal, Text, TouchableOpacity} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import {responsiveHeight, colors, responsiveWidth, fonts} from '../../../utils';
import { heightMobileUI, widthMobileUI } from '../../../utils/constant';
import {SliderBox} from 'react-native-image-slider-box';

export default class BuketSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openImage: false,
      index: 0,
    };
  }

  clickPreview = index => {
    this.setState({
      openImage: true,
      index: index,
    });
  };

  render() {
    const {images} = this.props;
    const {openImage, index} = this.state;
    return (
      <View>
        <View style={styles.gambar}>
          <SliderBox
            images={images}
            sliderBoxHeight={responsiveHeight(310)}
            ImageComponentStyle={styles.slider}
            dotStyle={styles.dotStyle}
            dotColor={colors.primary}
            inactiveDotColor={colors.navmenu}
            imageLoadingColor={colors.primary}
            onCurrentImagePressed={index => this.clickPreview(index)}
          />
        </View>
        <Modal
          visible={openImage}
          onRequestClose={() => this.setState({openImage: false})}>
          <TouchableOpacity
            onPress={() => this.setState({openImage: false})}
            style={styles.modal}>
            <View style={styles.zoomImage}>
              <SliderBox
                firstItem={index}
                images={images}
                ImageComponentStyle={styles.sliderPreview}
                dotStyle={styles.dotStyle}
                dotColor={colors.primary}
                inactiveDotColor={colors.navmenu}
                imageLoadingColor={colors.primary}
                onCurrentImagePressed={() => this.setState({openImage: false})}
              />
            </View>
            <Text style={styles.modalText}>[Klik layar untuk kembali]</Text>
          </TouchableOpacity>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  gambar: {
    marginBottom: responsiveHeight(50),
  },
  slider: {
    borderRadius: 10,
    width: responsiveWidth(310),
  },
  dotStyle: {
    top: responsiveHeight(40),
  },
  modal: {
    backgroundColor: '#F6ECEA',
    flex: 1,
  },
  zoomImage: {
    position: 'absolute',
    bottom: responsiveHeight(300),
  },
  sliderPreview: {
    width: '100%',
    height: responsiveWidth(widthMobileUI),
  },
  modalText: {
    color: '#777777',
    fontFamily: fonts.primary.regular,
    fontSize: RFValue(16, heightMobileUI),
    position: 'absolute',
    alignSelf: 'center',
    bottom: responsiveHeight(150),
  },
});
