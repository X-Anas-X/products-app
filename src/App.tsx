import React from 'react';
import RootNavigation from './NavigationStacks/RootNavigation';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import {persistedStore, store} from './Store';
import {LogBox} from 'react-native';

const GestureHandlerStyle = {
  flex: 1,
};

export default function App() {
  LogBox.ignoreLogs([
    'Sending `onAnimatedValueUpdate` with no listeners registered.',
  ]);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistedStore}>
        <GestureHandlerRootView style={GestureHandlerStyle}>
          <RootNavigation />
        </GestureHandlerRootView>
      </PersistGate>
    </Provider>
  );
}
