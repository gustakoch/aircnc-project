import React, { useState, useEffect } from "react";
import { SafeAreaView, Image, StyleSheet, AsyncStorage } from "react-native";

import logo from '../assets/logo.png';
import SpotList from '../components/spotList';

export default function List() {
  const [techs, setTechs] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem('techs').then(storagedTechs => {
      const techsArray = storagedTechs.split(',').map(tech => tech.trim());

      setTechs(techsArray);
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.logo} source={logo} />

      {techs.map(tech => <SpotList key={tech} tech={tech} />)}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  logo: {
    marginTop: 40,
    height: 42,
    resizeMode: 'contain',
    alignSelf: 'center',
  }

});
