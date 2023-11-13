import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    DataTable,
    Table,
    TableHead,
    TableRow,
    TableHeader,
    TableBody,
    TableCell,
    Button,
    TableToolbar,
    TableToolbarSearch,
    TableContainer,
    TableSelectAll,
    TableSelectRow,
    TableToolbarMenu,
    TableToolbarAction,
    TableToolbarContent,
    Link
} from '@carbon/react';
import { TrashCan } from '@carbon/react/icons';


function Asset() {

    const headers = [
        {
            key: 'id',
            header: 'Id'
        },
        {
            key: 'model',
            header: 'model'
        },
        {
            key: 'type',
            header: 'Type'
        },
        {
            key: 'location',
            header: 'Location'
        },
        {
            key: 'responsable',
            header: 'Responsable'
        },
        {
            key: 'status',
            header: 'Status'
        }
    ];

    const [rows, setRows] = useState([]);

    async function deleteRecord(selectedRows) {
        try {
            for (const row of selectedRows) {
                const id = row.id;
                await axios.delete(`assetlift/asset/${id}`);
                console.log(`Deleted asset with id: ${id}`);
                setRows((prevRows) =>
                    prevRows.filter((row) => row.id !== id)
                );
            }
        } catch (error) {
            console.error("Error deleting asset:", error);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('assetlift/asset');
                setRows(response.data);
                // console.log('Success');
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1 style={{ paddingBottom: '5vh' }}>Assets</h1>

            <div >
                <Button href="/assetview">New</Button>
            </div>

            <DataTable rows={rows} headers={headers}>
                {({ rows, headers, selectedRows, getTableProps, getHeaderProps, getRowProps, onInputChange, getSelectionProps }) => (
                    <TableContainer>
                        <TableToolbar>
                            <TableToolbarSearch
                                onChange={onInputChange}
                            />
                            <TableToolbarContent>
                                <Button
                                    kind='ghost'
                                    hasIconOnly
                                    iconDescription="Delete record"
                                    onClick={() => deleteRecord(selectedRows)}
                                    renderIcon={TrashCan}
                                />
                                <TableToolbarMenu >
                                    <TableToolbarAction onClick={() => alert('Alert 1')}>
                                        Action 1
                                    </TableToolbarAction>
                                    <TableToolbarAction onClick={() => alert('Alert 2')}>
                                        Action 2
                                    </TableToolbarAction>
                                    <TableToolbarAction onClick={() => alert('Alert 3')}>
                                        Action 3
                                    </TableToolbarAction>
                                </TableToolbarMenu>
                            </TableToolbarContent>
                        </TableToolbar>
                        <Table {...getTableProps()}>
                            <TableHead>
                                <TableRow>
                                    <TableSelectAll {...getSelectionProps()} />
                                    {headers.map((header) => (
                                        <TableHeader {...getHeaderProps({ header })}>
                                            {header.header}
                                        </TableHeader>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <TableRow {...getRowProps({ row })}>
                                        <TableSelectRow {...getSelectionProps({ row })} />
                                        {row.cells.map((cell) => (
                                            <TableCell key={cell.id}>
                                                <Link href={`/assetview?id=${row.id}`}>{cell.value}</Link>
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </DataTable>
        </div>
    );
}

export default Asset;
