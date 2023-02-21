import React, { useState, useEffect } from 'react'
import { Text, SafeAreaView, View, TextInput, StyleSheet, Pressable} from 'react-native'
import {Picker} from '@react-native-picker/picker'
import globalStyles from '../styles'

const FormularioGasto = ({
    
}) => {
    

    return (
        <SafeAreaView style={styles.contenedor}>
            <View style={styles.contenedorBotones}>
                <Pressable>
                    <Text>X Cancelar</Text>
                </Pressable>
                <View>
                    <Text>Nombre Gasto</Text>
                    <TextInput
                        placeholder='Nombre del gasto'
                    />
                </View>

                <View>
                    <Text>Cantidad del Gasto</Text>
                    <TextInput
                        placeholder='Cantidad del gasto'
                        keyboardType='numeric'
                    />
                </View>

                <View>
                    <Text>Categoría del gasto del Gasto</Text>
                    <Picker>
                        <Picker.Item label='-- Selecciona una opción --' value="" />
                        <Picker.Item label='Ahorro' value="ahorro" />
                    </Picker>
                </View>

            </View>    

            <View style={styles.formulario}>
                
                
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    contenedor: {
        backgroundColor: '#1E40AF', 
        flex: 1
    },
    contenedorBotones: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    btn: {
        padding: 10,
        marginTop: 30,
        marginHorizontal: 10,
        flex: 1
    },
    btnCancelar: {
        backgroundColor: '#DB2777', 
    },
    btnEliminar: {
        backgroundColor: 'red'
    },
    btnTexto: {
        textAlign: 'center',
        textTransform: 'uppercase',
        fontWeight: 'bold',
        color: '#FFF'
    },
    formulario: {
        ...globalStyles.contenedor
    },
    titulo: {
        textAlign: 'center',
        fontSize: 28,
        marginBottom: 30,
        color: '#64748B'
    },
    campo: {
        marginVertical: 10
    },
    label: {
        color: '#64748B',
        textTransform: 'uppercase',
        fontSize: 16,
        fontWeight: 'bold'
    },
    input: {
        backgroundColor: '#F5F5F5',
        padding: 10,
        borderRadius: 10,
        marginTop: 10
    },
    submitBtn: {
        backgroundColor: '#3B82F6',
        padding: 10,
        marginTop: 20
    },
    submitBtnTexto: {
        textAlign: 'center',
        color: '#FFF',
        fontWeight: 'bold',
        textTransform: 'uppercase'
    }
})

export default FormularioGasto
