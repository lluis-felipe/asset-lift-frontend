import React from 'react';
import CustomTable from '../../components/Table/Table';

function Location() {

    const headers = [
        { key: 'id', header: 'Id' },
        { key: 'locationName', header: 'Location Name' },
        { key: 'address', header: 'Address' },
        { key: 'city', header: 'City' },
        { key: 'stateProvince', header: 'State/Province' },
        { key: 'country', header: 'Country' },
        { key: 'phoneNumber', header: 'Phone Number' },
        { key: 'emailAddress', header: 'Email Address' },
    ];

    const address = 'assetlift/location'; // Your API endpoint

    const urlview = '/locationview';

    return (
        <div>
            <h1 style={{ paddingBottom: '5vh' }}>Locations</h1>
            <CustomTable headers={headers} address={address} urlview={urlview}/>
        </div>
    );
}

export default Location;
