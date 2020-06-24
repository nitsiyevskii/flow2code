import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Container, Header, Form, Item, Input, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, Label, CardItem, Card } from 'native-base';

@inject('stores')
@observer
class SignUpContainer extends Component {
    constructor(props) {
        super(props);
        authStore
    }

    componentDidMount() {

    }

    signUpPress = () => this.props.navigation.navigate('SignUp')
    
    backPress = () => this.props.navigation.goBack()

    render() {
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
                        <Title>Sign Up</Title>
                    </Body>
                    <Right>

                    </Right>
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
                        <Button full rounded primary style={{ paddingHorizontal: 20, marginBottom: 10 }}>
                            <Text>Sign Up</Text>
                        </Button>
                    </Body>


                </Content>
            </Container>
        )
    }

}

export default SignUpContainer;