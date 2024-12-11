import {CapacitorHttp,Capacitor} from "@capacitor/core"
import {from, Observable, BehaviorSubject} from "rxjs"
import {map} from "rxjs/operators"

export class AuthService {
    private currentUserSubject: BehaviorSubject<any>;
    public currentUser: Observable<any>;
  
    constructor() {
      this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser') ?? '{}'));
      this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue() {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string): Observable<any> {
        console.log('login', username, password);
        //Identifica si la plataforma es web o app
        const baseUrl = Capacitor.getPlatform() === 'web' 
          ? '/api/auth' // URL del servidor Odoo
          : import.meta.env.VITE_SESSION_URL 
          console.log('baseUrl', baseUrl);
        return from(CapacitorHttp.post({
          url: baseUrl,
          data: {
            jsonrpc: '2.0',
            method: 'call',
            params: {
              db: 'prueba11',
              login: "username",
              password: "password"
            }
          },
          headers: { 'Content-Type': 'application/json' },
        })).pipe(
          map((response) => {
            console.log('Respuesta del servidor:', response);
            const user = response.data;
            if (user && user.result) {
              const userData = {
                ...user.result,
                session_id: user.result.session_id
              };
              console.log('userData', userData);
              localStorage.setItem('currentUser', JSON.stringify(userData));
              this.currentUserSubject.next(userData);
              console.log('Usuario autenticado:', userData);
              console.log('Session ID guardado:', userData.session_id);
            }
            return user;
          })
        );
      }

      logout(): Promise<void> {
        return new Promise<void>((resolve) => {
          localStorage.removeItem('currentUser');
          this.currentUserSubject.next(null);
          console.log('Sesión cerrada');
          resolve();
        });
      }
      getUID(): number | 0 {
        const currentUser = this.currentUserValue;
        return currentUser?.uid || null;
      }
      
      getUsername(): string | null {
        const currentUser = this.currentUserValue;
        return currentUser?.name || null;
      }
    
      get_partner_id(): number | null {
        const currentUser = this.currentUserValue;
        return currentUser?.partner_id || null;
      }
    
      getSessionCookie(): string | null {
        // Intentamos obtener la sesión de la cookie primero
        console.log('document.cookie', document.cookie);
        const cookieSession = document.cookie.split('; ').find(row => row.startsWith('session_id='));
        if (cookieSession) {
          return cookieSession.split('=')[1];
        }
        
        // Si no está en la cookie, recurrimos al almacenamiento local
        const currentUser = this.currentUserValue;
        return currentUser?.session_id || null;
      }
}