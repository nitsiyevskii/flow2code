import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Container, Header, Title, Content, Button, Left, Right, Body, Icon, Text, Thumbnail,  Grid, Col } from 'native-base';


@inject('stores')
@observer
class MovieDetailsContainer extends Component {
    constructor(props) {
        super(props);
        const { movieId } = props.route.params
        movieDetailsStore.getDetails(movieId)
    }

    componentWillUnmount() {
        movieDetailsStore.clear()
    }
 
    backPress = () => this.props.navigation.goBack()

    render() {
        const { title } = this.props.route.params
        const { movie } = movieDetailsStore
        return (
            <Container>
                <Header transparent>
                    <Left>
                        <Button transparent onPress={this.backPress}>
                            <Icon name='arrow-back' />
                            <Text>Back</Text>
                        </Button>
                    </Left>
                    <Body>
                        <Title>{title}</Title>
                    </Body>
                    <Right>
                    </Right>
                </Header>

                <Content padder>
                    {
                        !!movie &&
                        <>
                        <Grid>
                            <Col style={{ height: 100 }}>
                                <Body>
                                    <Thumbnail large source={{ uri: `https://image.tmdb.org/t/p/w500/${movie.poster_path}` }} />
                                </Body>

                            </Col>
                            <Col style={{ height: 100 }}>
                                <Text style={{ fontWeight: '600' }}>Genres: </Text>
                                <Text>{movie.genres.map(genre => genre.name).join(',')}</Text>

                            </Col>
                            

                        </Grid>
                        <Text style={{ fontWeight: '600' }}>Description: </Text>
                        <Text>{movie.overview}{'\n'}</Text>
                        <Text style={{ fontWeight: '600' }}>Production {movie.production_countries.length > 1 ? 'countries' : 'country'}: </Text>
                        <Text> {movie.production_countries.map(country => country.name).join(',')}</Text>
                        </>
                    }

                </Content>
            </Container>
        )
    }

}

export default MovieDetailsContainer;