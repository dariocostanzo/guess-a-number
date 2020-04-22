import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Colors from '../constants/colors';
import TitleText from '../components/TitleText';

const Header = (props) => {
  return (
    <View style={styles.header}>
      <TitleText style={styles.headerTitle}>{props.title}</TitleText>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 90,
    paddingTop: 36,
    backgroundColor: Colors.primary,
    // Every <View> uses flexbox and with alignItems and justifyContent
    // how the child elements are positioned inside of the view
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default Header;
