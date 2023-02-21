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



function App(): JSX.Element {

  const [presupuesto,setPresupuesto] = useState(0)
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false)
  const [gastos, setGastos] = useState([])
  const [modal, setModal] = useState(false)

  
  const handleNuevoPresupuesto = (presupuesto) =>{
    if(Number(presupuesto)>0){
      setIsValidPresupuesto(true)
    }
    else{
      Alert.alert('Error','El Presupuesto no es Valido',[{text:'Ok'}])
    }
  }

  return (
    <SafeAreaView style={styles.contenedor}>
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


      {modal &&(
        <Modal
          animationType='slide'
          visible={modal}
        >
          <FormularioGasto
            setModal={setModal}
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
      //minHeight: 400
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
