import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';

import Header from './components/Header';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';
import { disableExpoCliLogging } from 'expo/build/logs/Logs';

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
};

export default function App() {
  const [userNumber, setUserNumber] = useState();
  // We need one additional piece of information, and that's the number of rounds it took the computer to finish the game.
  // So, one thing I want to store here in the app component, is another state I manage and that is the number of rounds it took
  // to finish which is zero initially because we haven't started a game yet. The goal is to set this when the game is over.
  const [guessRounds, setGuessRounds] = useState(0);
  // to manage the state of dataLoaded
  const [dataLoaded, setDataLoaded] = useState(false);

  if (!dataLoaded) {
    // if the data has not been loaded yet and I will immediately returning AppLoading
    // AppLoading is a component coming from expo which takes startAsync as a prop where we point 
    // at the operation we want to start when this is first rendered and that's of  fetchFonts function.
    // A) It has to be a function "fetchFonts"
    // B) It should return a promise, because expo will automatically listen to that promise for you
    // and when the promise resolves, it will know that the loading is done and it will then call whatever you
    // pass here to onFinish
    return <AppLoading startAsync={fetchFonts} onFinish={() => setDataLoaded(true)} onError={(err) => console.log(err)} />;
  }

  const configureNewGameHandler = () => {
    setGuessRounds(0);
    setUserNumber(null);
  };

  const startGameHandler = selectedNumber => {
    setUserNumber(selectedNumber);
    setGuessRounds(0);
  };

  // Adding another function and get the number of rounds as an argunemnt, so I expect to get this here, so that I can call
  // set guess rounds to my number of rounds I got here. Now the game over handler should be triggered from inside the gameScreen.
  // So on the <GameScreen> I will pass in a propo calling it onGameOver, which can be called from inside the game screen
  // or which holds a function reference which can then be called from inside the game screen and the function reference
  // is a reference at this gameOverHandler function.
  // <GameScreen onGameOver={gameOverHandler} />
  // So, inside of game screen, we can now use the onGameOver prop to execute the function "gameOverHandler" and pass the number of round it took
  // the computer to guess our number, then we set the number of rounds "setGuessRounds(numOfRounds);", 
  // store it in our guessRounds state and now in the app component we know that if guess rounds is zero, the game has not started yet or it is running
  // if it is greater than zero, then the game over handler executed and the game is over.
  const gameOverHandler = numOfRounds => {
    setGuessRounds(numOfRounds);
  };

  // Passing down a reference to startGameHandler to that component on the onStartGameProp
  // we forward the startGameHandler a pointer at setGameHandler
  // and we can use onStartGame (our new property) in StartGameScreen.js in "STAR GAME BUTTON"
  let content = <StartGameScreen onStartGame={startGameHandler} />;

  //if a number was chosen
  if (userNumber && guessRounds <= 0) {
    content = (
      <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />
    );
  } else if (guessRounds > 0) {
    content = (
      <GameOverScreen
        roundsNumber={guessRounds}
        userNumber={userNumber}
        onRestart={configureNewGameHandler}
      />
    );
  }
  return (
    <View style={styles.screen}>
      <Header title='Guess a Number' />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
});
