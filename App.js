import { createStackNavigator, createAppContainer } from 'react-navigation';

import LaunchComponent from './App/components/LaunchComponent';
import MainContainer from './App/components/MainContainer';

const MainNavigator = createStackNavigator({
  LaunchScreen: { screen: LaunchComponent },
  MainScreen: { screen: MainContainer },
},
{
  headerMode: 'none',
  mode: 'modal',
});

const App = createAppContainer(MainNavigator);

export default App;
