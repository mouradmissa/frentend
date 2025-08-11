import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../assets/css/Home_admin.css';
import { useNavigate } from 'react-router-dom';
import Headerglobal_admin from './headerglobal_admin';
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

const Home_admin: React.FC = () => {
  const [donneesActivite, setDonneesActivite] = useState<{ day: string; actions: number }[]>([]);
  const [donneesTransactions, setDonneesTransactions] = useState<{ day: string; transactions: number }[]>([]);
  const [transactionsParType, setTransactionsParType] = useState<{ type: string; transactions: number }[]>([]);

  const COLORS = ['#E30613', '#FF9A40', '#FFC107', '#FF7043', '#FF5722', '#00C49F', '#0088FE'];

  const traductionsJours: Record<string, string> = {
    Monday: 'Lundi',
    Tuesday: 'Mardi',
    Wednesday: 'Mercredi',
    Thursday: 'Jeudi',
    Friday: 'Vendredi',
    Saturday: 'Samedi',
    Sunday: 'Dimanche',
  };

  const navigate = useNavigate();

  const handleBarClick = (jour: string) => {
    navigate(`/actions-du-jour/${jour}`);
  };

  useEffect(() => {
    axios
      .get('http://192.168.1.64:5000/api/stats/daily-activity')
      .then(res => {
        const donneesTraduites = res.data.map((item: { day: string; actions: number }) => ({
          day: traductionsJours[item.day] || item.day,
          actions: item.actions,
        }));
        setDonneesActivite(donneesTraduites);
      })
      .catch(err => {
        console.error('Erreur activité :', err);
      });

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
      <Headerglobal_admin />

      <main className="home-content">
        <h1 className="home-title">Bienvenue sur votre portail Ooredoo</h1>

        <div className="stats-container">{/* autres stats ici */}</div>

        <div className="activity-statistics">
          <h2>Activité par jour</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={donneesActivite} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar
                dataKey="actions"
                fill="#E30613"
                onClick={(_, index) => {
                  const jour = donneesActivite[index]?.day;
                  if (jour) handleBarClick(jour);
                }}
              />
            </BarChart>
          </ResponsiveContainer>
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
          </div>          </div>

        </div>
      </main>
    </div>
  );
};

export default Home_admin;









