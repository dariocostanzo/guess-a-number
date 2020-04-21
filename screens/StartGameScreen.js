import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert
} from 'react-native';

import Card from '../components/Card';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';
import Colors from '../constants/colors';

const StartGameScreen = props => {
  //Set up the usestate call and register some state
  const [enteredValue, setEneteredValue] = useState('');
  // numberInputHandler will get the inputText and that's the function which I want to connect to my input
  // and there to "onChangeText", point at the numberInputHandler and feed the value back in and that's our entered
  // value.
  // onChangeText={numberInputHandler}
  // value={enteredValue}

  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState();

  const numberInputHandler = inputText => {
    // To validate the input I set the entereValue to inputText where I replace some content based on a regular expression
    // /[replacing anything that's not a number]/ g = globally, with an '' empty string
    setEneteredValue(inputText.replace(/[^0-9]/g, ''));
  };

  // resetInputHandler calls setEnteredValue which is our state setting function to update the state we feed back
  // into the input and set this to an empty string
  const resetInputHandler = () => {
    setEneteredValue('');
    setConfirmed(false);
  };

  const confirmInputHandler = () => {
    const chosenNumber = parseInt(enteredValue);
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert(
        'Invalid number!',
        'Number has to be a number between 1 and 99',
        [{ text: 'Okay', style: 'destructive', onPress: resetInputHandler }]
      );
      return;
    }
    setConfirmed(true);
    // set the endered value with parseInt by passing the entered value, so I set this to be my selected number
    setSelectedNumber(chosenNumber);
    setEneteredValue(''); //will be queued by React and prcessed the next time the component is rendered
    Keyboard.dismiss();
  };

  let confirmedOutupt;

  if (confirmed) {
    confirmedOutupt = (
      <Card style={styles.summaryContainer}>
        <Text>You selectd</Text>
        <NumberContainer>{selectedNumber}</NumberContainer>
        <Button
          title='START GAME'
          // onStartGame is a property of <StartGameScreen> in App.js and forward the currently selected number
          // to onStartGame, managed in the state of StartGameScreen bound to the startGameHandler in App.js
          onPress={() => props.onStartGame(selectedNumber)}
        />
      </Card>
    );
  }

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.screen}>
        <Text style={styles.title}>Start a new Game!</Text>
        <Card style={styles.inputContainer}>
          <Text>Select a Number</Text>
          <Input
            style={styles.input}
            blurOnSubmit
            autoCapitalize='none'
            autoCorrect={false}
            keyboardType='number-pad'
            maxLength={2}
            onChangeText={numberInputHandler}
            value={enteredValue}
          />
          <View style={styles.ButtonContainer}>
            <View style={styles.button}>
              <Button
                style={styles.button}
                color={Colors.accent}
                title='Reset'
                onPress={resetInputHandler}
              />
            </View>
            <View style={styles.button}>
              <Button
                style={styles.button}
                color={Colors.primary}
                title='Confirm'
                onPress={confirmInputHandler}
              />
            </View>
          </View>
        </Card>
        {confirmedOutupt}
      </View>
    </TouchableWithoutFeedback>
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
  },
  button: {
    width: 100
  },
  input: {
    width: 50,
    textAlign: 'center'
  },
  summaryContainer: {
    marginTop: 20,
    alignItems: 'center'
  }
});

export default StartGameScreen;
