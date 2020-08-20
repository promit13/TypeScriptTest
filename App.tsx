import React, {useState, useEffect} from 'react';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import MyTabs, {SignedOutStack} from './src/config/router';
import configureStore from './src/store/store';

function App() {
  console.disableYellowBox = true;
  const [login, setLogin] = useState(true);

  function onAuthStateChanged(user) {
    if (user) {
      setLogin(true);
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  return (
    <Provider store={configureStore()}>
      <NavigationContainer>
        {login ? <MyTabs /> : <SignedOutStack />}
      </NavigationContainer>
    </Provider>
  );
}

export default App;
