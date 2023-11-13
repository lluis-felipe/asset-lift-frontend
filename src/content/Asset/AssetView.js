import React, { Component } from 'react';
import axios from 'axios';
import {
    Form,
    Stack,
    FormGroup,
    NumberInput,
    TextInput,
    ComboBox,
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
    TileGroup,
    RadioTile
} from '@carbon/react';
import Dialog from '../../components/Dialog/Dialog';

class AssetView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: null,
            toUpdate: false, //this variable is used to us know if this is an existing record to update or a new record to save

            //atributes
            type: null,
            status: null,
            model: null,
            acquisitiondate: null,
            disposaldate: null,
            location: null,
            responsable: null,
            manufacturer: null,
            maintenanceschedule: null,
            usefullife: null,
            acquisitioncost: null,
            residualvalue: null,
            associatedasset: null,
            history: [],
        };
    }

    async componentDidMount() {
        await this.renderData();
    }

    getID() {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        return urlParams.get('id');
    }

    async renderData() {
        const id = this.getID();

        if (id != null) {
            try {
                const response = await axios.get(`assetlift/asset/${id}`);
                const data = response.data; // Assuming this response structure

                console.log(data);

                this.setState({
                    id: data.id,
                    type: data.type,
                    status: data.status,
                    model: data.model,
                    acquisitiondate: data.acquisitiondate,
                    disposaldate: data.disposaldate,
                    location: data.location,
                    responsable: data.responsable,
                    manufacturer: data.manufacturer,
                    maintenanceschedule: data.maintenanceschedule,
                    usefullife: data.usefullife,
                    acquisitioncost: data.acquisitioncost,
                    residualvalue: data.residualvalue,
                    associatedasset: data.associatedasset,
                    history: data.history, // This will populate the history in state
                    // ... other state values
                });

                console.log(this.state.history);

            } catch (error) {
                console.error('Error fetching data from the server:', error);
                // Error handling logic, if needed
            }
        }
    }



    handleChange = (event) => {
        const { id, value } = event.target;
        this.setState({ [id]: value });
        console.log({ [id]: value });
    };

    handleSubmit = async () => {
        const data = { ...this.state };
        const url = this.toUpdate ? `/assetlift/asset/${this.id}` : 'assetlift/asset';
        const method = this.toUpdate ? 'put' : 'post';

        try {
            const response = await axios({
                method,
                url,
                data,
            });

            console.log('Dados enviados com sucesso:', response.data);
            window.location.href = 'assets';
        } catch (error) {
            console.error('Erro ao enviar dados:', error);
        }
    };

    calculateDepreciation = (acquisitioncost, usefullife, residualvalue, acquisitiondate) => {
        if (usefullife > 0) {
            const depreciationPerYear = (acquisitioncost - residualvalue) / usefullife;

            const currentDate = new Date();
            const [day, month, year] = acquisitiondate.split('/').map(Number);
            const acquisitionDate = new Date(Date.UTC(year, month - 1, day));
            const yearsOfLife = currentDate.getFullYear() - acquisitionDate.getUTCFullYear();
            const actualvalue = acquisitioncost - (depreciationPerYear * yearsOfLife);

            console.log(depreciationPerYear, actualvalue);
            this.setState({
                depreciationamount: depreciationPerYear,
                actualvalue: actualvalue,
                isYearsULFinvalid: false
            });
        } else {
            this.setState({
                depreciationamount: 0,
                isYearsULFinvalid: true
            });
        }
    };


    render() {
        return (
            <div>
                <h1>Asset</h1>


                <Stack gap={7}>

                    <FormLabel>New</FormLabel>

                    <ButtonSet>
                        <Button kind="primary" onClick={this.handleSubmit}>
                            Save
                        </Button>
                        <Button kind="secondary" onClick={() => this.setState({ openStatusHistory: true })} >
                            Status history
                        </Button>
                        <Button kind="secondary" size="sm" onClick={() => this.calculateDepreciation(this.state.acquisitioncost, this.state.usefullife, this.state.residualvalue, this.state.acquisitiondate)}>
                            Calculate Depreciation
                        </Button>
                    </ButtonSet>


                    <Tabs defaultSelectedIndex={0}>

                        <TabList className="tabs-group" aria-label="Tab navigation">
                            <Tab>Base</Tab>
                            <Tab>Acquisition</Tab>
                            <Tab>Maintenance</Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel>
                                <Form aria-label="sample form">
                                    <Stack gap={7}>

                                        <FormGroup legendText="">
                                            <TextInput id="id" type="text" labelText="Asset ID" onChange={this.handleChange} value={this.state.id} readOnly />
                                        </FormGroup>

                                        {/* <FormGroup legendText="">
                                        <TextArea labelText="Description" />
                                    </FormGroup> */}

                                        <FormGroup legendText="">
                                            <ComboBox
                                                id="status"
                                                titleText="Status"
                                                items={["Draft", "Active", "In repair", "In storage", "Inactive"]}
                                                onChange={(value) => this.setState({ status: value.selectedItem })}
                                                value={this.state.status}
                                            />
                                        </FormGroup>

                                        <FormGroup legendText="">
                                            <ComboBox
                                                id="type"
                                                titleText="Type"
                                                type="inline"
                                                items={["Current", "In storage", "Operating", "Non-operating", "Fixed"]}
                                                onChange={(value) => this.setState({ type: value.selectedItem })}
                                                value={this.state.type}
                                            />
                                        </FormGroup>

                                        <FormGroup legendText="">
                                            <TextInput id="model" type="text" labelText="Model" onChange={this.handleChange} value={this.state.model} />
                                        </FormGroup>

                                        <FormGroup legendText="">
                                            <TextInput id="location" type="text" labelText="Location" onChange={this.handleChange} value={this.state.location} />
                                        </FormGroup>

                                        <FormGroup legendText="">
                                            <TextInput id="manufacturer" type="text" labelText="Manufacturer" onChange={this.handleChange} value={this.state.manufacturer} />
                                        </FormGroup>

                                        <FormGroup legendText="">
                                            <TextInput id="responsable" type="text" labelText="Responsible" onChange={this.handleChange} value={this.state.responsable} />
                                        </FormGroup>
                                    </Stack>
                                </Form>
                            </TabPanel>
                            <TabPanel>
                                <Form aria-label="sample form">
                                    <Stack gap={7}>

                                        <FormGroup legendText="">
                                            <NumberInput id="acquisitioncost" label="Acquistion cost" hideSteppers onChange={this.handleChange} value={this.state.acquisitioncost} />
                                        </FormGroup>

                                        <FormGroup legendText="">
                                            <NumberInput id="residualvalue" label="Residual value" hideSteppers onChange={this.handleChange} value={this.state.residualvalue} />
                                        </FormGroup>

                                        <FormGroup legendText="">
                                            <NumberInput id="depreciation" label="Depreciation per year" hideSteppers onChange={this.handleChange} value={this.state.depreciationamount} />
                                        </FormGroup>

                                        <FormGroup legendText="">
                                            <NumberInput id="actualvalue" label="Actual Value" hideSteppers onChange={this.handleChange} value={this.state.actualvalue} helperText="Actual Value = Acquisition Cost - (Depreciation Per Year * Useful Life)" />
                                        </FormGroup>

                                        <FormGroup legendText="">
                                            <DatePicker
                                                datePickerType="single"
                                                dateFormat="d/m/Y"
                                                value={this.state.acquisitiondate}
                                                onChange={(value) => {
                                                    const date = new Date(value);
                                                    const day = date.getDate();
                                                    const month = date.getMonth() + 1;
                                                    const year = date.getFullYear();
                                                    this.setState({ acquisitiondate: `${day}/${month}/${year}` });
                                                }}
                                            >
                                                <DatePickerInput
                                                    id="acquisitiondate"
                                                    labelText="Acquisition Date"
                                                // placeholder="dd/mm/yyyy"
                                                />
                                            </DatePicker>
                                        </FormGroup>

                                        <FormGroup legendText="">
                                            <DatePicker
                                                datePickerType="single"
                                                dateFormat="d/m/Y"
                                                value={this.state.disposaldate}
                                                onChange={(value) => {
                                                    const date = new Date(value);
                                                    const day = date.getDate();
                                                    const month = date.getMonth() + 1;
                                                    const year = date.getFullYear();
                                                    this.setState({ disposaldate: `${day}/${month}/${year}` });
                                                }}
                                            >
                                                <DatePickerInput
                                                    id="disposaldate"
                                                    labelText="Disposal Date"
                                                // placeholder="dd/mm/yyyy"
                                                />
                                            </DatePicker>
                                        </FormGroup>
                                    </Stack>
                                </Form>
                            </TabPanel>
                            <TabPanel>
                                <Form aria-label="sample form">
                                    <Stack gap={7}>
                                        <TileGroup
                                            // defaultSelected={this.state.maintenanceschedule !== null ? this.state.maintenanceschedule : "daily"}
                                            onChange={(value) => this.setState({ maintenanceschedule: value })}
                                            legend="Maintenance Schedule"
                                            name="maintenance schedule"
                                            value="daily"
                                        >
                                            <RadioTile
                                                id="daily"
                                                style={{
                                                    marginBottom: '.5rem'
                                                }}
                                                value="daily"
                                            >
                                                Daily
                                            </RadioTile>
                                            <RadioTile
                                                id="weekly"
                                                style={{
                                                    marginBottom: '.5rem'
                                                }}
                                                value="weekly"
                                            >
                                                Weekly
                                            </RadioTile>
                                            <RadioTile
                                                id="monthly"
                                                style={{
                                                    marginBottom: '.5rem'
                                                }}
                                                value="monthly"
                                            >
                                                Monthly
                                            </RadioTile>
                                            <RadioTile
                                                id="annually"
                                                value="annually"
                                            >
                                                Annually
                                            </RadioTile>
                                        </TileGroup>
                                        <FormGroup legendText="">
                                            <NumberInput id="usefullife" label="Useful life" hideSteppers onChange={this.handleChange} value={this.state.usefullife} />
                                        </FormGroup>
                                    </Stack>
                                </Form>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </Stack>

                <Dialog
                    open={this.state.openStatusHistory}
                    rows={this.state.history.map((item, index) => ({
                        id: item.id,
                        dateTime: item.dateTime,
                        status: item.status
                    }))}
                    headers={[
                        { key: 'id', header: 'ID' },
                        { key: 'dateTime', header: 'Date Time' },
                        { key: 'status', header: 'Status' }
                    ]}
                    onClose={() => this.setState({ openStatusHistory: false })}
                />
            </div>
        );
    }
}

export default AssetView;
