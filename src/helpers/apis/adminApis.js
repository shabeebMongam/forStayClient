import { adminApi } from "./ApiSetup";



export const pendingApprovalsAdminApi = async (formData) => {
    try {
        const { data } = await adminApi.get("/approval", formData);
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

export const approveHotelAdminApi = async (hotelData)=>{
    try {
        const { data } = await adminApi.post("/approveHotel", hotelData);
        return data;
    } 
    catch(error){
        console.log(error);
    }
}


export const getAllUsersAdminApi = async ()=>{
    try {
        const { data } = await adminApi.get("/users");
        return data;
    } 
    catch(error){
        console.log(error);
    }
}

export const blockUserAdminApi = async (userId)=>{
    try {
        const { data } = await adminApi.post("/blockUser",{userId});
        return data;
    } 
    catch(error){
        console.log(error);
    }
}

export const unBlockUserAdminApi = async (userId)=>{
    try {
        const { data } = await adminApi.post("/unBlockUser",{userId});
        return data;
    } 
    catch(error){
        console.log(error);
    }
}

export const getAllOwnersAdminApi = async ()=>{
    try {
        const { data } = await adminApi.get("/allOwners");
        return data;
    } 
    catch(error){
        console.log(error);
    }
}



export const blockOwnerAdminApi = async (ownerId)=>{
    try {
        const { data } = await adminApi.post("/blockOwner",{ownerId});
        return data;
    } 
    catch(error){
        console.log(error);
    }
}


export const unBlockOwnerAdminApi = async (ownerId)=>{
    try {
        const { data } = await adminApi.post("/unblockOwner", { ownerId });
        return data;
    } 
    catch(error){
        console.log(error);
    }
}


export const getAllHotelsAdminApi = async ()=>{
    try {
        const { data } = await adminApi.get("/allTheHotels");
        return data;
    } 
    catch(error){
        console.log(error);
    }
}



export const blockHotelAdminApi = async (hotelId)=>{
    
    try {
        console.log(hotelId);
        const { data } = await adminApi.post("/blockHotel",{hotelId});
        return data;
    } 
    catch(error){
        console.log(error);
    }
}


export const unBlockHotelAdminApi = async (hotelId)=>{
    try {
        console.log(hotelId);

        const { data } = await adminApi.post("/unBlockHotel",{hotelId});
        return data;
    } 
    catch(error){
        console.log(error);
    }
}


export const dataForAdminDashboardAdminApi = async ()=>{
    try {

        const { data } = await adminApi.get("/adminDashboardData");
        return data;
    } 
    catch(error){
        console.log(error);
    }
}






