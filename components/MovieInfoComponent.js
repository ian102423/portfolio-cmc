import React, { Component } from 'react';
import {
    Text, View, ScrollView, FlatList,
    Modal, Button, StyleSheet,
    Alert, PanResponder, Share
} from 'react-native';
import { Card, Icon, Rating, Input } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite, postComment } from '../redux/ActionCreators';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = state => {
    return {
        movies: state.movies,
        comments: state.comments,
        favorites: state.favorites
    }
}

const mapDispatchToProps = {
    postFavorite: movieId => (postFavorite(movieId)),
    postComment: (movieId, rating, author, text) => { postComment(movieId, rating, author, text) }
};

function RenderMovie(props) {

    const { movie } = props;

    const view = React.createRef(); // ex) giving id attribute to html

    const recognizeDrag = ({ dx }) => (dx < -200) ? true : false;

    const recognizeComment = ({ dx }) => (dx > 200) ? true : false;

    const panResponder = PanResponder.create({ // 2 auto pass arguments: event, gestureState
        onStartShouldSetPanResponder: () => true,
        onPanResponderGrant: () => {
            view.current.rubberBand(1000) // rubberBand animation
                .then(endState => console.log(endState.finished ? 'finished' : 'canceled'));
        },
        onPanResponderEnd: (e, gestureState) => {
            console.log('pan responder end', gestureState);
            if (recognizeDrag(gestureState)) {
                Alert.alert(
                    'Add Favorite',
                    'Are you sure you wish to add ' + movie.name + ' to favorites?',
                    [
                        {
                            text: 'Cancel',
                            style: 'cancel',
                            onPress: () => console.log('Cancel Pressed')
                        },
                        {
                            text: 'OK',
                            onPress: () => props.favorite ?
                                console.log('Already set as a favorite') : props.markFavorite()
                        }
                    ],
                    { cancelable: false }
                );
            } else if (recognizeComment(gestureState)) {
                props.onShowModal();
            }
            return true;
        }
    });

    const shareMovie = (title, message, url) => {
        Share.share({
            title: title,
            message: `${title}: ${message} ${url}`,
            url: url
        }, {
            dialogTitle: 'Share ' + title
        });
    };

    if (movie) {
        return (
            <Animatable.View animation='fadeInDown' duration={2000} delay={1000} ref={view} {...panResponder.panHandlers}>
                <Card
                    featuredTitle={movie.name}
                    image={{ uri: baseUrl + movie.image }}>
                    <Text style={{ margin: 10 }}>
                        {movie.description}
                    </Text>
                    <View style={styles.cardRow}>
                        <Icon
                            name={props.favorite ? 'heart' : 'heart-o'}
                            type='font-awesome'
                            color='#f90015'
                            raised
                            reverse
                            onPress={() => props.favorite ?
                                console.log('Already set as a favorite') : props.markFavorite()}
                        />
                        <Icon
                            style={styles.cardItem}
                            name={'pencil'}
                            type='font-awesome'
                            color='#c9a47a'
                            raised
                            reverse
                            onPress={() => props.onShowModal()}
                        />
                        <Icon
                            name={'share'}
                            type='font-awesome'
                            color='#c9a47a'
                            style={styles.cardItem}
                            raised
                            reverse
                            onPress={() => shareMovie(movie.name, movie.description, baseUrl + movie.image)}
                        />
                    </View>
                </Card>
            </Animatable.View>
        );
    }
    return <View />;
}

function RenderComments({ comments }) {

    const renderCommentItem = ({ item }) => {
        return (
            <View style={{ margin: 10 }}>
                <Text style={{ fontSize: 14 }}>{item.text}</Text>
                <Rating
                    startingValue={item.rating}
                    imageSize={10}
                    style={{
                        alignItems: 'flex-start',
                        paddingVertical: '5%'
                    }}
                    readonly
                />
                <Text style={{ fontSize: 12 }}>{`-- ${item.author}, ${item.date}`}</Text>
            </View>
        );
    };

    return (
        <Animatable.View animation='fadeInUp' duration={2000} delay={1000}>
            <Card title='Comments'>
                <FlatList
                    data={comments}
                    renderItem={renderCommentItem}
                    keyExtractor={item => item.id.toString()}
                />
            </Card>
        </Animatable.View>
    );
}

class MovieInfo extends Component { //******/

    constructor(props) {
        super(props);
        this.state = {
            favotie: false,
            showModal: false,
            rating: 5,
            author: '',
            text: ''
        }
    }

    markFavorite(movieId) {
        this.props.postFavorite(movieId);
    }

    static navigationOptions = {
        title: 'Movie Information'
    };

    toggleModal() {
        this.setState({ showModal: !this.state.showModal });
    }

    handleComment(movieId) {
        const { rating, author, text } = this.state;
        this.props.postComment(movieId, rating, author, text);
        this.toggleModal();
    }

    resetForm() {
        this.setState({
            rating: 5,
            author: '',
            text: ''
        });
    }

    render() {
        const movieId = this.props.navigation.getParam('movieId');
        const movie = this.props.movies.movies.filter(movie => movie.id === movieId)[0];
        const comments = this.props.comments.comments.filter(comment => comment.movieId === movieId);
        return (
            <ScrollView>
                <RenderMovie movie={movie}
                    favorite={this.props.favorites.includes(movieId)}
                    markFavorite={() => this.markFavorite(movieId)}
                    onShowModal={() => this.toggleModal()}
                />
                <RenderComments comments={comments} />
                <Modal
                    animationType={'slide'}
                    transparent={false}
                    visible={this.state.showModal}
                    onRequestClose={() => this.toggleModal()}>
                    <View style={styles.modal}>
                        <Rating
                            showRating
                            startingValue={this.state.rating}
                            imageSize={40}
                            onFinishRating={(rating) => this.setState({ rating: rating })}
                            style={{ paddingVertical: 10 }}
                        />
                        <Input
                            placeholder='Author'
                            leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                            leftIconContainerStyle={{ paddingRight: 10 }}
                            onChangeText={author => this.setState({ author: author })}
                            value={this.state.author}
                        />
                        <Input
                            placeholder='Comment'
                            leftIcon={{ type: 'font-awesome', name: 'comment-o' }}
                            leftIconContainerStyle={{ paddingRight: 10 }}
                            onChangeText={text => this.setState({ text: text })}
                            value={this.state.text}
                        />
                        <View style={{ margin: 10 }}>
                            <Button
                                title='Submit'
                                color='#c9a47a'
                                onPress={() => {
                                    this.handleComment(movieId);
                                    this.resetForm();
                                }}
                            />
                        </View>
                        <View style={{ margin: 10 }}>
                            <Button
                                onPress={() => {
                                    this.toggleModal();
                                    this.resetForm();
                                }}
                                color='#808080'
                                title='Cancel'
                            />
                        </View>
                    </View>
                </Modal>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    cardRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    cardItem: {
        flex: 1,
        margin: 10
    },
    modal: {
        justifyContent: 'center',
        margin: 20
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(MovieInfo);