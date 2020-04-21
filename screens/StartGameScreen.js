import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import Card from '../components/Card';

const StartGameScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Start a new Game!</Text>
      <Card style={styles.inputContainer}>
        <Text>Select a Number</Text>
        <TextInput />
        <View style={styles.ButtonContainer}>
          <Button title='Reset' onPress={() => {}} />
          <Button title='Confirm' onPress={() => {}} />
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1, // it takes all the space it can get
    padding: 10,
    alignItems: 'center' //align in the center horizontally
  },
  inputContainer: {
    width: 300,
    maxWidth: '80%',
    alignItems: 'center' //in the center of the cross axes which is left and right
  },
  title: {
    fontSize: 20,
    marginVertical: 10 //it replaces marginBottom and marginTop
  },
  ButtonContainer: {
    flexDirection: 'row',
    width: '100%',
    //the buttons sit on the left and right edge of the row and distribute all the available free space between them
    justifyContent: 'space-between',
    paddingHorizontal: 15 // adds some spacing to the left and right
  }
});

export default StartGameScreen;
