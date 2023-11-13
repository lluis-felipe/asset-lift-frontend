import React from 'react';
import View from '../../components/Form/View';
import axios from 'axios';
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
} from '@carbon/react';
// import Dialog from '../../components/Dialog/Dialog';

class PersonView extends View {
    constructor(props) {
        super(props);
        this.state = {
            appname: 'person',
            locationData: [],
            openLocationDialog: false,

            //atributes
            person: '',
            firstname: '',
            lastname: '',
            status: 'Active',
            email: '',
            phone: '',
            location_id: '',
            address: '',
            city: '',
            state: '',
            zip: '',
            country: '',
            department: '',
            supervisor: ''
        };
    }

    async componentDidMount() {
        try {
            const response = await axios.get('assetlift/location');
            this.setState({ locationData: response.data }); // Atualizar o estado com os dados retornados
            console.log(this.state.locationData);
        } catch (error) {
            console.error('Erro ao buscar os ativos:', error);
        }
        super.componentDidMount();
    }

    render() {
        return (
            <div>
                <h1>Persons</h1>

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
                            <Tab>Location</Tab>
                            <Tab>Work Details</Tab>
                        </TabList>

                        <TabPanels>
                            <TabPanel>
                                <Form aria-label="sample form">
                                    <Stack gap={7}>

                                        <TextInput id="id" type="text" labelText="Person ID" readOnly onChange={this.handleChange} value={this.state.id} />

                                        <TextInput id="person" type="text" labelText="Person" onChange={this.handleChange} value={this.state.person} />

                                        <ComboBox
                                            id="status"
                                            titleText="Status"
                                            items={["Active", "Inactive"]}
                                            onChange={(value) => this.setState({ status: value.selectedItem })}
                                            value={this.state.status}
                                        />

                                        <FormGroup legendText="Contact Information">
                                            <Stack gap={7}>

                                                <TextInput id="firstname" type="text" labelText="First Name" onChange={this.handleChange} value={this.state.firstname} />

                                                <TextInput id="lastname" type="text" labelText="Last Name" onChange={this.handleChange} value={this.state.lastname} />

                                            </Stack>
                                        </FormGroup>

                                        <FormGroup legendText="Contact Information">
                                            <Stack gap={7}>

                                                <TextInput id="email" type="text" labelText="Email" onChange={this.handleChange} value={this.state.email} />

                                                <TextInput id="phone" type="text" labelText="Phone" onChange={this.handleChange} value={this.state.phone} />

                                            </Stack>
                                        </FormGroup>

                                    </Stack>
                                </Form>
                            </TabPanel>

                            <TabPanel>
                                <Form aria-label="sample form">
                                    <Stack gap={7}>

                                        {/* <TextInput id="location_id" type="text" labelText="Location" onChange={this.handleChange} value={this.state.location_id} /> */}

                                        <TextInput id="address" type="text" labelText="Address" onChange={this.handleChange} value={this.state.address} />

                                        <TextInput id="city" type="text" labelText="City" onChange={this.handleChange} value={this.state.city} />

                                        <TextInput id="state" type="text" labelText="State" onChange={this.handleChange} value={this.state.state} />

                                        <TextInput id="zip" type="text" labelText="Zip" onChange={this.handleChange} value={this.state.zip} />

                                        <TextInput id="country" type="text" labelText="Country" onChange={this.handleChange} value={this.state.country} />

                                        {/* <Dialog
                                            open={this.state.openLocationDialog}
                                            data={this.state.locationData}
                                            headers={[
                                                { key: 'id', header: 'ID' },
                                                { key: 'address', header: 'Address' }
                                            ]}
                                            onClose={() => this.setState({ openLocationDialog: false })}
                                            onSelect={(id) => this.setState({ location_id: id, openLocationDialog: false })}
                                        /> */}

                                    </Stack>
                                </Form>
                            </TabPanel>

                            <TabPanel>
                                <Form aria-label="sample form">
                                    <Stack gap={7}>

                                        <TextInput id="department" type="text" labelText="Department" onChange={this.handleChange} value={this.state.department} />

                                        <TextInput id="supervisor" type="text" labelText="Supervisor" onChange={this.handleChange} value={this.state.supervisor} />

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

export default PersonView;
