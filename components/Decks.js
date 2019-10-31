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

function Item({navigation, title, count}) {
  return (
    <TouchableOpacity onPress={() => navigation.navigate(
      'Deck',
      { deckTitle: title, deckLength: count }
    )}>
      <Text>{title}</Text>
      <Text>{count}</Text>
    </TouchableOpacity>
  )
}

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
  render() {
    const { entries } = this.props
    return (
      <SafeAreaView>
        <FlatList
          data={Object.keys(entries)}
          renderItem={({item}) => {
            console.log('ITEM ITEM: ', item)
            return (
              <Item
                navigation={this.props.navigation}
                title={entries[item].title}
                count={entries[item].questions.length}
              />
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
  console.log('III. ENTRIES ENTRIES LOOKIE LOOKIE: ', entries)
  return  {
    entries
  }
}

export default connect(mapStateToProps)(Decks)


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

You might want to put the two buttons in one view so tht you can put them together in the bottom.

function UdaciStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

<View style={styles.container}>
  <Text>
    Deck 1
  </Text>
  <Text>
    5 cards
  </Text>
  <TouchableOpacity style={styles.button}>
    <Text style={styles.buttonText}>
      Add Card
    </Text>
  </TouchableOpacity>
  <TouchableOpacity style={styles.button}>
    <Text style={styles.buttonText}>
      Start Quiz
    </Text>
  </TouchableOpacity>
</View>

 */
