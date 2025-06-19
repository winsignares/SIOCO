
import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBillWave, faUserMd, faCalendarAlt } from "@fortawesome/free-solid-svg-icons";

import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";

// Registrar elementos necesarios de Chart.js
ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

export const Ingresos = () => {
  // Datos simulados
  const earningsData = {
    2023: [
      { month: "Enero", total: 5000 },
      { month: "Febrero", total: 4500 },
      { month: "Marzo", total: 5200 },
      { month: "Abril", total: 4800 },
      { month: "Mayo", total: 5300 },
      { month: "Junio", total: 4900 },
    ],
    2024: [
      { month: "Enero", total: 6000 },
      { month: "Febrero", total: 6200 },
      { month: "Marzo", total: 5800 },
      { month: "Abril", total: 5900 },
      { month: "Mayo", total: 5700 },
      { month: "Junio", total: 6500 },
    ],
  };

  const doctorsData = {
    2023: [
      { name: "Dr. Juan Pérez", total: 12000 },
      { name: "Dra. María Gómez", total: 15000 },
      { name: "Dr. Carlos López", total: 11000 },
    ],
    2024: [
      { name: "Dr. Juan Pérez", total: 14000 },
      { name: "Dra. María Gómez", total: 16000 },
      { name: "Dr. Carlos López", total: 12000 },
    ],
  };

  // Estados
  const [selectedYear, setSelectedYear] = useState(2023);
  const [selectedMonth, setSelectedMonth] = useState("");

  // Datos dinámicos
  const monthlyEarnings = earningsData[selectedYear];
  const earningsByDoctor = doctorsData[selectedYear];
  const filteredMonthData = selectedMonth
    ? monthlyEarnings.find((data) => data.month === selectedMonth)
    : null;

  const totalEarnings = monthlyEarnings.reduce((acc, curr) => acc + curr.total, 0);

  // Datos para el gráfico
  const chartData = {
    labels: monthlyEarnings.map((data) => data.month),
    datasets: [
      {
        label: "Ingresos Mensuales",
        data: monthlyEarnings.map((data) => data.total),
        backgroundColor: "rgba(75, 192, 192, 0.6)", // Verde agua
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      }
      // {
      //   label: "Ingresos por Doctor",
      //   data: earningsByDoctor.map((data) => data.total),
      //   backgroundColor: "rgba(255, 99, 132, 0.6)", // Rojo
      //   borderColor: "rgba(255, 99, 132, 1)",
      //   borderWidth: 1,
      // }
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => `$${value.toLocaleString()}`,
        },
      },
    },
  };

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg mt-3">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Panel de Ingresos</h1>

      {/* Selectores de Año y Mes */}
      <div className="mb-6 flex flex-col md:flex-row gap-4 items-center">


        <div className="mb-1">
          <label htmlFor="year-select" className="block text-gray-700 font-medium mb-2">
            Selecciona el Año
          </label>
          <select
            id="year-select"
            value={selectedYear}
            onChange={(e) => {
              setSelectedYear(Number(e.target.value));
              setSelectedMonth("");
            }}
            className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-lg"
          >
            <option value={2023}>2023</option>
            <option value={2024}>2024</option>
          </select>
        </div>


        {/* <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg"
          disabled={!selectedYear}
        >
          <option value="">Todos los Meses</option>
          {monthlyEarnings.map((data, index) => (
            <option key={index} value={data.month}>
              {data.month}
            </option>
          ))}
        </select>
         */}
      </div>

      {/* Resumen General */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="p-4 bg-blue-100 rounded-lg shadow-md flex items-center">
          <FontAwesomeIcon icon={faMoneyBillWave} size="2x" className="text-blue-500" />
          <div className="ml-4">
            <h2 className="text-lg font-semibold">Total Ganado</h2>
            <p className="text-xl font-bold text-gray-700">
              $
              {filteredMonthData
                ? filteredMonthData.total.toLocaleString()
                : totalEarnings.toLocaleString()}
            </p>
          </div>
        </div>

        <div className="p-4 bg-green-100 rounded-lg shadow-md flex items-center">
          <FontAwesomeIcon icon={faCalendarAlt} size="2x" className="text-green-500" />
          <div className="ml-4">
            <h2 className="text-lg font-semibold">Mes con Más Ingresos</h2>
            <p className="text-xl font-bold text-gray-700">
              {selectedMonth || monthlyEarnings.reduce((max, curr) => (curr.total > max.total ? curr : max), monthlyEarnings[0]).month}
            </p>
          </div>
        </div>

        <div className="p-4 bg-purple-100 rounded-lg shadow-md flex items-center">
          <FontAwesomeIcon icon={faUserMd} size="2x" className="text-purple-500" />
          <div className="ml-4">
            <h2 className="text-lg font-semibold">Doctor Más Productivo</h2>
            <p className="text-xl font-bold text-gray-700">
              {earningsByDoctor.reduce((max, curr) => (curr.total > max.total ? curr : max), earningsByDoctor[0]).name}
            </p>
          </div>
        </div>
      </div>

      {/* Gráfico de Ingresos Mensuales */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Ingresos Mensuales</h2>
        <div className="h-96">
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};
