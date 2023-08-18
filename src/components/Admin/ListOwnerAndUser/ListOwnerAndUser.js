import React from 'react'
import SingleOwnerAndUser from '../SingleOwnerAndUser/SingleOwnerAndUser'

const ListOwnerAndUser = ({owners,users}) => {
    if(owners){

        console.log(owners);
        return (
            <table className="w-full text-md bg-white shadow-md rounded mb-4">
                <thead>
                    <tr className="border-b">
                        <th className="text-left p-3 px-5">Name</th>
                        <th className="text-left p-3 px-5">Email</th>

                        <th className="text-left p-3 px-5"> Action </th>
                    </tr>
                </thead>
                <tbody>
                    {owners.map((owner) => {
                        return (
                            <SingleOwnerAndUser owner={owner} />
                        )
                    })}

                </tbody>
            </table>
        )
    }

    if(users){
        console.log(users);
        return (
            <table className="w-full text-md bg-white shadow-md rounded mb-4">
                <thead>
                    <tr className="border-b">
                        <th className="text-left p-3 px-5">Name</th>
                        <th className="text-left p-3 px-5">Email</th>

                        <th className="text-left p-3 px-5"> Action </th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => {
                        return (
                            <SingleOwnerAndUser user={user} />
                        )
                    })}

                </tbody>
            </table>
        )
    }
 
}

export default ListOwnerAndUser