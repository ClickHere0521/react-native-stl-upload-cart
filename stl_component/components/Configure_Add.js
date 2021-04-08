import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import FontAwesome, {
	SolidIcons,
	RegularIcons,
	BrandIcons,
	parseIconFromClassName,
  } from 'react-native-fontawesome';

const styles = StyleSheet.create({
    text: {
        fontSize: 30,
        alignSelf: 'center',
        color: 'black',
        width: 300,
        height: 60,
    },
    centerElement: {
        justifyContent: 'center', 
        alignItems: 'center',
        alignSelf: 'center'
    },
})

const Material = (props) => {
    const [technology, setTechnology] = useState('fff');
    const [infill, setInfill] = useState('17');
    const [thickness, setThickness] = useState('0.3');
    const [material, setMaterial] = useState('poWhite');

    props.handleConfigure(
        {
            "technology":technology,
            "infill" : infill,
            "thickness" : thickness,
            "material": material
        }
    )

    return (
        <View>
            <Text>Technology</Text>
            <Picker
                mode="dropdown"
                selectedValue={technology}
                onValueChange={
                    (itemValue, itemIndex) =>
                    setTechnology(itemValue)
                }
                style={styles.text}
            >
                <Picker.Item label="Fused Filament Fabrication (FFF)" value="fff" />
                <Picker.Item label="Stereolithography (SLA)" value="sla" />                
            </Picker>
            <Text>Infill</Text>
            <Picker
                mode="dropdown"
                selectedValue={infill}
                onValueChange={
                    (itemValue, itemIndex) =>
                        setInfill(itemValue)
                }
                style={styles.text}
            >
                <Picker.Item label="100% (Solid object)" value="100" />
                <Picker.Item label="50%" value="50" />
                <Picker.Item label="33%" value="33" />
                <Picker.Item label="25%" value="25" />
                <Picker.Item label="20%" value="20" />
                <Picker.Item label="17%" value="17" />
                <Picker.Item label="12.5%" value="12.5" />
                <Picker.Item label="10%" value="10" />
                <Picker.Item label="5%" value="5" />
                <Picker.Item label="2.5%" value="2.5" />
                <Picker.Item label="0% (Hollow object)" value="0" />                
            </Picker>
            <Text>Layer Thickness</Text>
            <Picker
                mode="dropdown"
                selectedValue={thickness}
                onValueChange={
                    (itemValue, itemIndex) =>
                        setThickness(itemValue)
                }
                style={styles.text}
            >
                <Picker.Item label="0.1mm" value="0.1" />
                <Picker.Item label="0.2mm" value="0.2" />
                <Picker.Item label=">0.2mm" value="0.3" />              
            </Picker>
            <Text>Material</Text>
            <Picker
                mode="dropdown"
                selectedValue={material}
                onValueChange={
                    (itemValue, itemIndex) =>
                        setMaterial(itemValue)
                }
                style={styles.text}
            >
                <Picker.Item label="PLA, Opaque, White" value="poWhite" color='black'/>
                <Picker.Item label="PLA, Opaque, Gray" value="poGray" color='gray'/>
                <Picker.Item label="PLA, Opaque, Black" value="poBlack" color='black'/>
                <Picker.Item label="PLA, Opaque, Red" value="poRed" color='red'/>
                <Picker.Item label="PLA, Opaque, Orange" value="poOrange" color='orange'/>
                <Picker.Item label="PLA, Opaque, Yellow" value="poYellow" color='#b3b300'/>
                <Picker.Item label="PLA, Opaque, Green" value="poGreen" color='green'/>
                <Picker.Item label="PLA, Opaque, Blue" value="poBlue" color='blue'/>
                <Picker.Item label="PLA, Opaque, Purple" value="poPurple" color='purple'/>
                <Picker.Item label="PLA, Translucent, Clear" value="ptClear" color='black'/>
                <Picker.Item label="ABS, Opaque, White" value="aoWhite" color='black'/>
                <Picker.Item label="ABS, Opaque, Gray" value="aoGray" color='gray'/>
                <Picker.Item label="ABS, Opaque, Black" value="aoBlack" color='black'/>
                <Picker.Item label="ABS, Opaque, Red" value="aoRed" color='red'/>
                <Picker.Item label="ABS, Opaque, Orange" value="aoOrange" color='orange'/>
                <Picker.Item label="ABS, Opaque, Yellow" value="aoYellow" color='#b3b300'/>
                <Picker.Item label="ABS, Opaque, Green" value="aoGreen" color='green'/>    
                <Picker.Item label="ABS, Opaque, Blue" value="aoBlue" color='blue'/>
                <Picker.Item label="ABS, Opaque, Purple" value="aoPurple" color='purple'/>      
            </Picker>
        </View>
    );
}

const Configure_Add = (props) => {    
    return (        
        <Material handleConfigure = {props.handleConfigure}/>
    );
}

export default Configure_Add;
