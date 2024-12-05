import { Observable, from } from "rxjs";
import { map } from "rxjs/operators";
import { AuthService } from "./auth.service";
import { Capacitor, CapacitorHttp } from "@capacitor/core";

export class InsuranceEmissionsService {
    constructor(private authService: AuthService) { }

setEmissionMessage(emission_id: number, message: string) {
    const session_id = this.authService.getSessionCookie();

    const baseUrl = Capacitor.getPlatform() === 'web' 
    ? import.meta.env.VITE_SESSION_URL
    // ? 'api/set/insurance_message'
    : import.meta.env.VITE_SESSION_URL

    let payload = {
      url: baseUrl,
      data: {
        params: {
          id: emission_id,
          user_id: this.authService.getUID(),
          msg: message
        }
      },
      headers: { 
        'Content-Type': 'application/json',
      }
    }
    console.log('---------> ', payload);

    return from(CapacitorHttp.post(payload)).pipe(
      map((response) => {
        console.log('Respuesta del servidor 222:', response);
      })
    );
  }

  

  getEmissionsForCurrentUser(): Observable<any[]> {
    const session_id = this.authService.getSessionCookie(); 
    const partner_id = this.authService.get_partner_id();
   
    //Identifica si la plataforma es web o app
    const baseUrl = Capacitor.getPlatform() === 'web' 
    ? import.meta.env.VITE_SESSION_URL
    : import.meta.env.VITE_SESSION_URL ;
   
    console.log('Session ID------ >:', session_id, partner_id);
    console.log('Session ID para la solicitud:', session_id);
    return from(CapacitorHttp.post({
      url: baseUrl,
      data: {
        params: {
          email: '',
          db: 'acotese',
          partner_id: partner_id,
        }
      },
      headers: { 
        'Content-Type': 'application/json',
        // 'X-Openerp-Session-Id': session_id || ''
      }
    })).pipe(
      map((response) => {
        console.log('Respuesta del servidor 222:', response);
        const emissions = response.data;
        if (emissions && emissions.result) {
          console.log('Emisiones obtenidas:', emissions.result);
          return emissions.result;
        }
        return [];
      })
    );
}
}