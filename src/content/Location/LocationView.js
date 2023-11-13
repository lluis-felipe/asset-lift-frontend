import React from 'react';
import View from '../../components/Form/View';
import {
    Form,
    Stack,
    FormGroup,
    TextInput,
    FormLabel,
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
    DatePicker,
    DatePickerInput,
    Button,
    ButtonSet,
    TextArea
} from '@carbon/react';

class LocationView extends View {
    constructor(props) {
        super(props);
        this.state = {
            appname: 'location',

            //atributes
            id: '',
            locationName: '',
            address: '',
            city: '',
            stateProvince: '',
            country: '',
            postalCode: '',
            latitude: '',
            longitude: '',
            phoneNumber: '',
            emailAddress: '',
            description: '',
            createdDate: '',
            lastModifiedDate: new Date().toLocaleDateString('en-GB')
        };
    }

    async componentDidMount() {
        super.componentDidMount();
    }

    render() {
        return (
            <div>
                <h1>Locations</h1>

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
                            <Tab>Contact</Tab>
                            <Tab>Coordinates</Tab>
                        </TabList>

                        <TabPanels>
                            <TabPanel>
                                <Form aria-label="sample form">
                                    <Stack gap={7}>
                                        <FormGroup legendText=''>
                                            <TextInput id="id" type="text" labelText="Location ID" readOnly onChange={this.handleChange} value={this.state.id} />
                                        </FormGroup>

                                        <FormGroup legendText=''>
                                            <TextInput id="locationName" type="text" labelText="Name" onChange={this.handleChange} value={this.state.locationName} />
                                        </FormGroup>

                                        <FormGroup legendText="">
                                            <TextArea id="description" labelText="Description" onChange={this.handleChange} value={this.state.description} />
                                        </FormGroup>

                                        <FormGroup legendText=''>
                                            <TextInput id="address" type="text" labelText="Address" onChange={this.handleChange} value={this.state.address} />
                                        </FormGroup>

                                        <FormGroup legendText=''>
                                            <TextInput id="city" type="text" labelText="City" onChange={this.handleChange} value={this.state.city} />
                                        </FormGroup>

                                        <FormGroup legendText=''>
                                            <TextInput id="stateProvince" type="text" labelText="State" onChange={this.handleChange} value={this.state.stateProvince} />
                                        </FormGroup>

                                        <FormGroup legendText=''>
                                            <TextInput id="country" type="text" labelText="Country" onChange={this.handleChange} value={this.state.country} />
                                        </FormGroup>

                                        <FormGroup legendText=''>
                                            <TextInput id="postalCode" type="text" labelText="Postal Code" onChange={this.handleChange} value={this.state.postalCode} />
                                        </FormGroup>

                                    </Stack>
                                </Form>
                            </TabPanel>

                            <TabPanel>
                                <Form aria-label="sample form">
                                    <Stack gap={7}>

                                        <FormGroup legendText='Contact'>
                                            <TextInput id="phoneNumber" type="number" labelText="Phone number" onChange={this.handleChange} value={this.state.phoneNumber} />
                                        </FormGroup>

                                        <FormGroup legendText=''>
                                            <TextInput id="emailAddress" type="text" labelText="Email Address" onChange={this.handleChange} value={this.state.emailAddress} />
                                        </FormGroup>

                                        <FormGroup legendText="Dates">
                                            <Stack gap={10} orientation="horizontal">
                                                <DatePicker
                                                    datePickerType="single"
                                                    dateFormat="d/m/Y"
                                                    value={this.state.createdDate}
                                                    onChange={(value) => {
                                                        const date = new Date(value);
                                                        const day = date.getDate();
                                                        const month = date.getMonth() + 1;
                                                        const year = date.getFullYear();
                                                        this.setState({ createdDate: `${day}/${month}/${year}` });
                                                    }}
                                                >
                                                    <DatePickerInput
                                                        id="createddate"
                                                        labelText="Created Date"
                                                    />
                                                </DatePicker>

                                                <DatePicker
                                                    datePickerType="single"
                                                    dateFormat="d/m/Y"
                                                    readOnly
                                                    value={this.state.lastModifiedDate}
                                                    onChange={(value) => {
                                                        const date = new Date(value);
                                                        const day = date.getDate();
                                                        const month = date.getMonth() + 1;
                                                        const year = date.getFullYear();
                                                        this.setState({ lastModifiedDate: `${day}/${month}/${year}` });
                                                    }}
                                                >
                                                    <DatePickerInput
                                                        id="lastmodifieddate"
                                                        labelText="Last Modified Date"
                                                    />
                                                </DatePicker>

                                            </Stack>
                                        </FormGroup>

                                    </Stack>
                                </Form>
                            </TabPanel>

                            <TabPanel>
                                <Form aria-label="sample form">
                                    <Stack gap={7}>

                                        <FormGroup legendText=''>
                                            <TextInput id="latitude" type="number" labelText="Latitude" onChange={this.handleChange} value={this.state.latitude} />
                                        </FormGroup>

                                        <FormGroup legendText=''>
                                            <TextInput id="longitude" type="number" labelText="Longitude" onChange={this.handleChange} value={this.state.longitude} />
                                        </FormGroup>
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

export default LocationView;
