import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import {UserHome} from '../components/User.jsx';  
import './Home.css';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Blank</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
        <UserHome />
      </IonContent>
    </IonPage>
  );
};

export default Home;
