const Invoice = ({ invoice: { date_created, number, date_supplied, comment } }) => {

    return (
        <tr>
            <td>{date_created}</td>
            <td>{number}</td>
            <td>{date_supplied}</td>
            <td>{comment}</td>
        </tr>
    )
}

export default Invoice;