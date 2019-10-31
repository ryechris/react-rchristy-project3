import React from 'react'
import {
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet
} from 'react-native'
import { NavigationActions } from 'react-navigation'
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
    const { navigation, entries } = this.props
    const { deckTitle } = navigation.state.params
    console.log('I. ENTRIES: ', entries)
    entries[deckTitle].questions.push(this.state)
    console.log('II. ENTRIES: ', entries)
    const questions = entries[deckTitle].questions
    console.log('III. ENTRIES: ', entries)
    const update = { deckTitle, questions }

    // update  Store
    this.props.dispatch(updateEntry(update))

    this.setState(() => ({
      question: '',
      answer:  ''
    }))

    // redirect back to Deck
    this.toDeck()

    // update the oatabase
    addCard(deckTitle, questions)
  }

  toDeck = () => {
    this.props.navigation.dispatch(NavigationActions.back())
  }


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

function mapStateToProps(entries) {
  return  {
    entries
  }
}

export default connect(mapStateToProps)(AddCard)
