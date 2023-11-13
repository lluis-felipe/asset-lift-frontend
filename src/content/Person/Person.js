import React from 'react';
import CustomTable from '../../components/Table/Table';

function Person() {

    const headers = [
        { key: 'id', header: 'Id' },
        { key: 'person', header: 'Person' },
        { key: 'firstname', header: 'First Name' },
        { key: 'lastname', header: 'Last Name' },
        { key: 'supervisor', header: 'Supervisor' },
        { key: 'status', header: 'Status' },
    ];

    const address = 'assetlift/person'; // Your API endpoint

    const urlview = '/personview';

    return (
        <div>
            <h1 style={{ paddingBottom: '5vh' }}>Persons</h1>
            <CustomTable headers={headers} address={address} urlview={urlview} />
        </div>
    );
}

export default Person;
