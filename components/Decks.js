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
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Flash Cards</Text>
        <Text style={styles.t2}>Deck List</Text>
        <FlatList
          data={Object.keys(entries)}

          renderItem={({item}) => {
            const { title, questions } = entries[item]
            const count = questions.length
            return (
              <TouchableOpacity style={styles.listItem} onPress={() => navigation.navigate(
                'Deck',
                { deckTitle: title,
                  deckLength: count,
                  updateDecks: this.updateState
                }
              )}>
                <Text style={styles.listTest}>{title}</Text>
                <Text style={styles.listTest}>{count} cards</Text>
              </TouchableOpacity>
            )
          }}
          keyExtractor={(item, index) => index.toString()}
        />
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    backgroundColor: '#ecf0f1'
  },
  title: {
    textTransform: 'uppercase',
    fontSize: 20
  },
  t2: {
    marginBottom: 10
  },
  listItem: {
    marginTop: 10,
    marginBottom: 11,
    borderColor: 'black',
    borderWidth: 1,
    width: 200,
    height: 70

  },
  listTest: {
    marginTop: 5,
    marginBottom: 2,
    marginLeft: 5
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
