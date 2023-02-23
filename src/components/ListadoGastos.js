import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import Gasto from './Gasto'

const ListadoGastos = ({gastos}) => {
    return (
        <View style={styles.contenedor}>
            <Text style={styles.titulo}>Gastos</Text>
            {gastos.length === 0 ? 
            <Text style={styles.noGastos}>No hay gastos</Text>:
            //console.log(gastos) 
            gastos.map(gasto => {
                //console.log(gasto)
                return <Gasto
                    key={gasto.id}
                    gasto={gasto}
                />
            }
            )
            }
        </View>
    )
}
const styles = StyleSheet.create({
    contenedor: {
        marginTop: 30,
        marginBottom: 100
    },
    titulo: {
        color: '#64748B',
        fontSize: 30,
        textAlign: 'center',
        fontWeight: '700',
        marginTop: 30,
    },
    noGastos: {
        marginVertical: 20,
        textAlign: 'center',
        fontSize: 20
    }
})

export default ListadoGastos
