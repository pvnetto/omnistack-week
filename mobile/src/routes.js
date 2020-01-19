import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Main from './pages/Main';
import Profile from './pages/Profile';

const Routes = createAppContainer(
    createStackNavigator({
        Main: {
            screen: Main,
            navigationOptions: {
                title: 'DevFinder',
            }
        },
        Profile: {
            screen: Profile,
            navigationOptions: {
                title: 'Github Profile',
            }
        }
    }, {
            defaultNavigationOptions: {         // These options are applied to all routes
                headerTintColor: '#FFF',
                headerBackTitleVisible: false,  // Removes back option title
                headerStyle: {
                    backgroundColor: '#7D40E7',
                }
            }
        })
);

export default Routes;