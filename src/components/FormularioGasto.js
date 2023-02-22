import React, { useState, useEffect } from 'react'
import { Text, SafeAreaView, View, TextInput, StyleSheet, Pressable} from 'react-native'
import {Picker} from '@react-native-picker/picker'
import globalStyles from '../styles'


const FormularioGasto = ({
    setModal,
    handleGasto
}) => {
    const [nombre, setNombre] = useState('')
    const [cantidad, setCantidad] = useState('')
    const [categoria, setCategoria] = useState('')

    return (
        <SafeAreaView style={styles.contenedor}>
            <View style={styles.contenedorBotones}>
                <Pressable style={[styles.btnCancelar,styles.btn]}>
                    <Text 
                    style={styles.btnTexto}
                    onLongPress={()=>setModal(false)}
                    >X Cancelar</Text>
                </Pressable>
                
            </View>    

            <View style={styles.formulario}>
            <Text style={styles.titulo}>Nuevo Gasto</Text>
                <View style={styles.campo}>
                    <Text style={styles.label}>Nombre Gasto</Text>
                    <TextInput style={styles.input}
                        placeholder='Nombre del gasto'
                        value={nombre}
                        onChangeText={setNombre}
                    />
                </View>

                <View style={styles.campo}>                    
                <Text style={styles.label}>Cantidad del Gasto</Text>
                    <TextInput style={styles.input}
                        placeholder='Cantidad del gasto'
                        keyboardType='numeric'
                        value={cantidad}
                        onChangeText={setCantidad}
                    />
                </View>

                <View>
                    <Text style={styles.label}>Categoría del gasto del Gasto</Text>
                    <Picker 
                    selectedValue={categoria}
                    onValueChange={(itemValue)=>setCategoria(itemValue)}
                    style={styles.inputPicker}>
                        <Picker.Item label='-- Selecciona una opción --' value="" />
                        <Picker.Item label='Ahorro' value="ahorro" />
                        <Picker.Item label='Comida' value="comida" />
                        <Picker.Item label='Casa' value="casa" />
                        <Picker.Item label='Gastos varios' value="varios" />
                        <Picker.Item label='Ocio' value="ocio" />
                        <Picker.Item label='Salud' value="salud" />
                        <Picker.Item label='Subcripciones' value="subcripciones" />
                    </Picker>
                </View>
                <Pressable 
                    style={styles.submitBtn}
                    onPress={()=>handleGasto({nombre,cantidad,categoria})}
                ><Text style={styles.btnTexto}>Agregar gasto</Text></Pressable>
                
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
    }
    ,
    inputPicker: {
        backgroundColor: '#F5F5F5',
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
