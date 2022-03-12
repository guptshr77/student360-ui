import React, {useEffect, useState} from 'react';
import { StyleSheet, Image, Text, View, SafeAreaView, Button, ActivityIndicator, FlatList, Picker} from 'react-native'; 
import Colors from '../config/Colors.js';
import globalStyles from '../config/globalStyles';
import enviornment from '../config/enviornment';

export default function App({route, navigation}) {
    const {userId, firstName, lastName} = route.params;
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [day,setDay] = useState("");

    const getLunchMenu = async () => {
      try{
        const response = await fetch(enviornment.restUrl + 'lunchmenu');
        const json = await response.json();
        console.log(json);
        setData(json);
      } catch (error) {
        console.error(error);
      }finally{
        setLoading(false);
      }
    }
    useEffect(() => {
      getLunchMenu();
    }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lunch Menu</Text>

      {/* <Picker
        selectedValue = {day}
        onValueChange = {(itemValue) => setDay(itemValue)}
      >
        <Picker.Item key="" label="" value=""/>
        {data.map ((obj, day) => (
          <Picker.Item key={obj.day} label={obj.day} value={obj.foodItems + ", " + obj.grabNGo + ", " + obj.milks}/>
        ))}

      </Picker>
      <Text>{day}</Text> */}

      {isLoading ? <ActivityIndicator/> : (
        <FlatList
          data={data}
          keyExtractor = {({ day }, index) => day}
          renderItem = {({item}) => (
            <View>

              <Text style={styles.dayTitle}>{item.day}</Text>

              <Text>{`\n`}</Text>
              <Text style={styles.subTitles}>{`\t`}Hot Lunch:</Text>
              <Text style={styles.items}>{`\t`}{`\t`}{item.foodItems}</Text>
              <Text style={styles.subTitles}>{`\t`}Grab N Go:</Text>
              <Text style={styles.items}>{`\t`}{`\t`}{item.grabNGo}</Text>
              <Text style={styles.subTitles}>{`\t`}Milk:</Text>
              <Text style={styles.items}>{`\t`}{`\t`}{item.milks}</Text>

              <Text>{`\n`}</Text>
            </View>
          )}
        />
      )}

      <Button
        title="Go Back" 
        onPress={() => navigation.goBack()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.c5,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  dayTitle:{
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.c1
  },
  subTitles:{
    fontSize: 15,
    fontWeight: 'bold',
    color: Colors.c1,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: Colors.c1,
    textDecorationLine: 'underline'
  },
  items: {
    fontSize: 15,
    fontWeight: 'bold',
    color: Colors.black
  }
});

//https://www.npmjs.com/package/react-native-collapsible 
//collapsable list