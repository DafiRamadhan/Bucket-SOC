import React from 'react';
import {View, StyleSheet} from 'react-native';
import TabItem from '../TabItem';
import DropShadow from 'react-native-drop-shadow';
import { dropshadow } from '../../../utils';

const BottomNavigator = ({state, descriptors, navigation}) => {
    const focusedOptions = descriptors[state.routes[state.index].key].options;

    if (focusedOptions.tabBarVisible == false) {
        return null;
    }

  return (
    <DropShadow
      style={dropshadow.navmenubar}>
      <View style={styles.container}>
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              // The `merge: true` option makes sure that the params inside the tab screen are preserved
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <TabItem
              key={index}
              label={label}
              isFocused={isFocused}
              onLongPress={onLongPress}
              onPress={onPress}
            />
          );
        })}
      </View>
    </DropShadow>
  );
}

export default BottomNavigator

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    paddingVertical: 10,
    paddingHorizontal: 37,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    justifyContent: 'space-between'
  },
});
