import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Headerglobal_admin from './headerglobal_admin';
import '../assets/css/UserManagement.css';
import '../assets/css/PendingAdmins.css'; // <--- nouveau fichier CSS

import { useNavigate } from 'react-router-dom';
interface UserLog {
  id: number;
  email: string;
  action: string;
  details: string | null;
  timestamp: string;
}

const HistoriqueActivite: React.FC = () => {
  const { email } = useParams<{ email: string }>();
  const [logs, setLogs] = useState<UserLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!email) return;

    fetch(`https://backend-18yu.onrender.com/api/user-logs/${encodeURIComponent(email)}`)
      .then(res => {
        if (!res.ok) throw new Error('Erreur lors du chargement des logs');
        return res.json();
      })
      .then((data: UserLog[]) => {
        setLogs(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message || 'Erreur inconnue');
        setLoading(false);
      });
  }, [email]);
  const handleretourClick = () => {
    navigate('/admin_users');
  };
  return (
    <div className="user-management-container">
      <Headerglobal_admin />
      <h2>Historique d'activité de {email}</h2>
      <div className="top-actions">
  <button className="go-to-pending-btn" onClick={handleretourClick}>
   Retour vers la liste
  </button>
</div>

      {loading && <p>Chargement de l'historique...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && logs.length === 0 && <p>Aucune activité trouvée.</p>}

      {!loading && !error && logs.length > 0 && (
        <table className="user-table">
          <thead>
            <tr>
              <th>Action</th>
              <th>Détails</th>
              <th>Date / Heure</th>
            </tr>
          </thead>
          <tbody>
            {logs.map(log => (
              <tr key={log.id}>
                <td>{log.action}</td>
                <td>{log.details || '-'}</td>
                <td>{new Date(log.timestamp).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default HistoriqueActivite;










