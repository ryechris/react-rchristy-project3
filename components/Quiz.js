import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet
} from 'react-native'

export default class Quiz extends React.Component {
  render() {
    return (
      <View>
        <TextInput
          style={{height: 40, backgroundColor: 'purple'}}
        />
        <TextInput
          style={{height: 40, backgroundColor: 'gray'}}
        />
        <TouchableOpacity>
          <Text>
            Correct
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>
            Incorrect
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}
