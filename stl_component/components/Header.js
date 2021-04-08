import type {Node} from 'react';
import {Platform, StyleSheet, Text} from 'react-native';
import React from 'react';

const styles = StyleSheet.create({
  fontsize: {
    fontSize: 40,
    alignSelf: 'center',    
  },
});

const Header: () => Node = Platform.select({
  ios: () => (
    <Text style={styles.fontsize}>
      Welcome to Our App.
    </Text>
  ),
  default: () => (
    <Text style={styles.fontsize}>
      Welcome to Our App.
    </Text>
  ),
});

export default Header;