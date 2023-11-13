import React from 'react';
import CustomTable from '../../components/Table/Table';

function User() {

    const headers = [
        { key: 'id', header: 'Id' },
        { key: 'username', header: 'Username' },
        { key: 'access', header: 'Access' },
        { key: 'status', header: 'Status' },
        // { key: 'person.firstname', header: 'First Name' },
        // { key: 'lastname', header: 'Last Name' },
    ];

    const address = 'assetlift/user'; // Your API endpoint

    const urlview = '/userview';

    return (
        <div>
            <h1 style={{ paddingBottom: '5vh' }}>Users</h1>
            <CustomTable headers={headers} address={address} urlview={urlview}/>
        </div>
    );
}

export default User;
