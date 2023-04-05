import GuestLayout from "@/layouts/GuestLayout"
import styles from '@/styles/market.module.scss'
import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from "axios";
import { useEffect, useState } from "react"

const columns = [
  { field: 'commodity', headerName: 'Commodity', width: 200 },
  { field: 'unit', headerName: 'Unit', width: 130 },
  { field: 'minimum', headerName: 'Minimum', width: 130 },
  { field: 'maximum', headerName: 'Maximum', width: 130 },
  { field: 'average', headerName: 'Average', width: 130 },
];

const Market = () => {
  const [price, setPrice] = useState([]);

  useEffect(() => {
    getPrice();
  }, [])

  const getPrice = async () => {
    const marketPrice = await axios.get('http://localhost:3000/api/market');
    const formattedData = marketPrice.data.map((row, index) => ({
      id: index,
      commodity: row[0],
      unit: row[1],
      minimum: row[2],
      maximum: row[3],
      average: row[4]
    })).slice(1);
    setPrice(formattedData);
    console.log(formattedData)
  }

  const loading = {
    noRowsLabel: "Loading Latest Market Price ..... Please Wait"
  }

  return (
    <GuestLayout>
      <div className={styles.market}>
        <DataGrid
          rows={price}
          columns={columns}
          pageSize={30}
          rowsPerPageOptions={[30]}
          disableSelectionOnClick
          localeText={loading}
        />
      </div>
    </GuestLayout>
  )
}

export default Market