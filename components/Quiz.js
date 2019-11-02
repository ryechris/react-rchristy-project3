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
import { black, white, green, blue, purple } from '../utils/colors'


class Quiz extends React.Component {
  componentDidMount() {
    clearLocalNotification()
      .then(setLocalNotification);
  }
  state = {
    pos: 0,
    showAnswer: false,
    numCorrect: 0,
    numIncorrect: 0,
    remaining: this.props.navigation.state.params.deckLength
  }

  addCorrect = () => {
    this.setState((state) => ({
      numCorrect: state.numCorrect + 1,
      pos: state.pos + 1,
      remaining: state.remaining - 1
    }))
  }

  addIncorrect = () => {
    this.setState((state) => ({
      numIncorrect: state.numIncorrect + 1,
      pos: state.pos + 1,
      remaining: state.remaining - 1
    }))
  }

  toggleShowAnswer = () => {
    this.setState((state) => ({
      showAnswer: !state.showAnswer
    }))
  }

  reset = () => {
    this.setState(() => ({
      pos: 0,
      remaining: this.props.navigation.state.params.deckLength
    }))
  }

  render() {
    const { navigation, entries } = this.props
    const { deckTitle, deckLength, updateDecks } = navigation.state.params
    if (deckLength === 0) {
      return (
        <View style={styles.c2}>
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
    let { pos, showAnswer, remaining } = this.state
    if (pos >= deckLength) {
      return (
        <View style={styles.container}>
          <Text>You scored {this.state.numCorrect} correct out of {deckLength} !</Text>
          <TouchableOpacity style={styles.quizEnd} onPress={this.reset}>
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
      <View style={styles.container}>
        { showAnswer
          ? <View style={styles.header}>
              <Text style={styles.headerText}>{answer}</Text>
              <TouchableOpacity style={styles.toggle} onPress={this.toggleShowAnswer}>
                <Text>Show Question</Text>
              </TouchableOpacity>
            </View>
          : <View style={styles.header}>
              <Text style={styles.headerText}>{question}</Text>
              <TouchableOpacity style={styles.toggle} onPress={this.toggleShowAnswer}>
                <Text>Show Answer</Text>
              </TouchableOpacity>
            </View>
        }
        <View>
          <TouchableOpacity style={styles.correct} onPress={this.addCorrect}>
            <Text style={styles.buttonText}>Correct</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.incorrect} onPress={this.addIncorrect}>
            <Text style={styles.buttonText}>Incorrect</Text>
          </TouchableOpacity>
        </View>
        <Text>Number of Questions remaining: {remaining}</Text>
      </View>
    )
  }
}

mapStateToProps = (entries) => ({entries})

export default connect(mapStateToProps)(Quiz)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  c2: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 55,
  },
  header: {
    flex: 1,
    marginTop: 20,
    maxHeight: 50,
    alignItems: 'center'
  },
  headerText: {
    fontSize: 30,
    marginBottom: 10
  },
  toggle: {
    borderWidth: 1,
    borderColor: black,
  },
  correct: {
    padding: 10,
    backgroundColor: green,
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 10,
    width: 100
  },
  incorrect: {
    padding: 10,
    backgroundColor: blue,
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 5,
    width: 100
  },
  buttonText: {
    color: white,
    fontSize: 20
  },
  button: {
    padding: 10,
    backgroundColor: purple,
    alignSelf: 'center',
    borderRadius: 5,
    margin: 30
  },
  quizEnd: {
    borderWidth: 1,
    borderColor: black,
    padding: 5}
})
