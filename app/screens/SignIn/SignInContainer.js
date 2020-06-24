import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Container, Header, Form, Item, Input, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, Label, CardItem, Card } from 'native-base';
import OverlaySpinner from 'react-native-loading-spinner-overlay'

@inject('stores')
@observer
class SignInContainer extends Component {
    constructor(props) {
        super(props);
        authStore
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
        const {userName, password, isDataLoading } = authStore
        return (
            <Container>
                <OverlaySpinner visible={isDataLoading} />
                <Header transparent>
                    <Body>
                        <Title>Welcome!</Title>
                    </Body>
                </Header>
                <Content padder>
                    <Form>
                        <Item floatingLabel last>
                            <Label>Username</Label>
                            <Input value={userName} onChangeText={this.userNameChange} />
                        </Item>
                        <Item floatingLabel last>
                            <Label>Password</Label>
                            <Input value={password} onChangeText={this.passwordChange} secureTextEntry={true} />
                        </Item>
                    </Form>
                    <Body style={{ marginTop: 20 }}>
                        <Button full rounded primary style={{paddingHorizontal: 10, marginBottom: 10}} onPress={this.signInPress}>
                            <Text>Log in</Text>
                        </Button>
                        <Text style={{fontSize: 14}}>or</Text>
                        <Button bordered={false} transparent style={{paddingHorizontal: 10}} onPress={this.signInAsGuest}>
                            <Text>Log in as guest</Text>
                        </Button>
                    </Body>
                </Content>
            </Container>
        )
    }

}

export default SignInContainer;