import React from 'react';
import CustomTable from '../../components/Table/Table';

function Workorder() {
    const headers = [
        {
            key: 'id',
            header: 'Id'
        },
        {
            key: 'description',
            header: 'Description'
        },
        {
            key: 'worktype',
            header: 'Work Type'
        },
        {
            key: 'assignedto',
            header: 'Assigned To'
        },
        {
            key: 'asset_id',
            header: 'Associated Asset'
        },
        {
            key: 'status',
            header: 'Status'
        }
    ];

    const address = 'assetlift/workorder'; // Your API endpoint

    const urlview = '/workorderview';

    return (
        <div>
            <h1 style={{ paddingBottom: '5vh' }}>Work Orders</h1>
            <CustomTable headers={headers} address={address} urlview={urlview}/>
        </div>
    );
}

export default Workorder;
