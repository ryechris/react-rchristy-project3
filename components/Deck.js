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
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate(
            'Quiz',
            { deckTitle, deckLength }
          )}
        >
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
