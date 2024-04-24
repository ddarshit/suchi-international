import React from 'react'
import { Link } from 'react-router-dom'

const MasterList = () => {
    const mastersList = [
        { id: 1, name: "Account", link: 'account' },
        { id: 2, name: "Billing", link: 'billing' },
        { id: 3, name: "Client Details", link: 'client-details' },
        { id: 4, name: "Contact", link: 'contact' },   
        { id: 5, name: "Contact Person", link: 'contact-person' },
        { id: 6, name: "Dimension", link: 'dimension' },
        { id: 7, name: "Dimension Unit", link: 'dimension-unit' }, 
        { id: 8, name: "Employee", link: 'employee' },
        { id: 9, name: "Machine", link: 'machine' },
        { id: 10, name: "Product", link: 'product' },
        { id: 11, name: "Product Category", link: 'product-category' },
        { id: 12, name: "Raw Material Master", link: 'raw-material-master' },   
        { id: 13, name: "Raw Material Category", link: 'raw-material-category' },
        { id: 14, name: "Raw Material Inventory", link: 'raw-material-inventory' },
        { id: 15, name: "Stages", link: 'stages' },
        { id: 16, name: "Sub Stages", link: 'sub-stages' },
        { id: 17, name: "Supplier", link: 'supplier' },
        { id: 18, name: "Transaction", link: 'transaction' },
        
    ]
    return (
        <div className='my-8'>
            <div className="overflow-x-hidden shadow-md rounded-lg lg:h-[620px]">
                <table className="w-full relative text-base text-gray-500 rounded-lg">
                    <thead className="text-base text-white text-center uppercase bg-suchi sticky top-0">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Sr No
                            </th>

                            <th scope="col" className="px-6 py-3">
                                Master List
                            </th>

                            <th scope="col" className="px-6 py-3">
                                {/* <span className="sr-only">Edit</span> */}
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            mastersList.map((master) => 
                            <tr className="bg-white border-b hover:bg-gray-50 text-center">
                                <td className='px-6 py-4 font-medium text-gray'>
                                    {master.id}
                                </td>
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                    {master.name}
                                </td>
                                <td className="px-6 py-4">
                                    <Link to={ "/Masters/"+master.link } className="font-medium text-suchi hover:underline">View</Link>
                                </td>
                            </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default MasterList