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
// import { fetchData } from '../../components/Crud/Crud';

function CustomTable({ headers, address, urlview }) {
    const [rows, setRows] = useState([]);

    function deleteRecord(selectedRows) {
        const idsToDelete = selectedRows.map((row) => row.id);
        idsToDelete.forEach((id) => {
            axios.delete(`${address}/${id}`)
                .then(() => {
                    console.log(`Deleted asset with id: ${id}`);
                    setRows((prevRows) =>
                        prevRows.filter((row) => row.id !== id)
                    );
                })
                .catch((error) => {
                    console.error(`Error deleting asset with id ${id}:`, error);
                });
        });
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(address);
                setRows(response.data);
                // console.log('Success');
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [address]);

    return (
        <div>
            <div>
                <Button href={`${urlview}`}>New</Button>
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
                                <TableToolbarMenu>
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
                                                <Link href={`${urlview}?id=${row.id}`}>{cell.value}</Link>
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

export default CustomTable;
