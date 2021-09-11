import {NavigationContainer} from '@react-navigation/native';
import React, {FC} from 'react';
import {StatusBar} from 'react-native';
import MainNavigator from './src/navigation/Navigator';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import Toast from 'react-native-toast-message';
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';

// Initialize Apollo Client
const client = new ApolloClient({
  uri: 'https://fakeql.com/graphql/7262ee02e03dfb81492fdf61a6857044',
  cache: new InMemoryCache(),
});

const App: FC = () => {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <NavigationContainer>
          <StatusBar barStyle="light-content" />
          <MainNavigator />
          <Toast ref={ref => Toast.setRef(ref)} />
        </NavigationContainer>
      </Provider>
    </ApolloProvider>
  );
};

export default App;
