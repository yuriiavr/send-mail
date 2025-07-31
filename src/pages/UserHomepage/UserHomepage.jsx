import React, { useEffect, useState, useCallback } from 'react';
import Container from "../../components/Container/Container";
import fetchWithFallback from "../../components/api/fetchWithFallback";
import SmtpItem from "../../components/SmtpItem/SmtpItem";
import styles from './UserHomepage.module.css';

const UserHomepage = () => {
  const [smtpStatuses, setSmtpStatuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStatuses = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchWithFallback("GET", "smtp/smtp-statuses");
      setSmtpStatuses(response.data);
    } catch (err) {
      console.error("Failed to fetch SMTP statuses:", err);
      setError("Failed to load SMTP statuses. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStatuses();
  }, [fetchStatuses]);

  const handleUpdateSmtp = () => {
    fetchStatuses();
  };

  if (loading) return <p className={styles.statusMessage}>Loading SMTP statuses...</p>;
  if (error) return <p className={`${styles.statusMessage} ${styles.error}`}>{error}</p>;
  if (smtpStatuses.length === 0) return <p className={styles.statusMessage}>No SMTP statuses found.</p>;

  return (
    <Container>
      <div className={styles.dashboardWrapper}>
        <div className={styles.titleCont}>
            <h1 className={styles.title}>SMTP Status Dashboard</h1>
            <button
              onClick={fetchStatuses}
              className={styles.refreshButton}
            >
              Refresh Statuses
            </button>
        </div>
        {smtpStatuses.map((smtp) => (
          <SmtpItem key={smtp._id} smtp={smtp} onUpdate={handleUpdateSmtp} />
        ))}
      </div>
    </Container>
  );
};

export default UserHomepage;