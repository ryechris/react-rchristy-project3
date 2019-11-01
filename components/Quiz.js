import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet
} from 'react-native'
import { connect } from 'react-redux'


class Quiz extends React.Component {
  state = {
    count: 0
  }

You have deckTitle and deckLength from props or from navstate params.
const { deckTitle, deckLength } = XXX.
const { questions } = entries[deckTitle]
questions = [{question, answer}]
const { question, answer } = questions[x] where x = this.state.x


  render() {
    return (
      <View>
        <Text>[Quiz Question here]</Text>
        <TouchableOpacity>
          <Text>Show Answer</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>Correct</Text>
        </TouchableOpacity>
        <TouchableOpacity>
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

export default connect()(Quiz)
