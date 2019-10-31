import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet
} from 'react-native'

export default class AddCard extends React.Component {
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
            Add Card
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}
