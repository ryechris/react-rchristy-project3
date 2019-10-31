import React from 'react'
import {
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet
} from 'react-native'
import { connect } from 'react-redux'
import SubmitBtn from './SubmitBtn'

class AddCard extends React.Component {
  state = {
    input: ''
  }

  handleTextChange = (input) => {
    this.setState(() => ({
      input
    }))
  }

  submit = () => {

  }

  render() {
    return (
      <KeyboardAvoidingView behavior='padding' styles={styles.container}>
        <Text>
          What's the question?
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
})

export default connect()(AddCard)
