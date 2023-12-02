import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const Analytics = () => {
  const data = [
    {
      date: 0,
      totalOrders: 10,
      guestsServed: 50, 
      averageSpending: 25,
    },
  ];

  return (
    <LineChart width={600} height={300} data={data} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="totalOrders" stroke="#8884d8" />
      <Line type="monotone" dataKey="guestsServed" stroke="#82ca9d" />
      <Line type="monotone" dataKey="averageSpending" stroke="#ffc658" />
    </LineChart>
  );
};

export default Analytics;
