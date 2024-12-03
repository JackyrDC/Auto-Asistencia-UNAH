import {CapacitorHttp,Capacitor} from "@capacitor/core"
import {from, Observable, BehaviorSubject} from "rxjs"
import {map} from "rxjs/operators"

export class AuthService{
    login(username: string, password: string) : Observable<any>{
        const baseUrl = import.meta.env.VITE_USERS_API_URL;
        
        return from(CapacitorHttp.post({
            url: baseUrl,
            data:{
                jsonrpc: "2.0",
                method: "call",
                params: {
                    db: "prueba11",
                    login: "prueba11@gmail.com",
                    password: "hola"
                }
            },
            headers: {
                'Content-Type': 'application/json'}}
    ).pipe(
        map((response)=>{
            const user = response.data;
        }

        )
    ))

    }
}