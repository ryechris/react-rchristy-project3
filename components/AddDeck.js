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

function SubmitBtn ({ onPress }) {
  return (
    <TouchableOpacity
      style={  Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmmitBtn }
      onPress={onPress}
    ><Text style={styles.submitBtnText}>Submit</Text>
    </TouchableOpacity>
  )
}

class AddDeck extends React.Component {
  state = {
    input: ''
  }

  handleTextChange = (input) => {
    console.log('THIS IS THE INPUT', input)
    this.setState(() => ({
      input
    }))
  }

  submit = () => {
    console.log('HEYLLO IN THE SUBMIT FUNCTION')
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
      <KeyboardAvoidingView behavior='padding' styles={styles.container}>
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
  iosSubmitBtn: {
    backgroundColor: 'purple',
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft:  40,
    marginRight: 40
  },
  androidSubmmitBtn: {
    backgroundColor: 'purple',
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 100
  },
  submitBtnText: {
    color: 'white',
    fontSize: 22,
    textAlign: 'center'
  }
})

export default connect()(AddDeck)

/*

4. import { connect } from 'react-redux'
import { addEntry }

// pass the invocation of connect
export default connect()(AddEntry)
now AddEntry has access to dispatch
this.props.dispatch

this.props.dispatch(addEntry({
  [key]: entry
}))



*/
