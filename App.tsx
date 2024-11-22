import 'react-native-gesture-handler'; 
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';


import { MenuProvider } from './Screens/MenuContext'; 
import HomePage from './Screens/HomePage';
import FilterPage from './Screens/FilterPage';
import AddMealsPage from './Screens/AddMealsPage';

// Create the Drawer Navigator
const Drawer = createDrawerNavigator();

export default function App() {
    return (
        
        <MenuProvider>
            <NavigationContainer>
                <Drawer.Navigator initialRouteName="Homepage">
                    <Drawer.Screen name="Homepage" component={HomePage} />
                    <Drawer.Screen name="Filter" component={FilterPage} />
                    <Drawer.Screen name="Add Meals" component={AddMealsPage} />
                </Drawer.Navigator>
            </NavigationContainer>
        </MenuProvider>
    );
}
