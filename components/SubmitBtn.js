import React from 'react'
import { Platform, TouchableOpacity, Text, StyleSheet } from 'react-native'

export default function SubmitBtn ({ onPress }) {
  return (
    <TouchableOpacity
      style={  Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmmitBtn }
      onPress={onPress}
    ><Text style={styles.submitBtnText}>Submit</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
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
