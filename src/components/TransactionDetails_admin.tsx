import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Transaction } from '../types';
import Headerglobal_admin from './headerglobal_admin';
import '../assets/css/TransactionDetails.css';

const TransactionDetails_admin: React.FC = () => {
  const { transactionId } = useParams<{ transactionId: string }>();
  const navigate = useNavigate();

  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!transactionId) {
      setError('ID de transaction manquant');
      setLoading(false);
      return;
    }

    const fetchTransaction = async () => {
      try {
        const response = await fetch(`https://backend-18yu.onrender.com/transactions/${transactionId}`);
        if (!response.ok) {
          throw new Error('Transaction non trouvée');
        }
        const data: Transaction = await response.json();
        setTransaction(data);
      } catch (err: any) {
        setError(err.message || 'Erreur lors du chargement');
      } finally {
        setLoading(false);
      }
    };

    fetchTransaction();
  }, [transactionId]);

  const formatDate = (dateString?: string) => {
    if (!dateString || dateString.trim() === '') return 'N/A';
    try {
      const date = new Date(dateString);
      return date.toLocaleString('fr-FR');
    } catch {
      return 'N/A';
    }
  };

  const formatAmount = (amount: string) => {
    try {
      const num = parseFloat(amount.replace(',', '.'));
      return num.toLocaleString('fr-FR', {
        style: 'currency',
        currency: 'TND',
        minimumFractionDigits: amount.includes(',') ? 3 : 0
      });
    } catch {
      return amount;
    }
  };

  const getStatusText = (status: string) => {
    switch(status) {
      case '1': return 'Succès';
      case '-3': return 'Échoué';
      case '0': return 'En attente';
      default: return 'Inconnu';
    }
  };

  if (loading) {
    return (
      <div className="transaction-details-page">
      <Headerglobal_admin />
      <p>Chargement des détails...</p>
      </div>
    );
  }

  if (error || !transaction) {
    return (
      <div className="transaction-details-page">
      <Headerglobal_admin />
      <div className="transaction-not-found">
          <h2>{error || 'Transaction non trouvée'}</h2>
          <button onClick={() => navigate(-1)}>Retour</button>
        </div>
      </div>
    );
  }

  return (
    <div className="transaction-details-page">
      <Headerglobal_admin />
      <div className="transaction-details-container">
        <div className="transaction-details-header">
          <h2>Détails de la Transaction {transaction.TRANSACTION_ID}</h2>
        </div>
        
        <div className="transaction-details-grid">
          <div className="detail-section">
            <h3>Informations de base</h3>
            <div className="detail-row">
              <span className="detail-label">ID Transaction:</span>
              <span className="detail-value">{transaction.TRANSACTION_ID}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">ID Backend:</span>
              <span className="detail-value">{transaction.TRANSACTION_ID_BACK_END}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Type:</span>
              <span className="detail-value">
                {transaction.TYPE === 'invoice' ? 'Facture' : 
                 transaction.TYPE === 'bundle' ? 'Forfait' : 'Recharge'}
              </span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Statut:</span>
              <span className={`detail-value status-${transaction.STATUS}`}>
                {getStatusText(String(transaction.STATUS))}
              </span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Date de création:</span>
              <span className="detail-value">{formatDate(transaction.CREATE_DATE)}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Dernière mise à jour:</span>
              <span className="detail-value">{formatDate(transaction.UPDATE_DATE)}</span>
            </div>
          </div>
          
          <div className="detail-section">
            <h3>Informations client</h3>
            <div className="detail-row">
              <span className="detail-label">ID Client:</span>
              <span className="detail-value">{transaction.CUSTOMER_ID}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Canal:</span>
              <span className="detail-value">{transaction.CHANNEL_NAME}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Input client:</span>
              <span className="detail-value">{transaction.CUSTOMER_INPUT}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Promo:</span>
              <span className="detail-value">{transaction.PROMO}</span>
            </div>
          </div>
          
          <div className="detail-section">
            <h3>Montants</h3>
            <div className="detail-row">
              <span className="detail-label">Montant (TND):</span>
              {formatAmount(String(transaction.TOTAL_AMOUNT_BE))}
            </div>
            <div className="detail-row">
              <span className="detail-label">Montant (SMT):</span>
              <span className="detail-value">
                {parseInt(String(transaction.TOTAL_AMOUNT_SMT)).toLocaleString()} SMT
              </span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Montant déposé:</span>
              <span className="detail-value">
                {transaction.SMT_DEPOSITED_AMOUNT ? 
                `${parseInt(String(transaction.SMT_DEPOSITED_AMOUNT)).toLocaleString()} SMT` : 'N/A'}
              </span>
            </div>
          </div>
          
          <div className="detail-section">
            <h3>Informations SMT</h3>
            <div className="detail-row">
              <span className="detail-label">Numéro de commande SMT:</span>
              <span className="detail-value">{transaction.SMT_ORDER_NUMBER || 'N/A'}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Statut SMT:</span>
              <span className="detail-value">{transaction.SMT_ORDER_STATUS || 'N/A'}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Code d'approbation:</span>
              <span className="detail-value">{transaction.SMT_APPROVAL_CODE || 'N/A'}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Code d'erreur:</span>
              <span className="detail-value">{transaction.SMT_ERROR_CODE || 'N/A'}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Date de commande SMT:</span>
              <span className="detail-value">{formatDate(transaction.SMT_ORDER_DATE)}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Nombre de tentatives:</span>
              <span className="detail-value">{transaction.NO_OF_RETRY || '0'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetails_admin;










