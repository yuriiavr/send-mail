import React, { useEffect, useState, useCallback } from "react";
import css from "../Track/track.module.css";
import Loader from "../../components/Loader/Loader";
import { apiClient } from "../api/url";

const GeoStats = () => {
  const [geoData, setGeoData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const fetchGeoStats = useCallback(async () => {
    try {
      setLoading(true);
      const response = await apiClient.get("senderMails/stats");
      setAllData(response.data);
    } catch (error) {
      console.error("Помилка отримання статистики по гео:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGeoStats();
  }, [fetchGeoStats]);

  useEffect(() => {
    const aggregated = {};

    const filtered = allData.filter((item) => {
      if (!item.geo) return false;

      const [day, month, year] = item.createdAt.split(" ")[0].split(".");
      const time = item.createdAt.split(" ")[1];
      const itemDate = new Date(`20${year}-${month}-${day}T${time}`);

      const from = startDate ? new Date(startDate) : null;
      const to = endDate ? new Date(endDate + "T23:59:59") : null;

      if (from && itemDate < from) return false;
      if (to && itemDate > to) return false;

      return true;
    });

    filtered.forEach((item) => {
      const geo = item.geo;
      if (!aggregated[geo]) {
        aggregated[geo] = {
          geo,
          posted: 0,
          delivered: 0,
          open: 0,
        };
      }

      aggregated[geo].posted += Number(item.posted) || 0;
      aggregated[geo].delivered += Number(item.deliveredCount) || 0;
      aggregated[geo].open += Number(item.count) || 0;
    });

    const result = Object.values(aggregated).map((item) => ({
      ...item,
      openRate:
        item.delivered > 0
          ? ((item.open / item.delivered) * 100).toFixed(1) + "%"
          : "0%",
    }));

    setGeoData(result);
  }, [allData, startDate, endDate]);

  return (
    <div className={css.tableContainer}>
      <div className={css.controlsCont}>
        <div className={css.controls}>
            <label>
              <input
                type="date"
                className={css.option}
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </label>
            <label>
              to
              <input
                type="date"
                className={css.option}
                value={endDate}
                style={{ marginLeft: "20px" }}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </label>
            <button
              onClick={() => {
                setStartDate("");
                setEndDate("");
              }}
              className={css.resetButton}
              style={{ marginLeft: "10px" }}
            >
              x
            </button>
        </div>

        <button
          onClick={fetchGeoStats}
          className={css.refreshButton}
          style={{ marginLeft: "20px" }}
        >
          🔄 Update
        </button>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <table className={css.dataTable}>
          <thead>
            <tr>
              <th>Geo</th>
              <th>Posted</th>
              <th>Delivered</th>
              <th>Open</th>
              <th>Open Rate %</th>
            </tr>
          </thead>
          <tbody>
            {geoData.map((item, index) => (
              <tr key={index}>
                <td>{item.geo}</td>
                <td>{item.posted}</td>
                <td>{item.delivered}</td>
                <td>{item.open}</td>
                <td>{item.openRate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default GeoStats;