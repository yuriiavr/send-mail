import css from "./track.module.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../api/api";

const Track = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseUrl}` + "senderMails/getdata");
        setData(response.data.data);
      } catch (error) {
        console.error("Помилка отримання даних: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={css.tableContainer}>
        <table className={css.dataTable}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Campaign Name</th>
              <th>Posted</th>
              <th>Delivered</th>
              <th>Open</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.campaignName}</td>
                <td>{item.posted}</td>
                <td>{item.deliveredCount}</td>
                <td>0</td>
              </tr>
            ))}
          </tbody>
        </table>
    </div>
  );
};

export default Track;
