import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  FlatList
} from 'react-native'
import { fetchDecks } from '../utils/api'
import { connect } from 'react-redux'
import { receiveEntries } from '../actions'
import { createStackNavigator } from 'react-navigation-stack'
import { NavigationActions } from 'react-navigation'
import Deck from './Deck'

class Decks extends React.Component {
  state = {
    ready: false
  }

  componentDidMount() {
    const { entries, dispatch } = this.props
    fetchDecks()
      .then((entries) => dispatch(receiveEntries(entries)))
      .then(() => this.setState(() => ({
        ready: true
      })))
  }

  updateState = () => {
    this.setState((state) => ({
      ready: !state.ready
    }))
  }

  render() {
    const { entries, navigation } = this.props
    return (
      <SafeAreaView>
        <FlatList
          data={Object.keys(entries)}
          renderItem={({item}) => {
            const { title, questions } = entries[item]
            const count = questions.length
            return (
              <TouchableOpacity onPress={() => navigation.navigate(
                'Deck',
                { deckTitle: title,
                  deckLength: count,
                  updateDecks: this.updateState
                }
              )}>
                <Text>{title}</Text>
                <Text>{count}</Text>
              </TouchableOpacity>
            )
          }}
        />
      </SafeAreaView>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between'
  },
  button: {
    padding: 10,
    backgroundColor: 'purple',
    alignSelf: 'center',
    borderRadius: 5,
    margin: 20
  },
  buttonText: {
    color: 'white',
    fontSize: 20
  }
})

function mapStateToProps(entries) {
  return  {
    entries
  }
}
export default connect(mapStateToProps)(Decks)
