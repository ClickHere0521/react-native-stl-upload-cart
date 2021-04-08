/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */

 import type {Node} from 'react';
 import {Platform, StyleSheet, Text} from 'react-native';
 import React from 'react';
 
 const styles = StyleSheet.create({
   highlight: {
     fontWeight: '700',
   },
 });
 
 const How_it_works: () => Node = Platform.select({
   ios: () => (
     <Text>
       Print a Thing works with STL files, a universal format supported by most 3D software packages.
       {"\n"}{"\n"}
       You can create your own or find models other people have made at one of several online catalogs.
     </Text>
   ),
   default: () => (
     <Text>
       Print a Thing works with STL files, a universal format supported by most 3D software packages.
       {"\n"}{"\n"}
       You can create your own or find models other people have made at one of several online catalogs.
     </Text>
   ),
 });
 
 export default How_it_works;
 