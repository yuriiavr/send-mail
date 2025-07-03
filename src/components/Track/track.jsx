import css from "./track.module.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { baseUrl } from "../api/api";

const Track = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);
  const [geoFilter, setGeoFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        baseUrl + "senderMails/stats"
      );

      const sortedData = [...response.data].sort((a, b) => {
        const [dayA, monthA, yearA] = a.createdAt.split(" ")[0].split(".");
        const [dayB, monthB, yearB] = b.createdAt.split(" ")[0].split(".");

        const timeA = a.createdAt.split(" ")[1];
        const timeB = b.createdAt.split(" ")[1];

        const dateA = new Date(`20${yearA}-${monthA}-${dayA}T${timeA}`);
        const dateB = new Date(`20${yearB}-${monthB}-${dayB}T${timeB}`);

        return dateB - dateA; // новіші зверху
      });

      setData(sortedData);
      setFilteredData(sortedData);
      setCurrentPage(1);
    } catch (error) {
      console.error("Помилка отримання даних: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    let result = [...data];

    if (geoFilter) {
      result = result.filter((item) => item.geo === geoFilter);
    }

    if (startDate || endDate) {
      result = result.filter((item) => {
        const [day, month, year] = item.createdAt.split(" ")[0].split(".");
        const time = item.createdAt.split(" ")[1];
        const itemDate = new Date(`20${year}-${month}-${day}T${time}`);

        const fromDate = startDate ? new Date(startDate) : null;
        const toDate = endDate ? new Date(endDate + "T23:59:59") : null;

        if (fromDate && itemDate < fromDate) return false;
        if (toDate && itemDate > toDate) return false;

        return true;
      });
    }

    setFilteredData(result);
    setCurrentPage(1);
  }, [geoFilter, startDate, endDate, data]);

  // Пагінація
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const uniqueGeos = [...new Set(data.map((item) => item.geo))];

  return (
    <div className={css.tableContainer}>
     
      <div className={css.controlsCont}>
        <div className={css.controls}>
          <label>
            <select
              className={css.option}
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
            >
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </label>
          <label>
            <select
              value={geoFilter}
              className={css.option}
              onChange={(e) => setGeoFilter(e.target.value)}
            >
              <option value="">Geo</option>
              {uniqueGeos.map((geo, idx) => (
                <option key={idx} value={geo}>
                  {geo}
                </option>
              ))}
            </select>
          </label>
          <label>
            <input
              type="date"
              value={startDate}
              className={css.option}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </label>
          <label>
            to
            <input
              style={{ margin: "0 0 0 20px" }}
              type="date"
              value={endDate}
              className={css.option}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </label>
          <button
            onClick={() => {
              setGeoFilter("");
              setStartDate("");
              setEndDate("");
              setFilteredData(data);
              setCurrentPage(1);
            }}
            className={css.resetButton}
          >
            x
          </button>
        </div>

        <button onClick={fetchData} className={css.refreshButton}>
          🔄 Update
        </button>
      </div>

      {loading ? (
        <div className={css.loader}>Loading...</div>
      ) : (
        <>
          <table className={css.dataTable}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Campaign Name</th>
                <th>Posted</th>
                <th>Delivered</th>
                <th>Open</th>
                <th>Open rate</th>
                <th>Geo</th>
                <th>Date</th>
                <th>Subj</th>
                <th>Text</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.campaignName}</td>
                  <td>{item.posted}</td>
                  <td>{item.deliveredCount}</td>
                  <td>{item.count}</td>
                  <td>
                    {item.deliveredCount > 0
                      ? ((item.count / item.deliveredCount) * 100).toFixed(1) +
                        "%"
                      : "0%"}
                  </td>

                  <td>{item.geo}</td>
                  <td>{item.createdAt}</td>
                  <td>{item.tempSubject}</td>
                  <td>{item.previewText}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className={css.pagination}>
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
            >
              Prev
            </button>
            <span>
              {currentPage}/{totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Track;
