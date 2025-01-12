import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import {NavProps} from './type';
import Home from '../screen/Home';
import Navbar from '../components/Navbar';

export type MainList = {
  Home: undefined;
};

export type MainNavProps<T extends keyof MainList> = NavProps<
  MainList,
  T,
  StackNavigationProp<MainList, T>
>;

const Stack = createStackNavigator<MainList>();
const MainNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        header: () => <Navbar />,
      }}
      initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
};

export default MainNavigation;
