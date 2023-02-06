/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  ActivityIndicator,
  Button,
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

const Stack = createNativeStackNavigator();

type Movie = {
  id: string;
  title: string;
  releaseYear: string;
};

//const UserName = '';

function Section({children, title}: SectionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const Get = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const [data, setData] = useState<Movie[]>([]);
  const [isLoading, setLoading] = useState(true);

  const getMovies = async () => {
    try {
      const response = await fetch('https://reactnative.dev/movies.json');
      const json = await response.json();
      setData(json.movies);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  const backgroundStyle = {
      backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return(
      <SafeAreaView style={backgroundStyle}>
          <StatusBar
              barStyle={isDarkMode ? 'light-content' : 'dark-content'}
              backgroundColor={backgroundStyle.backgroundColor}
          />
          <View
          style={{
              backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
              <Section title="Movies">
                  <Button 
                    onPress={() => {
                        navigation.navigate('Home')
                    }}
                    title={'Home'}
                  />
              </Section>
              {isLoading ? (
                  <ActivityIndicator />
                    ) : (
                      <FlatList
                        data={data}
                        keyExtractor={({id}) => id}
                        renderItem={({item}) => (
                          <Text>
                            {item.title}, {item.releaseYear}
                          </Text>
                        )}
                      />
                )}
          </View>
      </SafeAreaView>
  );
}

const UserProfile = ({navigation}) => {
  const [UserName, setUserName] = useState<String>();
  return (
    <View>
        <TextInput
          style={{height: 40}}
          placeholder="Type the name here"
          onChangeText={newText => setUserName(newText)}
        />
        <Text style={{padding: 10, fontSize: 12}}>
          Welcome: {UserName}
        </Text>
        <Button 
          onPress={() => {
            navigation.navigate('Home')
          }}
            title={'Home'}
        />
    </View>
  );
};

const Home = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
      backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return(
      <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="Sample App">
          <Button 
              onPress={() => {
                navigation.navigate('UserProfile')
              }}
              title={'User Profile'}
            />
            <Button 
              onPress={() => {
                navigation.navigate('Get')
              }}
              title={'Get Movies'}
            />
          </Section>
        </View>
      </ScrollView>
      </SafeAreaView>
  );
};

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
          name="Home"
          component={Home}
          options={{title: 'Welcome'}}
        />
        <Stack.Screen name="Get" component={Get} />
        <Stack.Screen name="UserProfile" component={UserProfile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
