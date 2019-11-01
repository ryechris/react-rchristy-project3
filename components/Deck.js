import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native'
import { connect } from 'react-redux'
import { fetchDecks, deleteDeck } from '../utils/api'
import { receiveEntries, deleteEntry } from '../actions'
import Decks from './Decks'

class Deck extends React.Component {
  componentDidMount() {
    console.log('THIS.PROPS.NAV.STATE: ', this.props.navigation.state)
  }
  render() {
    const { navigation, dispatch } = this.props
    const { deckTitle, deckLength, updateDecks } = navigation.state.params
    return (
      <View style={styles.container}>
        <Text>{deckTitle}</Text>
        <Text>{deckLength} cards</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate(
            'AddCard',
            { deckTitle, deckLength }
        )}>
          <Text style={styles.buttonText}>
            Add Card
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>
            Start Quiz
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            dispatch(deleteEntry(deckTitle));
            deleteDeck(deckTitle);
            updateDecks();
            navigation.navigate('Decks');
          }}
        >
          <Text style={styles.buttonText}>
            Delete Deck
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default connect()(Deck)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between'
  },
  button: {
    padding: 10,
    backgroundColor: 'purple',
    alignSelf: 'center',
    borderRadius: 5,
    margin: 20
  },
  buttonText: {
    color: 'white',
    fontSize: 20
  }
})






/*

You might want to put the two buttons in one view so tht you can put them together in the bottom.

function UdaciStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

 */
