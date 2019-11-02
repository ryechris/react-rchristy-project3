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

const Deck = ({ navigation, dispatch }) => {
  const { deckTitle, deckLength, updateDecks } = navigation.state.params
  return (
    <View style={styles.container}>
      <View style={styles.c2}>
        <Text style={styles.title}>{deckTitle}</Text>
        <Text style={styles.t2}>{deckLength} cards</Text>
      </View>
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
          { deckTitle, deckLength, updateDecks }
        )}
      >
        <Text style={styles.buttonText}>
          Start Quiz
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          dispatch(deleteEntry(deckTitle));
          deleteDeck(deckTitle);
          updateDecks();
          navigation.navigate('Decks');
        }}
      >
        <Text style={styles.btnText}>
          Delete Deck
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default connect()(Deck)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  c2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    textTransform: 'capitalize',
    fontSize: 20
  },
  t2: {
    fontSize: 15,
    marginBottom: 100
  },
  button: {
    padding: 10,
    backgroundColor: 'purple',
    alignSelf: 'center',
    borderRadius: 5,
    marginBottom: 20
  },
  buttonText: {
    color: 'white',
    fontSize: 20
  },
  btnText: {
    color: 'black',
    marginTop: 50,
    marginBottom: 40
  }
})
