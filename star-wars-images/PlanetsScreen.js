import React, {useEffect, useState} from 'react';
import { Text, 
SafeAreaView, 
FlatList, 
Button, 
ScrollView, 
Switch,
StyleSheet, 
ActivityIndicator, 
TextInput,
TouchableOpacity,
Image
} from 'react-native';
import Animated, { SlideInLeft, SlideOutRight } from
  "react-native-reanimated";
import Slider from "@react-native-community/slider";
import axios from 'axios';
const StarwarsImg = require('./assets/star wars image 2.png');

export default function PlanetsScreen() {
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState([]);

  useEffect(() => {
    const FetchPlanets = async () => {
      try {
        const response = await axios.get('https://www.swapi.tech/api/planets');
        setPlanets(response.data.results);
      } catch (error){
        console.error('Error fetching Planet data', error);
      } finally {
        setLoading(false);
      }
    };
    FetchPlanets();
  }, []);
  if (loading) {
    return (
      <SafeAreaView style={style.center}>
        <ActivityIndicator size='large' color='#0000ff' />
        <Text>Loading Planets...</Text>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={style.container}>
    <SafeAreaView>
      <Image source={StarwarsImg} style={{width: 300, height: 300}} />
    </SafeAreaView>
    <ScrollView>
      <Text style={style.header}>Star Wars Planets:</Text>
      <FlatList
        data={planets}
        keyExtractor={(item) => item.name}
        renderItem={({ item}) =>(
          <SafeAreaView style={style.item}>
            <Text style={style.name}>{item.name}</Text>
          </SafeAreaView>
        )}
      />
      <SafeAreaView style={{flex: 1, marginHorizontal: 20}}>
        <TextInput
          placeholder="Search"
          style={style.searchBox}
        />
      </SafeAreaView>
    </ScrollView>  
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    margin: 5,
    padding: 5,
    textAlign: 'center',
    color: 'black',
  },
  name:{
    margin: 5,
    padding: 5,
    textAlign: 'center',
    fontSize: 24,
    
  },
  header: {
    margin: 5,
    padding: 5,
    textAlign: 'center',
    fontWeight: 'bold',

  },
  searchBox: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
  },
})