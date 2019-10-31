import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  StatusBar } from 'react-native';
import Deck from './components/Deck'
import Decks from './components/Decks'
import AddDeck from './components/AddDeck'
import AddCard from './components/AddCard'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import Constants from 'expo-constants'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from './reducers'

function FcStatusBar ({ backgroundColor, ...props })  {
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const Tabs = createBottomTabNavigator({
  Decks: {
    screen: Decks,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({tintColor}) => <Ionicons name='ios-bookmarks' size={30} color={tintColor} />
    }
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: 'Add Deck',
      tabBarIcon: ({tintColor}) => <FontAwesome name='plus-square' size={30} color={tintColor} />
    }
  },
}, {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? '#757575' : '#202020',
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? '#202020' : '#757575',
      shadowColor: 'rgba(0,0,0,0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
})

const MainNavigator =  createStackNavigator({
  Home: {
    screen: Tabs
  },
  Deck: {
    screen: Deck,
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.params.deckTitle}`,
      headerStyle: {
        backgroundColor: 'purple',
      }
    }),
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: () => ({
      title: 'Add A Card',
      headerStyle: {
        backgroundColor: 'purple',
      }
    }),
  }
})

const AppContainer =  createAppContainer(MainNavigator)

export default class App extends Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{flex: 1}}>
          <FcStatusBar backgroundColor={'purple'} barStyle='light-content' />
          <AppContainer />
        </View>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});








/*

import StackNavigator;

function Home ({navigation}) {
  return(
    <View>
      <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
        <>
        </>
      </TouchableOpacity>
    </View>
  )
}

const Stack = StackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      title: 'Home'
    }
  },
  Dashboard: {
    screen: Dashboard,
    navigationOptions: {
      title: 'Dashobard',
      headerTintColor: 'purple',
      headerStyle: {
        backgroundColor: 'gray'
      }
    }
  }
})




EntryDetail: {
  screen: EntryDetail,
  navigationOptions: {
    headerTintColor: white,
    headerStyle: {
      backgroundColor: purple
    }
  }
}

 */


/* II. headers*/
