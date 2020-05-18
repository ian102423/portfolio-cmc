import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { Tile } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import Loading from './LoadingComponent';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = state => {
    return {
        movies: state.movies
    };
};

class Directory extends Component {

    static navigationOptions = {
        title: 'Directory'
    };

    render() {
        const { navigate } = this.props.navigation;
        const renderDirectoryItem = ({ item }) => {
            return (
                <Animatable.View animation='fadeInRightBig' duration={2000}>
                    <Tile
                        title={item.name}
                        caption={item.description}
                        featured
                        onPress={() => navigate('MovieInfo', { movieId: item.id })}
                        imageSrc={{ uri: baseUrl + item.image }}
                    />
                </Animatable.View>
            );
        };

        if (this.props.movies.isLoading) {
            return <Loading />;
        }
        if (this.props.movies.errMess) {
            return (
                <View>
                    <Text>{this.props.movies.errMess}</Text>
                </View>
            );
        }
        return (
            <FlatList
                data={this.props.movies.movies}
                renderItem={renderDirectoryItem}
                keyExtractor={item => item.id.toString()}
            />
        );
    }
}

export default connect(mapStateToProps)(Directory);