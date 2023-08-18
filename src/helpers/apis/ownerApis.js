import { ownerApi } from "./ApiSetup";

const toBlockOwner = (data) => {
    if (data.logHimOut) {
        localStorage.removeItem("ownerName")
        localStorage.removeItem("ownerToken")
        window.location.reload();
    }
}



export const addHotelOwnerApi = async (formData) => {
    try {
        const { data } = await ownerApi.post("/addHotel", formData);
        return data;

    } catch (error) {
        return error
        // if (
        //     error.response && 
        //     error.response.status >= 400 &&
        //     error.response.status <= 500
        // ) {
        //     return (error.response);
        //     // notify(error.response.data.message)
        // }
    }
};


export const getmyHotelsOwnerApi = async (page)=>{
    try {
        const {data} = await ownerApi.get(`/getMyHotels?page=${page}`)
        toBlockOwner(data)
        return data;
    } catch (error) {
            return error;
    }    
}


export const addRoomOwnerApi = async (datas)=>{
    try {
        // console.log(datas);    
        // console.log(datas.values);    
        const {data} = await ownerApi.post(`/addRoom/${datas.hotelId}`,datas )
        toBlockOwner(data)
        return data;
    } catch (error) {
            return error;
    }    
}


export const getOwnerDataOwnerApi = async ()=>{
    try {
        const {data} = await ownerApi.get("/getOwnerData")
        toBlockOwner(data)
        return data;
    } catch (error) {
            return error;
    }    
}

export const  editHotelGetOwnerApi = async (hotelId)=>{
    try {
        // console.log(datas);
        const {data} = await ownerApi.get(`/editHotel/${hotelId}`)
        toBlockOwner(data)
        return data
    }catch(error){
            return error
    }
}

export const  deleteHotelOwnerApi = async (hotelId)=>{
    try{
        const {data} = await ownerApi.post(`/deleteHotel/${hotelId}`)
        toBlockOwner(data)
        return data
    }catch(error){
        return error
    }
}



export const  getRoomDataOwnerApi = async (hotelId)=>{
    try{
        const {data} = await ownerApi.get(`/getRoomData/${hotelId}`)
        toBlockOwner(data)
        return data
    }catch(error){
        return error
    }
}

export const deleteCurrentImgInEditOwnerApi = async (hotelData)=>{
    try {
        // console.log(img);
        const hotelId = hotelData.hotelId
        const hotelImg = hotelData.img

        const { data } = await ownerApi.post("/deleteHotelImg", {hotelId,hotelImg})
        toBlockOwner(data)
        return data
    } catch (error) {
        return error
    }
}


export const editHotelPostOwnerApi = async (hotelData)=>{
    try {
        const { data } = await ownerApi.post(`/editHotel/${hotelData.hotelId}`, {...hotelData})
        toBlockOwner(data)
        return data
    } catch (error) {
        return error
    }
}


export const bookingPendingOwnerApi = async ()=>{
    try{
        const { data } = await ownerApi.get("/bookingPendings")
        toBlockOwner(data)
        return data

    }catch(error){
        return error
    }
}


export const approveRoomOwnerApi = async (dataId)=>{
    try{
        const { data } = await ownerApi.post("/approveRoom", {dataId})
        toBlockOwner(data)
        return data

    }catch(error){
        return error
    }
}



export const bookedDetailsOwnerApi = async (dataId)=>{
    try{
        const { data } = await ownerApi.get(`/receivedBookingDetails/${dataId}`)
        toBlockOwner(data)
        return data

    }catch(error){
        return error
    }
}

export const deleteRoomOwnerApi = async (roomId) => {
    try {
        console.log(roomId);
        const { data } = await ownerApi.post(`/deleteRoom/${roomId}`)
        toBlockOwner(data)
        return data
    } catch (error) {
        return error
    }
}

export const editRoomGetOwnerApi = async (roomId) => {
    try {
        const { data } = await ownerApi.get(`/editRoomDetails/${roomId}`)
        toBlockOwner(data)
        return data
    } catch (error) {
        return error
    }
}


export const getDashboardDataOwnerApi = async () => {
    try {
        const { data } = await ownerApi.get(`/dashboardData`)
        toBlockOwner(data)
        return data
    } catch (error) {
        return error
    }
}


export const getAllBookingsOwnerApi = async () => {
    try {
        const { data } = await ownerApi.get(`/allBookings`)
        toBlockOwner(data)
        return data
    } catch (error) {
        return error
    }
}
export const byMonthsOwnerApi = async () => {
    try {
        const { data } = await ownerApi.get(`/bookingByMonths`)
        toBlockOwner(data)
        return data
    } catch (error) {
        return error
    }
}



















