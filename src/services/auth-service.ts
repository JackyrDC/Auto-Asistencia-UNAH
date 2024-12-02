import {CapacitorHttp} from "@capacitor/core"

export class AuthService {
    login(username: string, password: string) {
        const baseUrl = import.meta.env.VITE_API_BASE_URL+'/web/session/authenticate';
        
    }
}