import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Icon} from 'react-native-elements';
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import Lounge from '../screens/Lounge';
import Account from '../screens/Account';
import Viewed from '../screens/Viewed';
import More from '../screens/More';
import SquareScreen from '../screens/SquareScreen';
import Stories from '../screens/Stories';
import Anim from '../screens/Anim';
import Chart from '../screens/Chart';

const Stack = createStackNavigator();
const BottomTab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();

export function SignedOutStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
}

const Drawer = createDrawerNavigator();

function MoreDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Feed" component={More} />
      <Drawer.Screen name="Article" component={More} />
    </Drawer.Navigator>
  );
}

function LoungeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Lounge" component={Signup} />
    </Stack.Navigator>
  );
}

function BagStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Bag" component={SquareScreen} />
    </Stack.Navigator>
  );
}
function AccountStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Account" component={Account} />
    </Stack.Navigator>
  );
}

function AccountTopTabs() {
  return (
    <TopTab.Navigator style={{marginTop: 40}}>
      <TopTab.Screen name="My Personal Data" component={Stories} />
      <TopTab.Screen name="Orders" component={Lounge} />
    </TopTab.Navigator>
  );
}

function ViewedStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Viewed" component={Anim} />
    </Stack.Navigator>
  );
}

function MoreStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="More" component={Chart} />
    </Stack.Navigator>
  );
}

function MyTabs() {
  return (
    <BottomTab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let icon = {iconName: '', iconType: ''};

          if (route.name === 'Lounge') {
            icon = {iconName: 'triangle', iconType: 'feather'};
          } else if (route.name === 'Bag') {
            icon = {iconName: 'shopping-bag', iconType: 'feather'};
          } else if (route.name === 'Account') {
            icon = {iconName: 'account', iconType: 'material-community'};
          } else if (route.name === 'Viewed') {
            icon = {iconName: 'eye', iconType: 'feather'};
          } else if (route.name === 'More') {
            icon = {iconName: 'dots-three-horizontal', iconType: 'entypo'};
          }

          // You can return any component that you like here!
          return (
            <Icon
              name={icon.iconName}
              size={size}
              color={color}
              type={icon.iconType}
            />
          );
        },
      })}
      tabBarOptions={{
        style: {backgroundColor: 'black'},
        activeTintColor: 'orange',
        inactiveTintColor: 'white',
      }}>
      <BottomTab.Screen name="Lounge" component={LoungeStack} />
      <BottomTab.Screen name="Bag" component={BagStack} />
      <BottomTab.Screen name="Account" component={AccountTopTabs} />
      <BottomTab.Screen name="Viewed" component={ViewedStack} />
      <BottomTab.Screen name="More" component={Chart} />
    </BottomTab.Navigator>
  );
}

export default MyTabs;
