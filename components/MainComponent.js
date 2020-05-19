import React, { Component } from 'react';
import Home from './HomeComponent';
import Directory from './DirectoryComponent';
import MovieInfo from './MovieInfoComponent';
import About from './AboutComponent';
import Contact from './ContactComponent';
import Favorites from './FavoritesComponent';
import Reservation from './ReservationComponent';
import Login from './LoginComponent';
import { View, Platform, StyleSheet, Text, ScrollView, Image, Alert, ToastAndroid } from 'react-native';
import { createStackNavigator, createDrawerNavigator, DrawerItems } from 'react-navigation';
import { Icon } from 'react-native-elements';
import SafeAreaView from 'react-native-safe-area-view';
import { connect } from 'react-redux';
import {
    fetchMovies, fetchComments, fetchPromotions,
    fetchPartners
} from '../redux/ActionCreators';
import NetInfo from '@react-native-community/netinfo';

const mapDispatchToProps = {
    fetchMovies,
    fetchComments,
    fetchPromotions,
    fetchPartners
};

const DirectoryNavigator = createStackNavigator(
    {
        Directory: {
            screen: Directory,
            navigationOptions: ({ navigation }) => ({
                headerLeft: <Icon
                    name='list'
                    type='font-awesome'
                    iconStyle={styles.stackIcon}
                    onPress={() => navigation.toggleDrawer()}
                />
            })
        },
        MovieInfo: { screen: MovieInfo }
    },
    {
        initialRouteName: 'Directory',
        navigationOptions: {
            headerStyle: {
                backgroundColor: '#000'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#c9a47a'
            }
        }
    }
);

const HomeNavigator = createStackNavigator(
    {
        Home: { screen: Home }
    },
    {
        navigationOptions: ({ navigation }) => ({
            headerStyle: {
                backgroundColor: '#000'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#c9a47a'
            },
            headerLeft: <Icon
                name='home'
                type='font-awesome'
                iconStyle={styles.stackIcon}
                onPress={() => navigation.toggleDrawer()}
            />
        })
    }
);

const AboutNavigator = createStackNavigator(
    {
        About: { screen: About }
    },
    {
        navigationOptions: ({ navigation }) => ({
            headerStyle: {
                backgroundColor: '#000'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#c9a47a'
            },
            headerLeft: <Icon
                name='info-circle'
                type='font-awesome'
                iconStyle={styles.stackIcon}
                onPress={() => navigation.toggleDrawer()}
            />
        })
    }
);

const ContactNavigator = createStackNavigator(
    {
        Contact: { screen: Contact }
    },
    {
        navigationOptions: ({ navigation }) => ({
            headerStyle: {
                backgroundColor: '#000'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#c9a47a'
            },
            headerLeft: <Icon
                name='address-card'
                type='font-awesome'
                iconStyle={styles.stackIcon}
                onPress={() => navigation.toggleDrawer()}
            />
        })
    }
);

const ReservationNavigator = createStackNavigator(
    {
        Reservation: { screen: Reservation }
    },
    {
        navigationOptions: ({ navigation }) => ({
            headerStyle: {
                backgroundColor: '#000'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#c9a47a'
            },
            headerLeft: <Icon
                name='film'
                type='font-awesome'
                iconStyle={styles.stackIcon}
                onPress={() => navigation.toggleDrawer()}
            />
        })
    }
);

const FavoritesNavigator = createStackNavigator(
    {
        Favorites: { screen: Favorites }
    },
    {
        navigationOptions: ({ navigation }) => ({
            headerStyle: {
                backgroundColor: '#000'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#c9a47a'
            },
            headerLeft: <Icon
                name='heart'
                type='font-awesome'
                iconStyle={styles.stackIcon}
                onPress={() => navigation.toggleDrawer()}
            />
        })
    }
);

const LoginNavigator = createStackNavigator(
    {
        Login: { screen: Login }
    },
    {
        navigationOptions: ({ navigation }) => ({
            headerStyle: {
                backgroundColor: '#000'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#c9a47a'
            },
            headerLeft: <Icon
                name='sign-in'
                type='font-awesome'
                iconStyle={styles.stackIcon}
                onPress={() => navigation.toggleDrawer()}
            />
        })
    }
);

const CustomDrawerContentComponent = props => (
    <ScrollView>
        <SafeAreaView
            style={styles.container}
            forceInset={{ top: 'always', horizontal: 'never' }}>
            <View style={styles.drawerHeader}>
                <View style={{ flex: 1 }}>
                    <Image source={require('./images/logo.png')} style={styles.drawerImage} />
                </View>
                <View style={{ flex: 2 }}>
                    <Text style={styles.drawerHeaderText}>CMC CINEMA</Text>
                </View>
            </View>
            <DrawerItems {...props} activeTintColor='#f90015' labelStyle={{color: '#ffffff'}}/>
        </SafeAreaView>
    </ScrollView>
);

