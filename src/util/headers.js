export const setHeaders = (headers) => {
    if(headers["access-token"] !== ""){
        localStorage.setItem("access-token", headers["access-token"]);
        localStorage.setItem("client", headers["client"]);
        localStorage.setItem("uid", headers["uid"]);
    }
};

export const getHeaders =  () => {
    return {
        "access-token" : localStorage.getItem("access-token"),
        "client" : localStorage.getItem("client"),
        "uid" : localStorage.getItem("uid")
    }
};

