// src/components/ActionsDuJour.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Headerglobal_admin from './headerglobal_admin';
import '../assets/css/ActionsDuJour.css'; // Assure-toi que ce fichier existe

interface ActionLog {
  user_email: string;
  action: string;
  details: string;
  timestamp: string;
}

const ActionsDuJour: React.FC = () => {
  const { jour } = useParams<{ jour: string }>();
  const [actions, setActions] = useState<ActionLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`https://backend-18yu.onrender.com/api/logs/day/${jour}`)
      .then(res => {
        setActions(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Erreur lors du chargement des actions :', err);
        setLoading(false);
      });
  }, [jour]);

  return (
    <div className="pending-admins-container">
      <Headerglobal_admin />
      <h2 className="title">Actions effectuées le {jour}</h2>

      {loading ? (
        <p className="info">Chargement des actions...</p>
      ) : actions.length === 0 ? (
        <p className="info">Aucune action trouvée pour ce jour.</p>
      ) : (
        <table className="admins-table">
          <thead>
            <tr>
              <th>Email</th>
              <th>Action</th>
              <th>Détails</th>
              <th>Horodatage</th>
            </tr>
          </thead>
          <tbody>
            {actions.map((log, index) => (
              <tr key={index}>
                <td data-label="Email">{log.user_email}</td>
                <td data-label="Action">{log.action}</td>
                <td data-label="Détails">{log.details}</td>
                <td data-label="Horodatage">{new Date(log.timestamp).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ActionsDuJour;










