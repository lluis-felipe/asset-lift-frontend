import React from 'react';
import {
    Modal,
    DataTable,
    TableContainer,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TableHeader,
    TableToolbar,
    TableToolbarSearch
} from '@carbon/react';

const Dialog = ({ open, rows, headers, onClose, onSelect }) => {
    return (
        <Modal
            aria-label=''
            open={open}
            onRequestClose={onClose}
            modalHeading="Assets"
            modalLabel="Select an Asset"
            passiveModal
            hasScrollingContent
        >
            <DataTable
                rows={rows}
                headers={headers}
            >
                {({ rows, headers, getTableProps, getHeaderProps, getRowProps, onInputChange }) => (
                    <TableContainer>
                        <TableToolbar>
                            <TableToolbarSearch onChange={onInputChange} />
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
                                    <TableRow
                                        {...getRowProps({ row })}
                                        onClick={() => {
                                            onSelect(row.id);
                                            onClose();
                                        }}
                                    >
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
        </Modal>
    );
};

export default Dialog;


// import React from 'react';
// import {
//     Modal,
//     DataTable,
//     TableContainer,
//     Table,
//     TableBody,
//     TableCell,
//     TableHead,
//     TableRow,
//     TableHeader,
//     TableToolbar,
//     TableToolbarSearch
// } from '@carbon/react';

// const Dialog = ({ open, data, headers, onClose, onSelect }) => {
//     return (
//         <Modal
//             aria-label=''
//             open={open}
//             onRequestClose={onClose}
//             modalHeading="Assets"
//             modalLabel="Select an Asset"
//             passiveModal
//             hasScrollingContent
//         >
//             <DataTable
//                 rows={data.map((asset) => ({
//                     id: asset.id,
//                     model: asset.model,
//                     status: asset.status
//                 }))}
//                 headers={headers}
//             >
//                 {({ rows, headers, getTableProps, getHeaderProps, getRowProps, onInputChange }) => (
//                     <TableContainer>
//                         <TableToolbar>
//                             <TableToolbarSearch onChange={onInputChange} />
//                         </TableToolbar>
//                         <Table {...getTableProps()}>
//                             <TableHead>
//                                 <TableRow>
//                                     {headers.map((header) => (
//                                         <TableHeader {...getHeaderProps({ header })}>
//                                             {header.header}
//                                         </TableHeader>
//                                     ))}
//                                 </TableRow>
//                             </TableHead>
//                             <TableBody>
//                                 {rows.map((row) => (
//                                     <TableRow
//                                         {...getRowProps({ row })}
//                                         onClick={() => {
//                                             onSelect(row.id);
//                                             onClose();
//                                         }}
//                                     >
//                                         {row.cells.map((cell) => (
//                                             <TableCell key={cell.id}>{cell.value}</TableCell>
//                                         ))}
//                                     </TableRow>
//                                 ))}
//                             </TableBody>
//                         </Table>
//                     </TableContainer>
//                 )}
//             </DataTable>
//         </Modal>
//     );
// };

// export default Dialog;
