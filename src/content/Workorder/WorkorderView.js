import React from 'react';
import View from '../../components/Form/View';
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
    TextArea
} from '@carbon/react';
import axios from 'axios';
import Dialog from '../../components/Dialog/Dialog';
// import { Search } from '@carbon/react/icons';

class WorkorderView extends View {
    constructor(props) {
        super(props);
        this.state = {
            appname: 'workorder',
            openAssetDialog: false,
            assetData: [],

            //atributes
            id: '',
            description: '',
            status: 'Draft',
            asset_id: '',
            createddate: '',
            duedate: '',
            estimatedcosts: 0,
            assignedto: '',
            worktype: ''
        };
    }

    async componentDidMount() {
        try {
            const response = await axios.get('assetlift/asset');
            this.setState({ assetData: response.data }); // Atualizar o estado com os dados retornados
            console.log(this.state.assetData);
        } catch (error) {
            console.error('Erro ao buscar os ativos:', error);
        }
        super.componentDidMount();
    }

    render() {
        return (
            <div>
                <h1>Work order</h1>

                <Stack gap={7}>
                    <FormLabel>{this.state.toUpdate ? 'Edit' : 'New'}</FormLabel>
                    <ButtonSet>
                        <Button kind="primary" onClick={this.handleSubmit}>
                            Save
                        </Button>
                        {/* <Button kind="secondary" size="sm">
                            Calculate Depreciation
                        </Button> */}
                    </ButtonSet>

                    <Tabs>

                        <TabList className="tabs-group" aria-label="Tab navigation">
                            <Tab>Base</Tab>
                            <Tab>Details</Tab>
                            <Tab>Dates</Tab>
                        </TabList>

                        <TabPanels>
                            <TabPanel>
                                <Form aria-label="sample form">
                                    <Stack gap={7}>
                                        <FormGroup legendText="">
                                            <TextInput id="id" type="text" labelText="Work order ID" readOnly onChange={this.handleChange} value={this.state.id} />
                                        </FormGroup>

                                        <FormGroup legendText="">
                                            <TextArea id="description" labelText="Description" onChange={this.handleChange} value={this.state.description} />
                                        </FormGroup>

                                        <FormGroup legendText="">
                                            <ComboBox
                                                id="status"
                                                titleText="Status"
                                                items={["Draft", "Active", "Open", "Closed", "Cancelled"]}
                                                onChange={(value) => this.setState({ status: value.selectedItem })}
                                                value={this.state.status}
                                            />
                                        </FormGroup>

                                        <FormGroup legendText="">
                                            <TextInput id="asset_id" labelText="Asset" value={this.state.asset_id} onChange={this.handleChange} onClick={() => this.setState({ openAssetDialog: true })} />
                                        </FormGroup>

                                        {/* <Modal
                                            aria-label=''
                                            open={this.state.openAssetDialog}
                                            onRequestClose={() => this.setState({ openAssetDialog: false })}
                                            modalHeading="Assets"
                                            modalLabel="Select an Asset"
                                            passiveModal
                                            hasScrollingContent
                                        >
                                            <DataTable
                                                rows={this.state.assetData.map((asset) => ({
                                                    id: asset.id,
                                                    model: asset.model,
                                                    status: asset.status
                                                }))}
                                                headers={[
                                                    {
                                                        key: 'id',
                                                        header: 'ID',
                                                    },
                                                    {
                                                        key: 'model',
                                                        header: 'Model',
                                                    },
                                                    {
                                                        key: 'status',
                                                        header: 'Status',
                                                    }
                                                ]}
                                            >
                                                {({ rows, headers, getTableProps, getHeaderProps, getRowProps, onInputChange }) => (
                                                    <TableContainer>
                                                        <TableToolbar>
                                                            <TableToolbarSearch
                                                                onChange={onInputChange}
                                                            />
                                                        </TableToolbar>
                                                        <Table {...getTableProps()}>
                                                            <TableHead>
                                                                <TableRow>
                                                                    {headers.map((header) => (
                                                                        <TableHeader {...getHeaderProps({ header })}>
                                                                            {header.header}
                                                                        </TableHeader>
                                                                    ))}
                                                                </TableRow>
                                                            </TableHead>
                                                            <TableBody>
                                                                {rows.map((row) => (
                                                                    <TableRow {...getRowProps({ row })} onClick={() => this.setState({ asset_id: row.id, openAssetDialog: false })}>
                                                                        {row.cells.map((cell) => (
                                                                            <TableCell key={cell.id}>{cell.value}</TableCell>
                                                                        ))}
                                                                    </TableRow>
                                                                ))}
                                                            </TableBody>
                                                        </Table>
                                                    </TableContainer>
                                                )}
                                            </DataTable>
                                        </Modal> */}

                                        <Dialog
                                            open={this.state.openAssetDialog}
                                            rows={this.state.assetData.map(asset => ({
                                                id: asset.id,
                                                model: asset.model,
                                                status: asset.status
                                            }))}
                                            headers={[
                                                { key: 'id', header: 'ID' },
                                                { key: 'model', header: 'Model' },
                                                { key: 'status', header: 'Status' }
                                            ]}
                                            onClose={() => this.setState({ openAssetDialog: false })}
                                            onSelect={(id) => this.setState({ asset_id: id, openAssetDialog: false })}
                                        />

                                    </Stack>
                                </Form>
                            </TabPanel>

                            <TabPanel>
                                <Form aria-label="sample form">
                                    <Stack gap={7}>

                                        <FormGroup legendText="">
                                            <ComboBox
                                                id="worktype"
                                                titleText="Work Type"
                                                items={["Corrective", "Preventive", "Predictive", "Scheduled", "Inspection", "Out of Service"]}
                                                onChange={(value) => this.setState({ worktype: value.selectedItem })}
                                                value={this.state.worktype}
                                            />
                                        </FormGroup>

                                        <FormGroup legendText="">
                                            <NumberInput id="estimatedcosts" label="Estimated Cost" hideSteppers onChange={this.handleChange} value={this.state.estimatedcosts} />
                                        </FormGroup>

                                        <FormGroup legendText="">
                                            <TextInput id="assignedto" labelText="Assigned to" onChange={this.handleChange} value={this.state.assignedto} />
                                        </FormGroup>

                                    </Stack>
                                </Form>
                            </TabPanel>

                            <TabPanel>

                                <Form aria-label="sample form">
                                    <Stack gap={7}>

                                        <FormGroup legendText="">
                                            <DatePicker
                                                datePickerType="single"
                                                dateFormat="d/m/Y"
                                                value={this.state.createddate}
                                                onChange={(value) => {
                                                    const date = new Date(value);
                                                    const day = date.getDate();
                                                    const month = date.getMonth() + 1;
                                                    const year = date.getFullYear();
                                                    this.setState({ createddate: `${day}/${month}/${year}` });
                                                }}
                                            >
                                                <DatePickerInput
                                                    id="createddate"
                                                    labelText="Created Date"
                                                />
                                            </DatePicker>
                                        </FormGroup>

                                        <FormGroup legendText="">
                                            <DatePicker
                                                datePickerType="single"
                                                dateFormat="d/m/Y"
                                                value={this.state.duedate}
                                                onChange={(value) => {
                                                    const date = new Date(value);
                                                    const day = date.getDate();
                                                    const month = date.getMonth() + 1;
                                                    const year = date.getFullYear();
                                                    this.setState({ duedate: `${day}/${month}/${year}` });
                                                }}
                                            >
                                                <DatePickerInput
                                                    id="duedate"
                                                    labelText="Due Date"
                                                />
                                            </DatePicker>
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

export default WorkorderView;
