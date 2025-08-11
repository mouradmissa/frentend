import React, { useEffect, useState } from 'react';
import { Transaction } from '../types';
import Headerglobal from './headerglobal';
import { useNavigate } from 'react-router-dom'; // <- import
import '../assets/css/AdvancedSearch.css';

const AdvancedSearch: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filtered, setFiltered] = useState<Transaction[]>([]);
  const [searchId, setSearchId] = useState('');
  const [status, setStatus] = useState('');
  const [type, setType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const navigate = useNavigate(); // <- init

  useEffect(() => {
    fetch('https://backend-18yu.onrender.com/transactions')
      .then(res => res.json())
      .then(data => setTransactions(data))
      .catch(err => console.error('Erreur:', err));
  }, []);
  const logSearchAction = async () => {
    const email = localStorage.getItem('userEmail') || 'inconnu';
  
    try {
      await fetch('https://backend-18yu.onrender.com/log-action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          action: 'search',
          details: `Recherche avec filtres - ID: ${searchId || 'tous'}, Statut: ${status || 'tous'}, Type: ${type || 'tous'}, Date début: ${startDate || 'non spécifiée'}, Date fin: ${endDate || 'non spécifiée'}`
        })
      });
    } catch (error) {
      console.error("Erreur lors du log de recherche :", error);
    }
  };
  
  const handleSearch = async () => {
    const result = transactions.filter((t) => {
      const matchesId = !searchId || t.TRANSACTION_ID?.includes(searchId);
      const matchesStatus = !status || t.STATUS?.toString() === status;
      const matchesType = !type || t.TYPE === type;
  
      const tDate = new Date(t.CREATE_DATE || '');
      const matchesStartDate = !startDate || tDate >= new Date(startDate);
      const matchesEndDate = !endDate || tDate <= new Date(endDate);
  
      return matchesId && matchesStatus && matchesType && matchesStartDate && matchesEndDate;
    });
  
    setFiltered(result);
    await logSearchAction(); // log après avoir filtré
  };
  
  // Fonction pour naviguer vers détails
  const handleViewDetails = (transactionId: string) => {
    navigate(`/transactions/${transactionId}`);
  };

  return (
    <div className="advanced-search-page">
      <Headerglobal />
      <div className="advanced-search-container">
        <h2>Recherche Avancée</h2>

        <div className="search-form">
          {/* Tes inputs/selects... */}
          <input
            type="text"
            placeholder="ID Transaction"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
          />
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="">Statut</option>
            <option value="1">Succès</option>
            <option value="0">En attente</option>
            <option value="-3">Échoué</option>
          </select>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="">Type</option>
            <option value="invoice">Facture</option>
            <option value="bundle">Forfait</option>
            <option value="recharge">Recharge</option>
          </select>
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
          <button onClick={handleSearch}>Rechercher</button>
        </div>

        <div className="results">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Type</th>
                <th>Statut</th>
                <th>Date</th>
                <th>Détails</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length > 0 ? (
                filtered.map((t, i) => (
                  <tr key={i}>
                    <td>{t.TRANSACTION_ID}</td>
                    <td>{t.TYPE}</td>
                    <td>{t.STATUS === 1 ? 'Succès' : t.STATUS === 0 ? 'En attente' : 'Échoué'}</td>
                    <td>{new Date(t.CREATE_DATE || '').toLocaleString()}</td>
                    <td>
                      <button
                        className="details-button"
                        onClick={() => handleViewDetails(t.TRANSACTION_ID)}
                      >
                        Voir détails
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5}>Aucune transaction trouvée</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdvancedSearch;










