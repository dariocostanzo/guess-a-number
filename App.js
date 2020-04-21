import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import Header from './components/Header';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';

export default function App() {
  const [userNumber, setUserNumber] = useState();

  const startGameHandler = selectedNumber => {
    setUserNumber(selectedNumber);
  };
  // Passing down a reference to startGameHandler to that component on the onStartGameProp
  // we forward the startGameHandler a pointer at setGameHandler
  // and we can use onStartGame (our new property) in StartGameScreen.js in "STAR GAME BUTTON"
  let content = <StartGameScreen onStartGame={startGameHandler} />;

  //if a number was chosen
  if (userNumber) {
    content = <GameScreen userChoice={userNumber} />;
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
