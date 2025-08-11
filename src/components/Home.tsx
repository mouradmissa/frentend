import Headerglobal from './headerglobal'; 
import '../assets/css/Home.css';
import React, { useEffect, useState } from 'react';
import '../assets/css/Home_admin.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
const Home: React.FC = () => {
  const [donneesTransactions, setDonneesTransactions] = useState<{ day: string; transactions: number }[]>([]);
  const [transactionsParType, setTransactionsParType] = useState<{ type: string; transactions: number }[]>([]);

  const COLORS = ['#E30613', '#FF9A40', '#FFC107', '#FF7043', '#FF5722', '#00C49F', '#0088FE'];
  const navigate = useNavigate();

  const traductionsJours: Record<string, string> = {
    Monday: 'Lundi',
    Tuesday: 'Mardi',
    Wednesday: 'Mercredi',
    Thursday: 'Jeudi',
    Friday: 'Vendredi',
    Saturday: 'Samedi',
    Sunday: 'Dimanche',
  };
  useEffect(() => {
    

    axios
      .get('http://192.168.1.64:5000/api/stats/daily-transactions')
      .then(res => {
        const donneesTraduites = res.data.map((item: { day: string; transactions: number }) => ({
          day: traductionsJours[item.day] || item.day,
          transactions: item.transactions,
        }));
        setDonneesTransactions(donneesTraduites);
      })
      .catch(err => {
        console.error('Erreur transactions jour :', err);
      });

    axios
      .get('http://192.168.1.64:5000/api/stats/transactions-by-type')
      .then(res => {
        setTransactionsParType(res.data);
      })
      .catch(err => {
        console.error('Erreur transactions par type :', err);
      });
  }, []);

  return (
    <div className="home-page">
      <Headerglobal />
      
      <main className="home-content">
        <h1 className="home-title">Bienvenue sur votre portail Ooredoo</h1>
        
        <div className="stats-container">
          <div className="stat-card">
            <h3>Consommation Data</h3>
            <p className="stat-value">4.2/10 Go</p>
            <div className="stat-progress">
              <div className="progress-bar" style={{ width: '42%', backgroundColor: '#E30613' }}></div>
            </div>
          </div>
          
          <div className="stat-card">
            <h3>Appels</h3>
            <p className="stat-value">120/200 min</p>
            <div className="stat-progress">
              <div className="progress-bar" style={{ width: '60%', backgroundColor: '#000000' }}></div>
            </div>
          </div>
          
          <div className="stat-card">
            <h3>SMS</h3>
            <p className="stat-value">50/100</p>
            <div className="stat-progress">
              <div className="progress-bar" style={{ width: '50%', backgroundColor: '#E30613' }}></div>
            </div>
          </div>
        </div>
        <div className="transactions-statistics">
        <div
          className="combined-transactions"
          style={{
            display: 'flex',
            gap: '50px',
            marginTop: 40,
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          <div style={{ flex: '1 1 400px', minWidth: 300, height: 300 }}>
            <h2>Transactions par jour</h2>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={donneesTransactions}
                  dataKey="transactions"
                  nameKey="day"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {donneesTransactions.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div style={{ flex: '1 1 400px', minWidth: 300, height: 300 }}>
            <h2>Transactions par type</h2>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={transactionsParType}
                  dataKey="transactions"
                  nameKey="type"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {transactionsParType.map((entry, index) => (
                    <Cell key={`cell-type-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>          </div> </div>
        <div className="promo-banner">
          <h2>Nouvelle offre exclusive!</h2>
          <p>Bénéficiez de +2Go supplémentaires avec notre nouvelle formule.</p>
          <button className="promo-button">Découvrir</button>
        </div>
      </main>
    </div>
  );
};

export default Home;









