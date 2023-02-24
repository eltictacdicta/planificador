import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Alert,
  Image,
  Modal

} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from './src/components/Header';
import NuevoPresupuesto from './src/components/NuevoPresupuesto';
import ControlPresupuesto from './src/components/ControlPresupuesto';
import FormularioGasto from './src/components/FormularioGasto';
import ListadoGastos from './src/components/ListadoGastos';
import Filtro from './src/components/Filtro';
import { generarId } from './src/helpers';


function App(): JSX.Element {

  const [presupuesto,setPresupuesto] = useState(0)
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false)
  const [gastos, setGastos] = useState([])
  const [modal, setModal] = useState(false)
  const [gasto, setGasto] = useState({})
  const [filtro, setFiltro] = useState('')
  const [gastosFiltrados, setGastosFiltrados] = useState([])


  

  useEffect(()=>{
    if(isValidPresupuesto){
      const guardarPresupuestoStorage =async () => {
        try {
          await AsyncStorage.setItem('planificador_presupuesto', presupuesto)
        } catch (error) {
          console.log(error)
        }
      }
      guardarPresupuestoStorage()
    }
  },[isValidPresupuesto])

  useEffect(()=>{
    const obtenerPresupuestoStorage = async () => {
      try {
        const presupuestoStorage = await AsyncStorage.getItem('planificador_presupuesto') ?? 0
        if(presupuestoStorage>0){
          setPresupuesto(presupuestoStorage)
          setIsValidPresupuesto(true)
        }
      } catch (error) {
        console.log(error)
      }
    }
    obtenerPresupuestoStorage()
  },[])


  useEffect(()=>{
    if(isValidPresupuesto){
      const guardarGastosStorage =async () => {
        try {
          await AsyncStorage.setItem('planificador_gastos', JSON.stringify(gastos))
        } catch (error) {
          console.log(error)
        }
      }
      guardarGastosStorage()
    }
  },[gastos])


  useEffect(()=>{
    const obtenerGastosStorage = async () => {
      try {
        const gastosStorage = await AsyncStorage.getItem('planificador_gastos') 
        setGastos( gastosStorage ? JSON.parse(gastosStorage):[])
      } catch (error) {
        console.log(error)
      }
    }
    obtenerGastosStorage()
  },[])

  const resetearApp = () =>{
    Alert.alert('¿Deseas resetear la APP?','Esto eliminará presupuestos y gastos',[{text:'No',style: 'cancel'},{text:'Si eliminar', onPress: async ()=>{
      try {
        await AsyncStorage.clear()
        setIsValidPresupuesto(false)
        setPresupuesto(0)
        setGastos([])
      } catch (error) {
        console.log(error)
      }
    }}])
  }


  const handleNuevoPresupuesto = presupuesto =>{
    if(Number(presupuesto)>0){
      setIsValidPresupuesto(true)
    }
    else{
      Alert.alert('Error','El Presupuesto no es Valido',[{text:'Ok'}])
    }
  }

  const handleGasto = gasto =>{
    if([gasto.nombre, gasto.categoria, gasto.cantidad].includes('')){
      Alert.alert(
        'Error','Todos los campos son obligatorios',[{text:'OK'}]
      )
      return
    }
    //Añadimos gasto
    if(gasto.id)
    {
      const gastosActualizados = gastos.map(gastoSetate => gastoSetate.id === gasto.id ? gasto : gastoSetate)
      setGastos(gastosActualizados)
      setGasto({})
    }else{
      gasto.id = generarId()
      gasto.fecha = Date.now()
      setGastos([...gastos, gasto])
    }
    setModal(!modal)
  }

  const eliminarGasto = id =>{
    Alert.alert('¿Deseas eliminar este gasto?', 
    'Un gasto eliminado no se puede eliminar',
    [
      {text: 'No', style: 'cancel'},
      { text: 'Si, Eliminar', onPress:()=>{
        const gastosActualizados = gastos.filter(gastoState => gastoState.id !== id)
        setGastos(gastosActualizados)
        setGasto({})
      }}
    ])
  }

  return (
    <SafeAreaView style={styles.contenedor}>
      <ScrollView>
        <View style={styles.header}>
          <Header />
          {isValidPresupuesto ? (
          <ControlPresupuesto
            presupuesto={presupuesto}
            gastos={gastos}
            resetearApp={resetearApp}

          />) : (
          <NuevoPresupuesto
            handleNuevoPresupuesto={handleNuevoPresupuesto}
            presupuesto={presupuesto}
            setPresupuesto={setPresupuesto}
          />) }
          
        </View>
        
        {isValidPresupuesto &&(
          <>
            <Filtro 
              setFiltro={setFiltro}
              filtro={filtro}
              gastos={gastos}
              setGastosFiltrados={setGastosFiltrados}
            />
            <ListadoGastos
              gastos={gastos}
              setModal={setModal}
              setGasto={setGasto}
              filtro={filtro}
              gastosFiltrados={gastosFiltrados}
            />
          </>
        )}
      </ScrollView>
      {modal &&(
        <Modal
          animationType='slide'
          visible={modal}
        >
          <FormularioGasto
            setModal={setModal}
            handleGasto={handleGasto}
            gasto={gasto}
            setGasto={setGasto}
            eliminarGasto={eliminarGasto}
          />
        </Modal>
      )}

      {isValidPresupuesto &&(
        <Pressable 
          style={styles.pressable}
          onPress={()=> setModal(!modal)}
        >
          <Image style={styles.imagen}
            source={require('./src/img/nuevo-gasto.png')}
          />
        </Pressable>
      )}
      
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: '#F5F5F5',
    flex: 1
  },
  header: {
      backgroundColor: '#3B82F6',
      minHeight: 500
  },
  pressable: {
    width: 60,
    height: 60, 
    position: 'absolute',
    bottom: 40,
    right: 30
  },  
  imagen: {
    width: 60,
    height: 60
  }

});
export default App;
