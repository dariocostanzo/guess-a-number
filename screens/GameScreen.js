import React, { useState, useRef, useEffect } from 'react';
// "useEffect", allows to run side effects or in general, allows to run logic after every render cycle

// "useRef" is a hook that allows you to create an object which you can bind to inputs, so to the input elements in jsx, to get access
// to them in the code, it also allows you to define a value which survives components re render
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
  FlatList
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import MainButton from '../components/MainButton';
import BodyText from '../components/BodyText';
import DefaultStyles from '../constants/default-styles';

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
};

const renderListItem = (listLength, itemData) => (
  <View style={styles.listItem}>
    <BodyText>#{listLength - itemData.index}</BodyText>
    <BodyText>{itemData.item}</BodyText>
  </View>
);

const GameScreen = props => {
  const initialGuess = generateRandomBetween(1, 100, props.userChoice);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  // the goal is to add new guest "pastGuesses" to the new array, whenever we generate a new number
  // so in the nextGuessHandler function
  const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]);
  const currentLow = useRef(1);
  const currentHigh = useRef(100);
  // to get userChoice and onGameOver out of our props object and store them in props with equal names
  const { userChoice, onGameOver } = props;

  // "useEffect" takes a function which runs after every render cycle for this compoenent
  // So, every time it has been rendered, this function is executed, A F T E R it has been rendered
  useEffect(() => {
    if (currentGuess === userChoice) {
      // if the game is over call props.onGameOver as a function and forward the amount of rounds it took the computer
      // to guess our result or our choice and that's therefore another state we have to manager her in the game screen.
      // const [rounds, setRounds] = useState(0); (later renamed pastGuesses, setPastGuesses)
      onGameOver(pastGuesses.length);
    }
    // Adding a second argument to useEffect.
    // firstArgument should execute after rendering the component,
    // secondArgument is an array of dependencies of this function, and here you have to specify any value that's coming
    // from outside this effect function (i.e. UserChoice, OnGameOver)].
    // So, whenever such a value changes after a render cycle, this effect will re-run.
    // If a render cycle occure and the values specified here are still the same as for the previous render cycle, then the effect will
    // not re-run. The effect will only re-run if one of our dependencies changed. (UserChoice, OnGameOver)
  }, [currentGuess, userChoice, onGameOver]);
  //should get the parameter lower or greater
  const nextGuessHandler = direction => {
    if (
      (direction === 'lower' && currentGuess < props.userChoice) ||
      (direction === 'greater' && currentGuess > props.userChoice)
    ) {
      Alert.alert("Don't lie!", 'You know that this is wrong...', [
        { text: 'Sorry!', style: 'cancel' }
      ]);
      return;
    }
    if (direction === 'lower') {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess + 1;
    }
    const nextNumber = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );
    setCurrentGuess(nextNumber);
    // setRounds(curRounds => curRounds + 1);
    // We have to set our past guesses and there we need to use our previous guesses and add a new guess
    // for that we use "setPastGuesses" with curPastGuesses and we want to update by returning a new array
    // and that should take our curPastGuesses into account and add new guesses there
    setPastGuesses(curPastGuesses => [
      nextNumber.toString(),
      ...curPastGuesses
    ]);
  };
  // "useRef" is a hook that allows you to create an object which you can bind to inputs, so to the input elements in jsx to get access
  // to them in the code, it also allows you to define a value which survives components re render
  return (
    <View style={styles.screen}>
      <Text style={DefaultStyles.title}>Opponent's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        {/* //to precofingure the argument which will be passed to nextGuessHandler when this is executed
          //binding to this, and the the second value we pass here to bind will be the first argumente received
          //by our function "nextGuessHandler" therefore this will be the direction, the string 'lower' in this case. */}
        <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
          <Ionicons name='md-remove' size={24} color='white' />
        </MainButton>
        <MainButton onPress={nextGuessHandler.bind(this, 'greater')}>
          <Ionicons name='md-add' size={24} color='white' />
        </MainButton>
      </Card>
      <View style={styles.listContainer}>
        {/* <ScrollView contentContainerStyle={styles.list}>
          {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
        </ScrollView> */}
        <FlatList
          keyExtractor={item => item}
          data={pastGuesses}
          renderItem={renderListItem.bind(this, pastGuesses.length)}
          contentContainerStyle={styles.list}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    width: 400,
    maxWidth: '90%'
  },
  listContainer: {
    flex: 1,
    width: '60%'
  },
  list: {
    flexGrow: 1,
    // alignItems: 'center',
    justifyContent: 'flex-end'
  },
  listItem: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 15,
    marginVertical: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  }
});

export default GameScreen;
