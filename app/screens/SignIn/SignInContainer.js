import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Container, Header, Form, Item, Input, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, Label, CardItem, Card } from 'native-base';

@inject('stores')
@observer
class SignInContainer extends Component {
    constructor(props) {
        super(props);
        authStore
    }

    componentDidMount() {

    }

    signUpPress = () => this.props.navigation.navigate('SignUp')

    render() {
        return (
            <Container>
                <Header transparent>
                    <Body>
                        <Title>Welcome!</Title>
                    </Body>
                </Header>
                <Content padder>
                    <Form>
                        <Item floatingLabel last>
                            <Label>Username</Label>
                            <Input />
                        </Item>
                        <Item floatingLabel last>
                            <Label>Password</Label>
                            <Input secureTextEntry={true} />
                        </Item>
                    </Form>
                    <Body style={{ marginTop: 20 }}>
                        <Button full rounded primary style={{paddingHorizontal: 20, marginBottom: 10}}>
                            <Text>Sign In</Text>
                        </Button>
                        <Text style={{fontSize: 14}}>or</Text>
                        <Button bordered={false} transparent style={{paddingHorizontal: 20}} onPress={this.signUpPress}>
                            <Text>Sign Up</Text>
                        </Button>
                    </Body>


                </Content>
            </Container>
        )
    }

}

export default SignInContainer;