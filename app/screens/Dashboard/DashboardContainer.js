import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Container, Header, Form, Item, Input, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, Label, CardItem, Card } from 'native-base';
import OverlaySpinner from 'react-native-loading-spinner-overlay'

@inject('stores')
@observer
class DashboardContainer extends Component {
    constructor(props) {
        super(props);
        userStore.getInformation(authStore.sessionId)
    }

    componentDidMount() {

    }

    signInAsGuest = () => {
        authStore.clear()
        authStore.signInAsGuest()
    }

    userNameChange = (value) => authStore.onUserNameChange(value)

    passwordChange = (value) => authStore.onPasswordChange(value)

    signInPress = () => authStore.signIn()

    render() {
        const { userName } = userStore
        return (
            <Container>
                <Header transparent>
                    <Left></Left>
                    <Body>
                        <Title>Welcome!{userName}</Title>
                    </Body>
                    <Right>
                        <Button full rounded primary style={{ paddingHorizontal: 10, marginBottom: 10 }} onPress={this.logout}>
                            <Text>Logout</Text>
                        </Button>
                    </Right>
                </Header>
                <Content padder>
                </Content>
            </Container>
        )
    }

}

export default DashboardContainer;