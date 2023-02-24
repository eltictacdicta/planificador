import React, { useState } from 'react';
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
import Header from './src/components/Header';
import NuevoPresupuesto from './src/components/NuevoPresupuesto';
import ControlPresupuesto from './src/components/ControlPresupuesto';
import FormularioGasto from './src/components/FormularioGasto';
import ListadoGastos from './src/components/ListadoGastos';
import { generarId } from './src/helpers';


function App(): JSX.Element {

  const [presupuesto,setPresupuesto] = useState(0)
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false)
  const [gastos, setGastos] = useState([])
  const [modal, setModal] = useState(false)
  const [gasto, setGasto] = useState({})

  
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
        console.log('eliminando ', id)
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
          />) : (
          <NuevoPresupuesto
            handleNuevoPresupuesto={handleNuevoPresupuesto}
            presupuesto={presupuesto}
            setPresupuesto={setPresupuesto}
          />) }
          
        </View>
        
        {isValidPresupuesto &&(
          <ListadoGastos
            gastos={gastos}
            setModal={setModal}
            setGasto={setGasto}
          />
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
