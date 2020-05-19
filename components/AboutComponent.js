import React, { Component } from 'react';
import { Text, ScrollView, FlatList } from 'react-native';
import { Card, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import Loading from './LoadingComponent';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = state => {
    return {
        partners: state.partners
    }
}

function Mission() {
    return (
        <Card title='Who We Are'>
            <Text style={{ margin: 10 }}>
                CMC Theatres is an American movie theater chain headquartered in Nashville, TN, and is the largest movie theater chain in the world. Founded in 1920, CMC has the largest share of the U.S. theater market ahead of TNWORK and Cinemark Theatres.
            </Text>
        </Card>
    )
}

class About extends Component {

    static navigationOptions = {
        title: 'About Us'
    }

    render() {
        const { navigate } = this.props.navigation;
        const renderPartner = ({ item }) => {
            return (
                <ListItem
                    title={item.name}
                    subtitle={item.description}
                    onPress={() => navigate('MovieInfo', { partnerId: item.id })}
                    leftAvatar={{ source: { uri: baseUrl + item.image } }}
                />
            );
        };

        if (this.props.partners.isLoading) {
            return (
                <ScrollView>
                    <Mission />
                    <Card
                        title='Community Partners'>
                        <Loading />
                    </Card>
                </ScrollView>
            );
        }
        if (this.props.partners.errMess) {
            return (
                <ScrollView>
                    <Animatable.View animation='fadeInDown' duration={2000} delay={1000}>
                        <Mission />
                        <Card
                            title="Community Partners">
                            <Text>{this.props.partners.errMess}</Text>
                        </Card>
                    </Animatable.View>
                </ScrollView>
            );
        }
        return (
            <ScrollView>
                <Animatable.View animation='fadeInDown' duration={2000} delay={1000}>
                    <Mission />
                    <Card
                        title="Community Partners">
                        <FlatList
                            data={this.props.partners.partners}
                            renderItem={renderPartner}
                            keyExtractor={item => item.id.toString()}
                        />
                    </Card>
                </Animatable.View>
            </ScrollView>
        )
    }
}

export default connect(mapStateToProps)(About);