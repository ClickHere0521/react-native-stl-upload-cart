/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
let stls = []

import React, {useState} from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,  
  TouchableNativeFeedbackBase,
  Alert
} from 'react-native';
import { WebView } from 'react-native-webview'
import {
  Colors,
  DebugInstructions,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {
  Upload_stl,
  Header,
  How_it_works,
  Configure_Add,
 } from './stl_component';
import StlCart from './stl_component/components/StlCart';

const Section = ({children, title}): Node => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App: () => Node = () => {
  let input = []
  let configure = []
  
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };    		
  const [value, setValue] = useState(0); // integer state
  const [clearstl, setClearstl] = useState(true)

  const handlechange = (data) => {        
    input = data                    
  }
    
  const handleConfigure = (data) => {    
    configure = data        
  }

  const handleAdd = async () => { 

    switch(configure.material)
    {
      case "poBlack": price_per_gram_material = 0.05; break;
      case "poWhite": price_per_gram_material = 0.06; break;
      // add more 
    }
    salePrice = (input.volume * price_per_gram_material + input.volume * 10).toFixed(2)
    if(input.size !=null){   
      // console.log('before push :'+stls)      
      try{
        stls.push(
          {
            "name": input.name,
            "size": input.size,
            "volume": input.volume,
            "boundingBox": input.boundingBox, 
            "technology": configure.technology,
            "infill": configure.infill,
            "thickness": configure.thickness,
            "material": configure.material,
            "qty": 1,
            "salePrice": salePrice,
            "checked": 1
          }                
        )          
        // console.log(input.name)      
        // setCartStls(stls)          
      } catch(err){

      }
      setValue(value => value + 1); // update the state to force render
    }
    else {
      Alert.alert(
        '',
        'Please choose an item',
        [
          {text: 'Ok', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        ],
        { cancelable: false }
      );
    }
  }

  const updateStl = (data) => {    
    stls = data
    setValue(value => value + 1);
  }

  const handleclear = () => {
   setClearstl(true)
  }

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="How it Works">                        
            <How_it_works />            
          </Section>
          <Section title="Upload your STL files">
            <Upload_stl clearstl={clearstl} handlechange={handlechange} handleclear={handleclear}/>            
          </Section>
          <Section title="Configure and add parts">
            <Configure_Add handleConfigure={handleConfigure}/>
            <TouchableOpacity style={[styles.centerElement, {backgroundColor: '#009688', width: 100, height: 25, borderRadius: 5}]} onPress={handleAdd}>
              <Text style={{color: '#ffffff'}}>Add to cart</Text>
            </TouchableOpacity>
          </Section>
          <Section title="Cart">            
            <StlCart stls={stls} updateStl={updateStl}/>
          </Section>  
          {/* <WebView style={{width: 200, height: 300}} source={{ uri: 'https://reactnative.dev/' }} />         */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  centerElement: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    alignSelf: 'center'    
  },
});

export default App;
