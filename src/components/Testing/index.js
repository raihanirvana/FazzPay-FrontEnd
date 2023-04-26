import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const data = {
  totalIncome: 2449919,
  totalExpense: 819881,
  listIncome: [
    {
      day: "Monday",
      total: 1603030,
    },
    {
      day: "Tuesday",
      total: 846889,
    },
    {
      day: "Wednesday",
      total: 0,
    },
    {
      day: "Thursday",
      total: 0,
    },
    {
      day: "Friday",
      total: 0,
    },
    {
      day: "Saturday",
      total: 0,
    },
    {
      day: "Sunday",
      total: 0,
    },
  ],
  listExpense: [
    {
      day: "Monday",
      total: 50000,
    },
    {
      day: "Tuesday",
      total: 769881,
    },
    {
      day: "Wednesday",
      total: 0,
    },
    {
      day: "Thursday",
      total: 0,
    },
    {
      day: "Friday",
      total: 0,
    },
    {
      day: "Saturday",
      total: 0,
    },
    {
      day: "Sunday",
      total: 0,
    },
  ],
};

const SimpleBarChart = () => {
  return (
    <BarChart width={400} height={200} data={data.listIncome}>
      <XAxis dataKey="day" tick={{ fontSize: 12 }} />
      <Tooltip />
      <Bar dataKey="total" fill="#8884d8" />
    </BarChart>
  );
};

export default SimpleBarChart;
