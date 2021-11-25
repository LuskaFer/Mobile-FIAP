import React from 'react';
import { NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const AppStack = createStackNavigator();

import Donates from './pages/donates';
import Detail from './pages/Detail';


export default function Routes (){
    return(
        <NavigationContainer >
                <AppStack.Navigator screenOptions={{headerShown: false}}>
                    <AppStack.Screen name="Donates" component={Donates} />
                    <AppStack.Screen name="Detail" component={Detail} />
                </AppStack.Navigator>
        </NavigationContainer>

    );




}