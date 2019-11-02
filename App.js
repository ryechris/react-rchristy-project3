import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  StatusBar } from 'react-native';
import AddCard from './components/AddCard'
import AddDeck from './components/AddDeck'
import Decks from './components/Decks'
import Deck from './components/Deck'
import Quiz from './components/Quiz'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { setLocalNotification } from './utils/api'
import reducer from './reducers'
import Constants from 'expo-constants'
import { white, purple, gray, blk } from './utils/colors'


function FcStatusBar ({ backgroundColor, ...props })  {
  return (
    <View style={styles.statusView}>
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
    activeTintColor: white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? blk : gray,
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
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      }
    }),
  },
  AddCard: {
    screen: AddCard,
    headerTintColor: white,
    navigationOptions: () => ({
      title: 'Add A Card',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      }
    }),
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: () => ({
      title: 'Card',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      }
    }),
  }
})

const AppContainer =  createAppContainer(MainNavigator)

export default class App extends Component {
  componentDidMount () {
    setLocalNotification()
  }
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{flex: 1}}>
          <FcStatusBar backgroundColor={purple} barStyle='light-content' />
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
    backgroundColor: white,
  },
  statusView: {
    backgroundColor: purple,
    height: Constants.statusBarHeight
  }
});
