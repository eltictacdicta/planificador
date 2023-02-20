import React from 'react'
import { View,Text,Pressable,TextInput,StyleSheet } from 'react-native'

const NuevoPresupuesto = () => {
  return (
    <View style={styles.contenedor}>
        <Text>
            NuevoPresupuesto
        </Text>
        <TextInput />
        <Pressable>
            <Text>Agregar persupuesto</Text>
        </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
    contenedor:{
        backgroundColor:'#FFF',
        marginHorizontal: 10,
        borderRadius:10,
        paddingHorizontal:40,
        paddingVertical:20,
        transform: [{ translateY: 50 }],
        shadowColor: "#000",
        shadowOffset: {
	        width: 0,
	        height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    }
})

export default NuevoPresupuesto