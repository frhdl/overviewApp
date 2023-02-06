import * as React from 'react';
import type {PropsWithChildren} from 'react';
import {
    Button,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    SafeAreaView,
    StatusBar,
  } from 'react-native';

  import {
    Colors,
  } from 'react-native/Libraries/NewAppScreen';

  import {NavigationContainer} from '@react-navigation/native';
  import { createNativeStackNavigator } from '@react-navigation/native-stack';
  const Stack = createNativeStackNavigator();


  type SectionProps = PropsWithChildren<{
    title: string;
  }>;

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
  }

const Get = ({navigation}) => {
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
            <View
            style={{
                backgroundColor: isDarkMode ? Colors.black : Colors.white,
            }}>
                <Section title="Request Button">
                    <Button 
                      onPress={() => {
                          navigation.navigate('Home')
                      }}
                      title={'Home'}
                    />
                    <Button 
                      onPress={() => {
                          console.log("hi2");
                      }}
                      title={'GET: google.com'}
                    />
                </Section>
            </View>
        </SafeAreaView>
    );
}

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

  export default Get;