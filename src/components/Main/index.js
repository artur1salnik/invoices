import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import InvoicesList from '../InvoicesList';



const Main = () => {

    const [invoices, setInvoices] = useState(null)

    useEffect(() => {
        fetch('http://localhost:8000/invoices')
            .then(response => {
                return response.json()
            })
            .then(data => {
                console.log(data)
                setInvoices(data)
            })
    }, [])

    return (
        <div>
            <div className='headerBlock'>
                <h1 className='headerTitle'>Invoices</h1>
            </div>
            <div className='actionsBlock'>
                <h3>Actions</h3>
                <NavLink to='create_invoice'>
                    <button>Add new</button>
                </NavLink>
            </div>
            <div className='invoicesBlock'>
                <h3>Invoices</h3>
                {invoices && <InvoicesList invoices={invoices} />}
            </div>
        </div>

    )
}

export default Main;