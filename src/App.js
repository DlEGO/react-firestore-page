import './App.css';
import Heroes from './components/Heroes'
import HeroForm from './components/HeroForm';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import 'bootswatch/dist/superhero/bootstrap.min.css';

function App() {
  


  return (
    <div className="container p-4">
      <div>
        <Heroes />
      </div>
    </div>

  );
    
}

export default App;
