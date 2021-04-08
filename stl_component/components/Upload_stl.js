
// import type { Node } from 'react';
import {ActivityIndicator, Platform, StyleSheet, Text, Button, View, TextInput, Alert, TouchableOpacity, Image, Modal,  } from 'react-native';
import React from 'react';
import DocumentPicker from 'react-native-document-picker';
import * as RNFS from 'react-native-fs';
  
const NodeStl = require('node-stl');

const styles = StyleSheet.create({
  highlight: {
    fontWeight: '700',
  },
  container: {
    paddingTop: 23
  },
  input: {
    height: 40,
    borderColor: "#009688",
    borderWidth: 1,
    borderRadius: 5,
  },
  centerElement: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',    
  },
  appButtonContainer: {
    elevation: 8,
    backgroundColor: "#009688",
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 12
  },
  appButtonText: {
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  },
  imageIconStyle: {
    height: 20,
    width: 20,
    resizeMode: 'stretch',
  },
  actContainer: {
    flex: 1,
    justifyContent: "center"
  },
  actHorizontal: {
    flexDirection: "row",
    flex:0,
    justifyContent: "space-around",
    padding: 10,
  }
});

const ComponentForDefault = (props) => {
  const [number, onChangeNumber] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [singleFile, setSingleFile] = React.useState(''); 
  const [stlFile, setStlFile] = React.useState('');
  const [stlurl, setStlurl] = React.useState('')

  const selectOneFile = async () => {    
    //Opening Document Picker for selection of one file
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      //Printing the log realted to the file
      // console.log('res : ' + JSON.stringify(res));
      // console.log('URI : ' + res.uri);
      // console.log('Type : ' + res.type);
      // console.log('File Name : ' + res.name);
      // console.log('File Size : ' + res.size);
      props.handleclear()
      setSingleFile(res);      
      myFunction(res)                  
      //Setting the state to show single file attributes
      // props.handleclear()
    } catch (err) {
      //Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        //If user canceled the document selection
        // Alert.alert('Canceled from single doc picker');
      } else {
        //For Unknown Error
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };

  const myFunction = async (resp) => {    
    var dens = 1.24;//set dens;
     
    try {
      setLoading(true) 
      const fs = require("react-native-fs"); // moved this as a step toward browser compatibility
      var parseObj = new NodeStl()

      RNFS.readFile(resp.uri).then(res => {
        var buffer = res
        stl = parseObj._parse(buffer, dens); 
        // console.log(stl)
        // console.log(stl.volume + 'cm^3');     // 21cm^3
        // console.log(stl.weight + 'gm');       //  1gm
        // console.log(stl.boundingBox, '(mm)');  // [60,45,50] (mm)
        // console.log(stl.area, '(m)');          // 91.26 (m)
        // console.log(stl.centerOfMass, '(mm)'); // [30,22.5,25] (mm)
        // console.log(stl.volume * 1000 + 'mm^3');   
        tempfile = {
          name: resp.name,
          size: resp.size,
          volume: stl.volume,
          boundingBox: stl.boundingBox
        }
        
        props.handlechange(tempfile);
        setStlFile(tempfile)    
                                       
      })
        .then((contents) => {
          setLoading(false)                            
        })
        .catch(err => {
          console.log(err.message, err.code);
          setLoading(false)
        })
      // const stl = await new NodeStl(uri, { density: dens });

    } catch (err) {

    }
  }

  const onConfirmUrl = async () => {        
    // console.log(RNFS.DocumentDirectoryPath)
    RNFS.downloadFile({
      fromUrl: stlurl,
      toFile: ` content://com.android.providers.downloads.documents/document/downstl.stl`,
    })
    .promise.then((r) => {
      console.log(r)
    });
  }
 
  const onChangeUrl = (event) => {
    onChangeNumber(event)
    if(event) {
      setStlurl(event)
      
    } else {
      setStlurl('')
    }
  }

  return (
    <View>
      <View style={styles.centerElement, {width: 120}}>
        {/*To show single file attribute*/}
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.appButtonContainer}
          onPress={selectOneFile}>
          {/*Single file selection button*/}
          <Text style={styles.appButtonText}>
            Upload STL
          </Text>
        </TouchableOpacity>
        {/* <Text>    or    </Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeUrl}
          value={number}
          placeholder="url of the STL file"
          keyboardType="url"
        />
        <TouchableOpacity style={[styles.centerElement, {width: 32, height: 32,}]} onPress={() => onConfirmUrl()}>
          <FontAwesome style={{color: '#009688', fontSize : 17}} icon={SolidIcons.check}/>									
        </TouchableOpacity> */}
      </View>
      {loading ? (
        <View>
          <View >
            <ActivityIndicator size="large" color="#009688" visible={loading}/>  
          </View>
        </View>
      ) : (
        stlFile && props.clearstl ? (
          <Text>            
            {'\n'}
            File Name: {stlFile.name ? stlFile.name : ''}
            {'\n'}{'\n'}
            File Size: {stlFile.size ? (parseFloat(stlFile.size)/1024).toFixed(2)+'Kbytes' : ''}
            {'\n'}{'\n'}
            Volume: {stlFile.volume ? parseFloat(stlFile.volume).toFixed(4)+'(cm^3)' : ''}
            {'\n'}{'\n'}
            Bounding Box: {stlFile.boundingBox ? parseFloat(stlFile.boundingBox[0]).toFixed(1)+'*'+parseFloat(stlFile.boundingBox[1]).toFixed(1)+'*'+parseFloat(stlFile.boundingBox[2]).toFixed(1) +'(mm)' : ''}        
          </Text>
        ) : (
          <>
          </>
        )        
      )}
    </View>
  )
};

const ComponentForIos = () => {
  const [number, onChangeNumber] = React.useState(null);
  const [stlFile, onChangeStlFile] = React.useState(null);
  return (
    <View>
      <Button
        onPress={() => Alert.alert('Simple Button pressed')}
        title="Upload STL"
        accessibilityLabel="Upload STL"
      />
      <Text>{"\n"}</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeNumber}
        value={number}
        placeholder="STL file url"
        keyboardType="url"
      />
    </View>
  )
};

const Upload_stl = Platform.select({

  ios: (props) => ComponentForIos(props),  

  default: (props) => ComponentForDefault(props)

});

export default Upload_stl;