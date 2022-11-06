import { Dimensions } from "react-native";
import { heightMobileUI, widthMobileUI } from "../constant";

//rumus untuk mengatur tinggi dan lebar responsive dari masing-masing ukuran HP user
export const responsiveWidth = (width) => {
    //ukuran lebar hp users dikali parameter width yang ditentukam dibagi dengan ukuran lebar dari desain UI
    return Dimensions.get('window').width*width/widthMobileUI;
}

export const responsiveHeight = (height) => {
  return (Dimensions.get('window').height * height) / heightMobileUI;
};