import { setAuthorization } from "./general";

export function login(credentials) {

    return new Promise((res, rej) => {

        axios.post('/api/login',credentials)
            .then((response) => {
                setAuthorization(response.data.access_token);
                res(response.data);
            })
            .catch((err) => {
                rej(err.response)
            })
    })

}

export function getLocalUser() {
    const userStr = localStorage.getItem("user");
    if(!userStr){
        return null;
    }

    return JSON.parse(userStr);
}

export function getLocalPermissions() {
    //const permissionsStr = localStorage.getItem("permissions");
    const permissionsStr = $cookies.get("permissions");
    if(!permissionsStr){
        return null;
    }

    return permissionsStr;
}

export function getLocalRoles() {
    //const rolesStr = localStorage.getItem("roles");
    const rolesStr = $cookies.get("roles");
    if(!rolesStr){
        return null;
    }

    return rolesStr;
}
