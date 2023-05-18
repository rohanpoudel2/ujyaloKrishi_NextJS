import GuestLayout from "@/layouts/GuestLayout";
import styles from "@/styles/market.module.scss";
import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useState, useEffect } from "react";
import { withAuth } from "@/lib/withAuth";

const columns = [
  { field: "commodity", headerName: "Commodity", width: 200 },
  { field: "unit", headerName: "Unit", width: 130 },
  { field: "minimum", headerName: "Minimum", width: 130 },
  { field: "maximum", headerName: "Maximum", width: 130 },
  { field: "average", headerName: "Average", width: 130 },
];

const Market = () => {
  const [price, setPrice] = useState([]);

  const [mode, setMode] = useState();

  useEffect(() => {
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (event) => {
        const colorScheme = event.matches ? "dark" : "light";
        console.log(colorScheme);
        setMode(colorScheme);
      });
  }, []);

  const getPrice = async () => {
    const cachedData = localStorage.getItem("marketData");
    const isFresh =
      cachedData &&
      JSON.parse(cachedData).timestamp + 3 * 60 * 60 * 1000 > Date.now();

    if (isFresh) {
      console.log("Serving from cache...");
      setPrice(JSON.parse(cachedData).data);
    } else {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/market"
        );
        const formattedData = response.data.map((row, index) => ({
          id: index,
          commodity: row[0],
          unit: row[1],
          minimum: row[2],
          maximum: row[3],
          average: row[4],
        })).slice(1);
        setPrice(formattedData);
        console.log(formattedData);

        localStorage.setItem(
          "marketData",
          JSON.stringify({ data: formattedData, timestamp: Date.now() })
        );
      } catch (error) {
        console.error("Error fetching market data:", error);
      }
    }
  };

  useEffect(() => {
    getPrice();
  }, []);

  const loading = {
    noRowsLabel: "Loading Latest Market Price ..... Please Wait",
  };

  return (
    <>
      <GuestLayout>
        <div className={styles.market}>
          <DataGrid
            rows={price}
            columns={columns}
            pageSize={30}
            rowsPerPageOptions={[30]}
            disableSelectionOnClick
            localeText={loading}
            sx={
              mode === "dark"
                ? {
                  color: "white",
                }
                : { color: "inherit" }
            }
          />
        </div>
      </GuestLayout>
    </>
  );
};

export default withAuth(Market);
