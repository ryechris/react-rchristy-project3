import React from 'react'
import {
  View,
  Text,
  Platform,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  StatusBar
} from 'react-native'
import { addDeck } from '../utils/api'
import { connect } from 'react-redux'
import { addEntry } from '../actions'
import { NavigationActions } from 'react-navigation'
import SubmitBtn from './SubmitBtn'

class AddDeck extends React.Component {
  state = {
    input: ''
  }

  handleTextChange = (input) => {
    this.setState(() => ({
      input
    }))
  }

  submit = () => {
    const { input } = this.state
    this.props.dispatch(addEntry({
      [input]: {
        title: input,
        questions: []
      }
    }))
    addDeck(input)
    this.toHome()
  }

  toHome = () => {
    this.props.navigation.dispatch(NavigationActions.back({
      key: 'AddDeck'
    }))
  }

  render() {
    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <Text>
          What will be the the name of your new deck?
        </Text>
        <TextInput
          value={this.state.input}
          style={styles.inpt}
          onChangeText={this.handleTextChange}
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
    justifyContent: 'flex-start',
    paddingTop: 120,
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

export default connect()(AddDeck)
