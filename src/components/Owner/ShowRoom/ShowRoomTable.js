import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { deleteRoomOwnerApi } from "../../../helpers/apis/ownerApis";
import DelModal from "../DeleteModal/DelModal";


const ShowRoomTable = ({room,toRemoveRoom}) => {
    const notify = (msg) => toast(msg);

    const [openModal, setOpenModal] = useState(false);
    const [roomId,setRoomId]= useState()

    // const [room,setRoom]= useState()




  

    const editRoom = (roomId)=>{


    }

    
    const deleteRoom =async ()=>{
        setOpenModal(false)

        const response = await deleteRoomOwnerApi(roomId)
        notify("dasdasda")

        toRemoveRoom(roomId)
        console.log(response);
    }

    const deleteRoomModal = (roomId)=>{    
        setRoomId(roomId)
        setOpenModal(true);
    }

    console.log(room);

    return (
        <>
            {openModal && <DelModal closeModal={setOpenModal} delRoom={deleteRoom} />}
            {/* < !--component --> */}
            <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-8">
                
                <div className="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard px-8 pt-3 rounded-bl-lg rounded-br-lg">
                    <table className="min-w-full">
                        <thead>
                            <tr>
                                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">ID</th>
                                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">Images</th>
                                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">Room Number</th>
                                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">Room Type</th>
                                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">Status</th>
                                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">Created At</th>
                                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {room && room.length > 0 ? room.map((info, id) => {
                                return (
                                    <tr key={info._id}>
                                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                                            <div className="flex items-center">
                                                <div>
                                                    <div className="text-sm leading-5 text-gray-800">{id + 1}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                                            <div className="text-sm leading-5 text-blue-900 w-32"><img src={info.images[0]} alt="" /></div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">{info.roomNumber}</td>
                                        <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">{info.roomType} </td>
                                        <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
                                            <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                                <span aria-hidden className="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                                                <span className="relative  text-xs">{info.status ? "Active" : "Blocked"}</span>
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-blue-900 text-sm leading-5">{info.createdAt.split("T", 1)}</td>
                                        <td className="px-6 py-4 whitespace-no-wrap  border-b border-gray-500 text-sm leading-5 ">
                                            <Link to={`/owner/editRoom/${info._id}`}> <button  className="px-5 py-2 border-blue-500 border text-blue-500 rounded transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none w-full mb-1" >Edit</button> </Link>  
                                            <button onClick={()=>deleteRoomModal(info._id)} className="px-5 py-2 border-blue-500 border text-blue-500 rounded transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none w-full ">Delete</button>
                                        </td>
                                    </tr>
                                )
                            }) : ""}


                        </tbody>
                    </table>

                </div>
            </div>
            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </>
    )

}

export default ShowRoomTable





