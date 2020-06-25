import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { FlatList, ActivityIndicator } from 'react-native'
import { Container, Header, Item, Input, Title, Button, Left, Right, Body, Icon, Text, ListItem, Thumbnail, View } from 'native-base';
import Colors from '../../global/Colors';

@inject('stores')
@observer
class DashboardContainer extends Component {
    constructor(props) {
        super(props);
        userStore.setDefaultName()
        if (!authStore.isGuest) userStore.getInformation(authStore.sessionId)
    }

    componentWillUnmount() {
        moviesStore.clear()
    }

    logout = () => {
        authStore.logout()
    }

    showSearchBar = () => moviesStore.openSearchBar()

    hideSearchBar = () => moviesStore.closeSearchBar()

    onSearchChange = value => moviesStore.searchChange(value)

    onSearchPress = () => {
        moviesStore.resetData()
        moviesStore.searchMovies()
    }

    getMoreMovies = () => moviesStore.checkAvailableMovies()

    openMovieDetails = (movieId, title) => this.props.navigation.navigate('MovieDetails', { movieId, title })

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
                <Button transparent onPress={() => this.openMovieDetails(item.id, item.title)}>
                    <Text>View</Text>
                </Button>
            </Right>
        </ListItem>


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
                <View style={{paddingBottom: 20}}>
                    {
                        isMoviesLoading &&
                        <View style={{
                            position: 'absolute',
                            top: 0,
                            left:0,
                            right: 0,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <ActivityIndicator size='large' color={Colors.gray} />
                        </View>
                        
                    }
                    <FlatList
                        keyExtractor={item => item.id}
                        data={movies}
                        renderItem={this.renderMovie}
                        ListEmptyComponent={() =>
                            <Body style={{ paddingTop: 20 }}>
                                {
                                    !isMoviesLoading &&
                                    <Text style={{ fontStyle: 'italic', fontSize: 16 }}>LIST IS EMPTY</Text>
                                }
                            </Body>}
                        onEndReachedThreshold={0.3}
                        initialNumToRender={30}
                        maxToRenderPerBatch={30}
                        onEndReached={this.getMoreMovies}
                    />
                </View>


            </Container>
        )
    }

}

export default DashboardContainer;