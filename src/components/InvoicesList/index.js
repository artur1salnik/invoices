import Invoice from '../Invoice';


const InvoicesList = ({ invoices }) => {
    return (
        <div>
            <table className='invoicesTable'>
                <thead>
                    <tr>
                        <th>Create</th>
                        <th>No</th>
                        <th>Supply</th>
                        <th>Comment</th>
                    </tr>
                </thead>
                <tbody>
                    {invoices.map(invoice => (
                        <Invoice key={invoice.id} invoice={invoice} />
                    ))}
                </tbody>
            </table>

        </div>
    )
}

export default InvoicesList;