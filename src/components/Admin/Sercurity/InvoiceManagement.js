import '../Admin.css'
import React, { useState, useEffect, useRef, useCallback } from "react";
import PaginationInvoice from './PaginationInvoice';
import './SecurityDashBoard.css'


const URL_Find_C_ID = 'https://corsproxy-pms.herokuapp.com/https://backend-heroku-pms.herokuapp.com/security/searchCustomerInvoiceId/';
const URL_Find_R_ID = 'https://corsproxy-pms.herokuapp.com/https://backend-heroku-pms.herokuapp.com/security/searchResidentInvoiceId/';
const URL_R = 'https://corsproxy-pms.herokuapp.com/https://backend-heroku-pms.herokuapp.com/security/findAllResidentInvoice'
const URL_C = 'https://corsproxy-pms.herokuapp.com/https://backend-heroku-pms.herokuapp.com/security/findAllCustomerInvoice'


const InvoiceManagement = () => {
    const [obj, setObj] = useState([]);
    const [id, setId] = useState('');
    const [idNull, setIdNull] = useState(true);
    const [user, setUser] = useState('Resident');
    const [URL, setURL] = useState(URL_R);
    const [URLby, setURLby] = useState('');

    const handleSetBuilding = useCallback((item) => {
        setUser(item);
    }, []);



    useEffect(() => {
        if (user === 'Customer') {

            setURL(URL_C)
            setURLby(URL_Find_C_ID)
            console.log(URL_C)
            console.log(user);
        }
        else {
            setURL(URL_R)
            setURLby(URL_Find_R_ID)
            console.log(URL_R)
            console.log(user);
        }

    }, [user])



    useEffect(() => {
        fetch(URL)
            .then(response => response.json())
            .then((data) => {
                setObj(data);
                console.log(data);
            })
            .catch(error => console.error(error));
    }, [URL]);



    const handleIdFilter = async (e) => {

        e.preventDefault();
        if (id === null || id === '') {

            if (user === 'Customer') {

                setURL(URL_C)
                console.log(URL)
                console.log(user);
            }
            else {
                setURL(URL_R)
                console.log(URL)
                console.log(user);
            }
            fetch(URL)
                .then(response => response.json())
                .then((data) => {
                    setIdNull(true);
                    setObj(data)
                    console.log(data)
                })
                .catch(error => console.error(error));
        }
        else {

            console.log(URLby + id)
            fetch(URLby + id)
                .then(response => response.json())
                .then((data) => {
                    setIdNull(false);
                    setObj(data)
                    console.log(data)
                })
                .catch(error => console.error(error));

        }

    }

    return (
        <div className="admin-homepage-dashboard">
            <h5 style={{ textAlign: 'left', margin: '20px', marginBottom:0 }}>Manage Invoice</h5>
            <ul class="nav justify-content-center nav-custom nav-custom-sercurity  ">
                <li class="nav-item" onClick={() => handleSetBuilding('Resident')}>
                    <a class="nav-link" href="#">Resident</a>
                </li>
                <li class="nav-item" onClick={() => handleSetBuilding('Customer')}>
                    <a class="nav-link" href="#">Customer</a>
                </li>

            </ul>
            <form className='filter-id justify-content-center'  onSubmit={handleIdFilter}>
                Filter by ID:
                <input  type="text" onChange={e => setId(e.target.value)} />
                <button type='submit'>Search</button>
            </form>

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Id Invoice</th>
                        <th>Id Payment</th>
                        <th>{user === 'Resident' ? 'Id_Resident' : 'Id_Customer'}</th>
                        <th>Type Of Payment</th>
                        <th>Time</th>
                        <th>Total Of Money</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>

                </thead>
                {idNull ?
                    (
                        <PaginationInvoice data={obj} user={user}></PaginationInvoice>
                    )
                    : (
                        <tbody>
                            <tr >
                                <td></td>
                                <td>{user === 'Customer' ? obj.id_C_Invoice : obj.id_R_Invoice}</td>
                                <td>{obj.id_Payment}</td>
                                <td>{user === 'Customer' ? obj.id_Customer : obj.id_Resident}</td>
                                <td>{obj.typeOfPayment}</td>
                                <td>{obj.time}</td>
                                <td>{obj.total_Of_Money}</td>
                                <td>{obj.status ? "Complete" : "Not Complete"}</td>
                                <td>
                                    <form>
                                        <button style={{ border: 'none', backgroundColor: '#2DC98A', color: 'white', width: '55px', borderRadius: '2px' }}>Edit</button>
                                    </form>
                                </td>
                            </tr>
                        </tbody>


                    )}

            </table>
        </div>
    );
}

export default InvoiceManagement;