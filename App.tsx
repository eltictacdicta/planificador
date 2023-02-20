import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,

} from 'react-native';
import Header from './src/components/Header';
import NuevoPresupuesto from './src/components/NuevoPresupuesto';



function App(): JSX.Element {
  

  return (
    <SafeAreaView style={styles.contenedor}>
      <View style={styles.header}>
        <Header />
        <NuevoPresupuesto />
      </View>
      
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
