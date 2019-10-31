import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet
} from 'react-native'

export default class NotFound extends React.Component {
  render() {
    return (
      <View>
        <Text>
          There are no cards in the deck :(
        </Text>
      </View>
    )
  }
}
