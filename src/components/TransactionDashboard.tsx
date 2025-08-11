import React, { useState, useEffect } from 'react';
import '../assets/css/TransactionDashboard.css';
import { Transaction } from '../types';
import { useNavigate } from 'react-router-dom';
import Headerglobal from './headerglobal';

type SortOrder = 'asc' | 'desc';

const TransactionDashboard: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [filter, setFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [sortKey, setSortKey] = useState<keyof Transaction | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://backend-18yu.onrender.com/transactions');
        const data = await response.json();
        setTransactions(data);
      } catch (error) {
        console.error("Erreur lors du chargement des transactions:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Fonction pour trier
  const sortTransactions = (list: Transaction[]) => {
    if (!sortKey) return list;

    return [...list].sort((a, b) => {
      let valA = a[sortKey];
      let valB = b[sortKey];

      // Convertir les valeurs en string pour comparaison (gère undefined)
      const strA = valA ? String(valA).toLowerCase() : '';
      const strB = valB ? String(valB).toLowerCase() : '';

      if (strA < strB) return sortOrder === 'asc' ? -1 : 1;
      if (strA > strB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  };
  const statusTextToCode = (text: string): string | null => {
    text = text.toLowerCase();
    if (text.includes('succès') || text.includes('success')) return '1';
    if (text.includes('échoué') || text.includes('failed')) return '-3';
    if (text.includes('attente') || text.includes('pending')) return '0';
    return null;
  };
  
  // Appliquer filtre + recherche
  const filteredTransactions = transactions.filter(transaction => {
    const matchesFilter =
      filter === 'all' ||
      (filter === 'success' && transaction.STATUS === 1) ||
      (filter === 'failed' && transaction.STATUS === -3) ||
      (filter === 'pending' && transaction.STATUS === 0);
  
    const term = searchTerm.toLowerCase();
  
    // Chercher si le terme correspond à un status
    const statusCode = statusTextToCode(term);
  
    const matchesSearch =
      // Si recherche textuelle classique
      (transaction.TRANSACTION_ID?.toString().toLowerCase() || '').includes(term) ||
      (transaction.CUSTOMER_ID?.toString().toLowerCase() || '').includes(term) ||
      (transaction.TYPE?.toString().toLowerCase() || '').includes(term) ||
      // OU recherche par status en texte
      (statusCode !== null && transaction.STATUS === parseInt(statusCode));
  
    return matchesFilter && matchesSearch;
  });
  
  // Appliquer tri sur les données filtrées
  const sortedTransactions = sortTransactions(filteredTransactions);

  const getStatusBadge = (status: string | number) => {
    switch (status.toString()) {
      case '1':
        return <span className="status-badge success">Succès</span>;
      case '-3':
        return <span className="status-badge failed">Échoué</span>;
      case '0':
        return <span className="status-badge pending">En attente</span>;
      default:
        return <span className="status-badge">Inconnu</span>;
    }
  };

  const formatAmount = (amount: string | number | undefined) => {
    const raw = typeof amount === 'string' ? amount.replace(',', '.') : amount?.toString();
    const value = parseFloat(raw || '0');
    return isNaN(value)
      ? '0.000 TND'
      : value.toLocaleString('fr-FR', {
          style: 'currency',
          currency: 'TND',
          minimumFractionDigits: 3,
        });
  };
  const logViewDetailsAction = async (transactionId: string) => {
    const email = localStorage.getItem('userEmail') || 'inconnu';
  
    try {
      await fetch('https://backend-18yu.onrender.com/log-action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          action: 'view_details',
          details: `Consultation détails transaction ID : ${transactionId}`
        })
      });
    } catch (error) {
      console.error("Erreur lors du log de consultation de détails :", error);
    }
  };
  
  const handleViewDetails = (transactionId: string) => {
    logViewDetailsAction(transactionId); // Enregistre l'action
    navigate(`/transactions/${transactionId}`);
  };
  // Gestion du clic sur un header pour trier
  const handleSort = (key: keyof Transaction) => {
    if (sortKey === key) {
      // inverser ordre si même colonne
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  const totalAmount = transactions.reduce((sum, t) => {
    const val = parseFloat(t.TOTAL_AMOUNT_BE?.toString().replace(',', '.') || '0');
    return sum + (isNaN(val) ? 0 : val);
  }, 0);
  const logSearchAction = async (term: string) => {
    const email = localStorage.getItem('userEmail') || 'inconnu';
  
    if (term.trim() === '') return;
  
    try {
      await fetch('https://backend-18yu.onrender.com/log-action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          action: 'search',
          details: `Recherche dans dashboard : ${term}`
        })
      });
    } catch (error) {
      console.error('Erreur lors de l’enregistrement du log de recherche:', error);
    }
  };
  return (
    <div className="dashboard-page">
      <div className="transaction-dashboard">
        <Headerglobal />
        <div className="dashboard-controls">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Rechercher une transaction..."
              value={searchTerm}
              onChange={(e) => {
                const value = e.target.value;
                setSearchTerm(value);
                logSearchAction(value);
              }}
              
            />
            <i className="search-icon">🔍</i>
          </div>
          <div className="filter-buttons">
  {['all', 'success', 'failed', 'pending'].map((key) => (
    <button
      key={key}
      className={filter === key ? 'active' : ''}
      onClick={() => setFilter(key)}
    >
      {{
        all: 'Toutes',
        success: 'Réussies',
        failed: 'Échouées',
        pending: 'En attente',
      }[key]}
    </button>
  ))}

  {/* 🔍 Bouton Recherche Avancée */}
  <button
    className="advanced-search-button"
    onClick={() => navigate('/recherche-avancee')}
  >
    Recherche avancée
  </button>
</div>

        </div>

        {loading ? (
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Chargement des transactions...</p>
          </div>
        ) : (
          <div className="dashboard-content">
            <div className="summary-cards">
              <div className="summary-card">
                <h3>Total Transactions</h3>
                <p>{transactions.length}</p>
              </div>
              <div className="summary-card">
                <h3>Montant Total</h3>
                <p>{formatAmount(totalAmount)}</p>
              </div>
              <div className="summary-card">
                <h3>Transactions Réussies</h3>
                <p>{transactions.filter(t => t.STATUS === '1').length}</p>
              </div>
              <div className="summary-card">
                <h3>Transactions Échouées</h3>
                <p>{transactions.filter(t => t.STATUS === '-3').length}</p>
              </div>
            </div>

            <div className="transactions-table-container">
              <table className="transactions-table">
                <thead>
                  <tr>
                    <th onClick={() => handleSort('TRANSACTION_ID')} style={{ cursor: 'pointer' }}>
                      ID Transaction {sortKey === 'TRANSACTION_ID' ? (sortOrder === 'asc' ? '▲' : '▼') : ''}
                    </th>
                    <th>ID Backend</th>
                    <th>Type</th>
                    <th>Client</th>
                    <th>Canal</th>
                    <th>Montant (TND)</th>
                    <th>Statut</th>
                    <th>Détails</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedTransactions.length > 0 ? (
                    sortedTransactions.map((transaction, index) => (
                      <tr key={index}>
                        <td>{transaction.TRANSACTION_ID}</td>
                        <td>{transaction.TRANSACTION_ID_BACK_END}</td>
                        <td className="transaction-type">
                          <span className={`type-badge ${transaction.TYPE}`}>
                            {transaction.TYPE === 'invoice'
                              ? 'Facture'
                              : transaction.TYPE === 'bundle'
                              ? 'Forfait'
                              : 'Recharge'}
                          </span>
                        </td>
                        <td>{transaction.CUSTOMER_ID}</td>
                        <td>{transaction.CHANNEL_NAME}</td>
                        <td>{formatAmount(transaction.TOTAL_AMOUNT_BE)}</td>
                        <td>{getStatusBadge(transaction.STATUS)}</td>
                        <td>
                          <button
                            className="details-button"
                            onClick={() => handleViewDetails(transaction.TRANSACTION_ID)}
                          >
                            Voir détails
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={11} className="no-results">
                        Aucune transaction trouvée
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionDashboard;










