import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Container, Header, Form, Item, Input, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, Label, CardItem, Card, List, ListItem, Thumbnail, View, Spinner } from 'native-base';
import OverlaySpinner from 'react-native-loading-spinner-overlay'
import Colors from '../../global/Colors';
import { FlatList } from 'react-native-gesture-handler';
import config from '../../config';

@inject('stores')
@observer
class MovieDetailContainer extends Component {
    constructor(props) {
        super(props);
        if (!authStore.isGuest) userStore.getInformation(authStore.sessionId)
    }

    componentWillUnmount() {
        moviesStore.clear()
    }

    logout = () => {
        userStore.logout()
        authStore.logout()
    }

    showSearchBar = () => moviesStore.openSearchBar()

    hideSearchBar = () => moviesStore.closeSearchBar()

    onSearchChange = value => moviesStore.searchChange(value)

    onSearchPress = () => moviesStore.searchMovies()

    getMoreMovies = () => {
        moviesStore.checkAvailableMovies()
    }

    openMovieDetails = (movieId) => this.props.navigation.navigate('MovieDetails', { movieId })

    renderMovie = ({ item }) =>
        <ListItem thumbnail>
            <Left>
                <Thumbnail square source={{ uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}` }} />
            </Left>
            <Body>
                <Text>{item.title}</Text>
                <Text note>Popularity: {item.popularity.toFixed(1)}   Votes: {item.vote_count}</Text>
                {/* <Text note numberOfLines={1}>{item.overview}</Text> */}
            </Body>
            <Right>
                <Button transparent onPress={() => this.openMovieDetails(item.id)}>
                    <Text>View</Text>
                </Button>
            </Right>
        </ListItem>

    renderEmptyComponent = () =>
        <Body style={{ paddingTop: 20 }}>
            <Text style={{ fontStyle: 'italic', fontSize: 16 }}>LIST IS EMPTY</Text>
        </Body>


    render() {
        const { userName } = userStore
        const { search, movies, isSearchBar, isMoviesLoading } = moviesStore
        return (
            <Container>
                {
                    !isSearchBar &&
                    <Header transparent>
                        <Left>
                            <Button transparent style={{ paddingHorizontal: 10 }} onPress={this.showSearchBar}>
                                <Icon name="ios-search" />
                            </Button>
                        </Left>
                        <Right>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                                <Title>Hi, {userName}</Title>
                                <Button bordered={false} transparent style={{ paddingHorizontal: 10 }} onPress={this.logout}>
                                    <Text style={{ fontSize: 14 }}>Logout</Text>
                                </Button>
                            </View>
                        </Right>
                    </Header>
                }
                {
                    isSearchBar &&
                    <Header transparent searchBar rounded>
                        <Item>
                            <Icon name="ios-search" />
                            <Input value={search} autoFocus placeholder="Search" onChangeText={this.onSearchChange} onBlur={this.hideSearchBar} />
                            <Icon name="ios-film" />
                        </Item>
                        <Button transparent onPress={this.onSearchPress}>
                            <Text>Search</Text>
                        </Button>
                    </Header>
                }
                <Content>
                    <FlatList
                        keyExtractor={item => item.id}
                        data={movies}
                        renderItem={this.renderMovie}
                        ListEmptyComponent={this.renderEmptyComponent}
                        onEndReached={this.getMoreMovies}
                        onEndReachedThreshold={0.5}
                        initialNumToRender={30}
                        maxToRenderPerBatch={30}
                    />
                </Content>

            </Container>
        )
    }

}

export default MovieDetailContainer;