import React, { useEffect, useState } from 'react';
import Headerglobal_admin from './headerglobal_admin';
import '../assets/css/PendingAdmins.css'; // <--- nouveau fichier CSS
import { useNavigate } from 'react-router-dom';
interface Admin {
  id: number;
  email: string;
  name: string;
  role: string;
  created_at: string;
}

const PendingAdmins: React.FC = () => {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchPendingAdmins();
  }, []);

  const fetchPendingAdmins = async () => {
    try {
      const res = await fetch('https://backend-18yu.onrender.com/api/admins/pending');
      if (!res.ok) throw new Error('Erreur chargement admins en attente');
      const data: Admin[] = await res.json();
      setAdmins(data);
    } catch (err: any) {
      setError(err.message || 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  };

  const handleValidate = async (id: number) => {
    try {
      const res = await fetch(`https://backend-18yu.onrender.com/api/admins/${id}/validate`, {
        method: 'PATCH',
      });
      if (!res.ok) throw new Error('Erreur validation admin');
      alert('✅ Admin validé avec succès');
      setAdmins(admins.filter(admin => admin.id !== id));
    } catch (err: any) {
      alert(err.message || 'Erreur inconnue');
    }
  };
  const handleretourClick = () => {
    navigate('/admin_users');
  };
  return (
    <div className="pending-admins-container">
      <Headerglobal_admin />
      <h2 className="title-with-icon">
    <img src="/liste icon.png" alt="Icone liste" className="icon" />
    Admins en attente de validation
  </h2>      
  <div className="top-actions">
  <button className="go-to-pending-btn" onClick={handleretourClick}>
   Retour vers la liste
  </button>
</div>
      {loading && <p className="info">Chargement...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && admins.length === 0 && <p className="info">Aucune demande en attente.</p>}

      {!loading && admins.length > 0 && (
        <table className="admins-table">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Email</th>
              <th>Date création</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
  {admins.map(admin => (
    <tr key={admin.id}>
      <td data-label="Nom">{admin.name}</td>
      <td data-label="Email">{admin.email}</td>
      <td data-label="Date création">{new Date(admin.created_at).toLocaleString()}</td>
      <td data-label="Action">
        <button className="validate-btn" onClick={() => handleValidate(admin.id)}>
          ✅ Valider
        </button>
      </td>
    </tr>
  ))}
</tbody>
        </table>
      )}
    </div>
  );
};

export default PendingAdmins;










