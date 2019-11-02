import React from 'react'
import {
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet
} from 'react-native'
import { connect } from 'react-redux'
import { updateEntry } from '../actions'
import { addCard } from '../utils/api'
import SubmitBtn from './SubmitBtn'

class AddCard extends React.Component {
  state = {
    question: '',
    answer: ''
  }

  handleTextChangeQ = (question) => {
    this.setState(() => ({
      question
    }))
  }

  handleTextChangeA = (answer) => {
    this.setState(() => ({
      answer
    }))
  }

  submit = () => {
    if (this.state.question === '' || this.state.answer ===  '') {
      return alert("Form fields can't be sent as empty")
    }
    const { navigation, entries } = this.props
    const { deckTitle } = navigation.state.params
    entries[deckTitle].questions.push(this.state)
    const questions = entries[deckTitle].questions
    const update = { deckTitle, questions }

    // update  Store
    this.props.dispatch(updateEntry(update))

    this.setState(() => ({
      question: '',
      answer:  ''
    }))

    // redirect back to Deck
    this.toDeck(deckTitle, questions.length)

    // update the oatabase
    addCard(deckTitle, questions)
  }

  // we use navigate's back feature here, but I've opted to use this one
  // so we can pass props and update the Deck screen asap.
  toDeck = (title, count) => {
    this.props.navigation.navigate(
      'Deck',
      { deckTitle: title, deckLength: count }
    )
  }
  /* This implementation would use navigate's back feature
  import { NavigationActions } from 'react-navigation'
  toDeck = () => {
    this.props.navigation.dispatch(NavigationActions.back())
  }
  */

  render() {
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior='padding'
        enabled
      >
        <Text>What's the question?</Text>
        <TextInput
          value={this.state.question}
          style={styles.inpt}
          onChangeText={this.handleTextChangeQ}
        />
        <Text>What's its answer?</Text>
        <TextInput
          value={this.state.answer}
          style={styles.inpt}
          onChangeText={this.handleTextChangeA}
        />
        <SubmitBtn onPress={this.submit} />
      </KeyboardAvoidingView>
    )
  }
}

mapStateToProps = (entries) => ({entries})

export default connect(mapStateToProps)(AddCard)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 25,
    backgroundColor: '#ecf0f1'
  },
  inpt: {
    width: 200,
    height: 44,
    padding: 8,
    borderWidth: 1,
    borderColor: '#757575',
    margin: 50,
  },
})