const MainNavigator = createDrawerNavigator(
    {
        Login: {
            screen: LoginNavigator,
            navigationOptions: {
                drawerIcon: ({ tintColor }) => (
                    <Icon
                        name='sign-in'
                        type='font-awesome'
                        size={24}
                        color='#f90015'
                    />
                )
            }
        },
        Home: {
            screen: HomeNavigator,
            navigationOptions: {
                drawerIcon: ({ tintColor }) => (
                    <Icon
                        name='home'
                        type='font-awesome'
                        size={24}
                        color='#f90015'
                    />
                )
            }
        },
        Directory: {
            screen: DirectoryNavigator,
            navigationOptions: {
                drawerIcon: ({ tintColor }) => (
                    <Icon
                        name='list'
                        type='font-awesome'
                        size={24}
                        color='#f90015'
                    />
                )
            }
        },
        Reservation: {
            screen: ReservationNavigator,
            navigationOptions: {
                drawerLabel: 'Reserve Movie',
                drawerIcon: ({ tintColor }) => (
                    <Icon
                        name='film'
                        type='font-awesome'
                        size={24}
                        color='#f90015'
                    />
                )
            }
        },
        Favorites: {
            screen: FavoritesNavigator,
            navigationOptions: {
                drawerLabel: 'My Favorites',
                drawerIcon: ({ tintColor }) => (
                    <Icon
                        name='heart'
                        type='font-awesome'
                        size={24}
                        color='#f90015'
                    />
                )
            }
        },
        About: {
            screen: AboutNavigator,
            navigationOptions: {
                drawerLabel: 'About Us',
                drawerIcon: ({ tintColor }) => (
                    <Icon
                        name='info-circle'
                        type='font-awesome'
                        size={24}
                        color='#f90015'
                    />
                )
            }
        },
        Contact: {
            screen: ContactNavigator,
            navigationOptions: {
                drawerLabel: 'Contact Us',
                drawerIcon: ({ tintColor }) => (
                    <Icon
                        name='address-card'
                        type='font-awesome'
                        size={24}
                        color='#f90015'
                    />
                )
            }
        },
    },
    {
        initialRouteName: 'Home',
        drawerBackgroundColor: 'rgba(0, 0, 0, 0.7)',
        contentComponent: CustomDrawerContentComponent
    }
);

class Main extends Component {

    componentDidMount() {
        this.props.fetchMovies();
        this.props.fetchComments();
        this.props.fetchPromotions();
        this.props.fetchPartners();

        this.showNetInfo();

        this.unsubscribeNetInfo = NetInfo.addEventListener(connectionInfo => {
            this.handleConnectivityChange(connectionInfo);
        });
    }

    showNetInfo = async () => {
        const connectionInfo = await NetInfo.fetch();
        (Platform.OS === 'ios') ?
            Alert.alert('Initial Network Connectivity Type:', connectionInfo.type)
            : ToastAndroid.show('Initial Network Connectivity Type: ' +
                connectionInfo.type, ToastAndroid.LONG);
        console.log(connectionInfo);
    }

    componentWillUnmount() {
        this.unsubscribeNetInfo();
    }

    handleConnectivityChange = connectionInfo => {
        let connectionMsg = 'You are now connected to an active network.';
        switch (connectionInfo.type) {
            case 'none':
                connectionMsg = 'No network connection is active.';
                break;
            case 'unknown':
                connectionMsg = 'The network connection state is now unknown.';
                break;
            case 'cellular':
                connectionMsg = 'You are now connected to a cellular network.';
                break;
            case 'wifi':
                connectionMsg = 'You are now connected to a WiFi network.';
                break;
        }
        (Platform.OS === 'ios') ? Alert.alert('Connection change:', connectionMsg)
            : ToastAndroid.show(connectionMsg, ToastAndroid.LONG);
    }

    render() {
        return (
            <View style={{
                flex: 1,
                paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight,
            }}>
                <MainNavigator />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    drawerHeader: {
        backgroundColor: '#000',
        height: 140,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row'
    },
    drawerHeaderText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold'
    },
    drawerImage: {
        margin: 10,
        height: 60,
        width: 60
    },
    stackIcon: {
        marginLeft: 10,
        color: '#c9a47a',
        fontSize: 24
    },
    text: {
        color: '#f0f'
    }
});

export default connect(null, mapDispatchToProps)(Main); 