import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet
} from 'react-native'
import SubmitBtn from './SubmitBtn'

export default class AddCard extends React.Component {
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
