import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableHighlight,
} from 'react-native';
import Login from './src/pages/Login';
import Feed from './src/pages/Feed';
import Likes from './src/pages/Likes';
import Comments from './src/pages/Comentários';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
const Stack = createStackNavigator();
import logo from './assets/instagram.png';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const handleLogout = async ({ navigation }) => {
    await AsyncStorage.removeItem('loggedIn');

    navigation.navigate('Login');
  };

  return (
    <View style={style.container}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Login'>
          <Stack.Screen
            name='Login'
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='Feed'
            component={Feed}
            options={({ navigation }) => ({
              headerTitle: null,
              headerLeft: () => (
                <Image style={{ marginLeft: 10 }} source={logo} />
              ),
              headerRight: () => (
                <TouchableHighlight
                  style={{
                    marginRight: 10,
                    backgroundColor: '#038cfc',
                    padding: 10,
                    borderRadius: 3,
                  }}
                  onPress={() => handleLogout({ navigation })}
                >
                  <Text style={{ color: 'white', fontSize: 16 }}>Logout</Text>
                </TouchableHighlight>
              ),
            })}
          />
          <Stack.Screen name='Likes' component={Likes} />
          <Stack.Screen name='Comentários' component={Comments} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
