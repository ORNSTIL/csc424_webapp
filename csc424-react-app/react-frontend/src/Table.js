import React from "react";

function TableBody ({contacts}) {
    const rows = contacts.map((row, i) => {
        return (
            <tr key = {i}>
                <td>
                    {row.name}
                </td>
                <td>
                    {row.phoneNumber}
                </td>
            </tr>
        );
    });
    return (
        <tbody>
            {rows}
        </tbody>
    );
}

function TableHeader() {
return (
    <thead>
        <tr>
            <th>
                Name
            </th>
            <th>
                Phone Number
            </th>
        </tr>
    </thead>
    );
}



function Table({contacts}) {
    return (
        <table>
            <TableHeader />
            <TableBody contacts={contacts} />
        </table>
    );
}

export default Table;
