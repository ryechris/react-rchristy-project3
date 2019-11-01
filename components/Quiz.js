import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet
} from 'react-native'
import { connect } from 'react-redux'
import { clearLocalNotification, setLocalNotification } from '../utils/api'

class Quiz extends React.Component {
  componentDidMount() {
    clearLocalNotification()
      .then(setLocalNotification);
  }
  state = {
    pos: 0,
    showAnswer: false,
    numCorrect: 0,
    numIncorrect: 0
  }

  addCorrect = () => {
    this.setState((state) => ({
      numCorrect: state.numCorrect + 1,
      pos: state.pos + 1
    }))
  }

  addIncorrect = () => {
    this.setState((state) => ({
      numIncorrect: state.numIncorrect + 1,
      pos: state.pos + 1
    }))
  }

  toggleShowAnswer = () => {
    this.setState((state) => ({
      showAnswer: !state.showAnswer
    }))
  }

  reset = () => {
    this.setState(() => ({
      pos: 0
    }))
  }

  render() {
    const { navigation, entries } = this.props
    const { deckTitle, deckLength, updateDecks } = navigation.state.params
    if (deckLength === 0) {
      return (
        <View>
          <Text>This deck has no cards. Click 'Add Card' to add some.</Text>
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
        </View>
      )
    }
    const { questions } = entries[deckTitle]
    let { pos, showAnswer } = this.state
    if (pos >= deckLength) {
      return (
        <View>
          <Text>You scored {this.state.numCorrect} correct out of {deckLength} !</Text>
          <TouchableOpacity onPress={this.reset}>
            <Text>Restart Quiz</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate(
              'Deck',
              { deckTitle, deckLength, updateDecks }
            )}
          >
            <Text>Back to Deck</Text>
          </TouchableOpacity>
        </View>
      )
    }
    let { question, answer } = questions[pos]
    return (
      <View>
        { showAnswer
          ? <View>
              <Text>{answer}</Text>
              <TouchableOpacity onPress={this.toggleShowAnswer}>
                <Text>Show Question</Text>
              </TouchableOpacity>
            </View>
          : <View>
              <Text>{question}</Text>
              <TouchableOpacity onPress={this.toggleShowAnswer}>
                <Text>Show Answer</Text>
              </TouchableOpacity>
            </View>
        }
        <TouchableOpacity onPress={this.addCorrect}>
          <Text>Correct</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.addIncorrect}>
          <Text>Incorrect</Text>
        </TouchableOpacity>
        <Text>Number of Questions remaining: X</Text>
      </View>
    )
  }
}

function mapStateToProps(entries) {
  return  {
    entries
  }
}

export default connect(mapStateToProps)(Quiz)

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
