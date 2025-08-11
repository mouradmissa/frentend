import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import React, { useState } from 'react';
import Signup from './components/Signup';
import Login from './components/login';
import AutoLogin from './components/AutoLogin';
import Forgetpassword from './components/Forgetpassword';
import Logout from './components/login';
import PrivateRoute from './components/PrivateRoute'; 
import PublicRoute from './components/PublicRoute'; 
import Home from './components/Home';
import Profile from './components/Profile';
import Profile_admin from './components/Profile_admin';
import UserManagement from './components/UserManagement';
import AdvancedSearch from './components/AdvancedSearch';
import Home_admin from './components/Home_admin';
import { Transaction } from '../src/types';
import TransactionDetails from './components/TransactionDetails';
import TransactionDetails_admin from './components/TransactionDetails';
import TransactionDashboard from './components/TransactionDashboard'; // Import du nouveau composant
import TransactionDashboard_admin from './components/TransactionDashboard_admin'; // Import du nouveau composant
import PendingAdmins from './components/PendingAdmins';  // <-- Importer ton nouveau composant
import HistoriqueActivite from './components/HistoriqueActivite';
import ActionsDuJour from './components/ActionsDuJour';
import Contact from './components/Contact';
// ...

// Dans ton <Routes> sous <PrivateRoute> ajoute :

const App: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  return (
    
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>

        <Route element={<PrivateRoute />}>
        <Route path="/auto-login" element={<AutoLogin />} />

          <Route path="/home" element={<Home />} />
          <Route path="/home_admin" element={<Home_admin />} />
          <Route path="/admin_users" element={<UserManagement />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile_admin" element={<Profile_admin />} />
          <Route path="/Forgetpassword" element={<Forgetpassword />} /> 
          <Route path="/transactions" element={<TransactionDashboard />} /> {/* Nouvelle route */}
          <Route path="/transactions_admin" element={<TransactionDashboard_admin />} /> {/* Nouvelle route */}
          <Route path="/transactions_admin/:transactionId" element={<TransactionDetails_admin />} />
          <Route path="/admins/pending" element={<PendingAdmins />} />
          <Route path="/transactions/:transactionId" element={<TransactionDetails />} />
          <Route path="/recherche-avancee" element={<AdvancedSearch />} />
          <Route path="/historique/:email" element={<HistoriqueActivite />} />
          <Route path="/actions-du-jour/:jour" element={<ActionsDuJour />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="/logout" element={<Logout />} />
        </Route>
      </Routes>
    </Router>
    
  );
};

export default App;










