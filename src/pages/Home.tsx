import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton } from '@ionic/react';
import UserHeader from '../components/User';  
import './Home.css';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>¡Listas Ya!</IonTitle>
        </IonToolbar>
        <IonButton routerLink="/login">Login</IonButton>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
        <UserHeader />
      </IonContent>
    </IonPage>
  );
};

export default Home;
