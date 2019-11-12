export const setHeaders = (headers) => {
    console.log(headers);
    if(headers["access-token"] !== ""){
        console.log(["access-token"]);
        console.log(headers["access-token"])
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

