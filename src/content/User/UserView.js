import React from 'react';
import View from '../../components/Form/View';
import {
    Form,
    Stack,
    ComboBox,
    TextInput,
    FormLabel,
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
    Button,
    ButtonSet,
    FormGroup,
    PasswordInput
} from '@carbon/react';
// import Dialog from '../../components/Dialog/Dialog';

class UserView extends View {
    constructor(props) {
        super(props);
        this.state = {
            appname: 'user',

            //Atributes
            id: '',
            status: '',
            access: '',
            username: '',
            password: '',
            person: {
                id: '',
                firstname: '',
                lastname: '',
                email: '',
                phone: '',
            },
        };
    }

    async componentDidMount() {
        super.componentDidMount();
    }

    render() {
        return (
            <div>
                <h1>Users</h1>

                <Stack gap={7}>
                    <FormLabel>{this.state.toUpdate ? 'Edit' : 'New'}</FormLabel>
                    <ButtonSet>
                        <Button kind="primary" onClick={this.handleSubmit}>
                            Save
                        </Button>
                    </ButtonSet>

                    <Tabs>

                        <TabList className="tabs-group" aria-label="Tab navigation">
                            <Tab>Base</Tab>
                            <Tab>Person Details</Tab>
                        </TabList>

                        <TabPanels>
                            <TabPanel>
                                <Form aria-label="sample form">
                                    <Stack gap={7}>

                                        <FormGroup>
                                            <Stack gap={7} orientation="horizontal">

                                                <TextInput id="id" type="text" labelText="User ID" readOnly onChange={this.handleChange} value={this.state.id} />

                                                <TextInput id="access" type="text" labelText="Access" readOnly onChange={this.handleChange} value={this.state.access} />

                                                <ComboBox
                                                    id="status"
                                                    titleText="Status"
                                                    items={["Active", "Inactive"]}
                                                    onChange={(value) => this.setState({ status: value.selectedItem })}
                                                    value={this.state.status}
                                                />

                                            </Stack>
                                        </FormGroup>

                                        <FormGroup legendText="Information">
                                            <Stack gap={7}>

                                                <TextInput id="username" type="text" labelText="Username" onChange={this.handleChange} value={this.state.username} inline />

                                                <PasswordInput id="password" labelText="Password" onChange={this.handleChange} value={this.state.password} inline />

                                            </Stack>
                                        </FormGroup>

                                    </Stack>
                                </Form>
                            </TabPanel>

                            <TabPanel>
                                <Form aria-label="sample form">
                                    <Stack gap={7}>

                                        <TextInput id="personid" type="text" readOnly labelText="Person ID" onChange={this.handleChange} value={this.state.person.id} />

                                        <TextInput id="firstname" type="text" readOnly labelText="First Name" onChange={this.handleChange} value={this.state.person.firstname} />

                                        <TextInput id="lastname" type="text" readOnly labelText="Last Name" onChange={this.handleChange} value={this.state.person.lastname} />

                                        <TextInput id="email" type="text" readOnly labelText="Email" onChange={this.handleChange} value={this.state.person.email} />
                                        
                                        <TextInput id="phone" type="text" readOnly labelText="Phone" onChange={this.handleChange} value={this.state.person.phone} />

                                    </Stack>
                                </Form>
                            </TabPanel>

                        </TabPanels>
                    </Tabs>
                </Stack>

            </div>
        );
    }
}

export default UserView;
