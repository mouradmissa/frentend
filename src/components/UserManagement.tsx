import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';  // <-- Importer useNavigate
import '../assets/css/UserManagement.css';
import Headerglobal_admin from './headerglobal_admin';

interface User {
  id: number;
  email: string;
  name: string;
  role: string;
  created_at: string;
  isBlocked: number; // 👈 on garde number pour correspondre à la BDD
}

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();  // <-- Initialiser useNavigate

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch('http://192.168.1.64:5000/api/users');
      if (!res.ok) throw new Error('Erreur chargement utilisateurs');
      const data: User[] = await res.json();
      setUsers(data);
    } catch (err: any) {
      setError(err.message || 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId: number, newRole: string) => {
    try {
      const res = await fetch(`http://192.168.1.64:5000/api/users/${userId}/role`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: newRole }),
      });
      if (!res.ok) throw new Error('Erreur mise à jour rôle');

      setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u));
    } catch (err: any) {
      alert(err.message || 'Erreur inconnue');
    }
  };

  const toggleBlockStatus = async (userId: number, currentStatus: number) => {
    try {
      const newStatus = currentStatus === 1 ? 0 : 1;
      const res = await fetch(`http://192.168.1.64:5000/api/users/${userId}/block`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isBlocked: newStatus }),
      });

      if (!res.ok) throw new Error('Erreur lors de la mise à jour du statut.');

      setUsers(users.map(user =>
        user.id === userId ? { ...user, isBlocked: newStatus } : user
      ));
    } catch (err: any) {
      alert(err.message || 'Erreur inconnue.');
    }
  };

  // Nouvelle fonction pour naviguer vers la page des admins en attente
  const goToPendingAdmins = () => {
    navigate('/admins/pending'); // <-- mets le chemin de ta page de validation admin ici
  };

  return (
    <div className="user-management-container">
      <Headerglobal_admin />
      <h2 className="title-with-icon">
  <img src="/users-icon-png-8.png" alt="Users Icon" className="icon" />
  Gestion des utilisateurs
</h2>

      <div className="top-actions">
  <button className="go-to-pending-btn" onClick={goToPendingAdmins}>
    Gérer les validations Admin
  </button>
</div>
      {loading && <p className="loading">Chargement des utilisateurs...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && (
        <table className="user-table">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Email</th>
              <th>Rôle</th>
              <th>Date création</th>
              <th>Statut</th>
              <th>historique</th>
            </tr>
          </thead>
          <tbody>
  {users.map((u) => (
    <tr key={u.id}>
      <td data-label="Nom">{u.name}</td>
      <td data-label="Email">{u.email}</td>
      <td data-label="Rôle">{u.role}</td>
      <td data-label="Date de création">{new Date(u.created_at).toLocaleString()}</td>
      <td data-label="Statut">
        <button
          className={u.isBlocked === 1 ? 'unblock-button' : 'block-button'}
          onClick={() => toggleBlockStatus(u.id, u.isBlocked)}
        >
          {u.isBlocked === 1 ? 'Débloquer' : 'Bloquer'}
        </button>
      </td>
      <td data-label="Historique">
        <button
          className="history-button"
          onClick={() => navigate(`/historique/${encodeURIComponent(u.email)}`)}
        >
          Voir historique
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

export default UserManagement;









