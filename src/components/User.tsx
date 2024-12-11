import React, { useEffect, useState } from 'react';
import { AuthService } from '../services/auth.service'; // Asegúrate de que la ruta sea correcta

const UserHeader: React.FC = () => {
  const authService = new AuthService(); // Instancia del servicio de autenticación
  const [username, setUsername] = useState<string | null>(null);

  authService.login('prueba11@gmail.com','hola123');

  useEffect(() => {
    console.log('UserHeader mounted');
    console.log('authService', authService);
    console.log('authService.currentUser', authService.getUsername());
    // Obtenemos el nombre del usuario al montar el componente
    const userName = authService.getUsername();
    setUsername(userName);
  }, []);
  console.log('username', username);

  return (
    <div>
      <h2>Bienvenido, {username ? username : 'Usuario Desconocido'}</h2>
    </div>
  );
};

export default UserHeader;
