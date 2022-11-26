import {Image, Modal, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {Component} from 'react';
import {colors, fonts, responsiveHeight, responsiveWidth} from '../../../utils';
import {SliderBox} from 'react-native-image-slider-box';
import { dummyBanner } from '../../../data';
import { Header } from '../../kecil';
import { RFValue } from 'react-native-responsive-fontsize';
import { heightMobileUI } from '../../../utils/constant';

export default class BannerSlider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      banner: dummyBanner,
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
    const {banner} = this.state;
    const {openImage, index} = this.state;
    let itemList = [];
    banner.forEach(item => {
      itemList.push(item.gambar);
    });
    return (
      <View>
        <SliderBox
          autoplay
          autoplayInterval={5000}
          circleLoop
          images={itemList}
          sliderBoxHeight={responsiveHeight(150)}
          ImageComponentStyle={styles.slider}
          dotStyle={styles.dotStyle}
          dotColor={colors.navmenu}
          imageLoadingColor={colors.primary}
          onCurrentImagePressed={index => this.clickPreview(index)}
        />
        <Modal
          visible={openImage}
          onRequestClose={() => this.setState({openImage: false})}>
          <Header
            title="Informasi"
            goBack={() => this.setState({openImage: false})}
          />
          <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Image source={dummyBanner[index].gambar} style={styles.gambar} />
              <Text style={styles.titleText}>{dummyBanner[index].title}</Text>
              <Text style={styles.deskripsiText}>
                {dummyBanner[index].deskripsi}
              </Text>
            </ScrollView>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    marginHorizontal: responsiveWidth(25),
  },
  slider: {
    borderRadius: 10,
    width: responsiveWidth(380),
  },
  dotStyle: {
    width: 10,
    height: 5,
    borderRadius: 5,
  },
  gambar: {
    height: responsiveHeight(140),
    width: '100%',
    borderRadius: 10,
    marginVertical: responsiveHeight(30),
  },
  titleText: {
    fontFamily: fonts.primary.bold,
    fontSize: RFValue(18, heightMobileUI),
    color: colors.black,
    textAlign: 'justify',
    marginBottom: responsiveHeight(12),
  },
  deskripsiText: {
    fontFamily: fonts.primary.regular,
    fontSize: RFValue(14, heightMobileUI),
    color: colors.black,
    textAlign: 'justify',
    marginBottom: responsiveHeight(40),
  },
});
