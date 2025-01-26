"use client";
import { Line, Bar } from "react-chartjs-2";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function WorkoutChart() {
  const { data: session } = useSession();
  const [dates, setDates] = useState([]);
  const [names, setNames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSubmitted = async () => {
      if (!session) return;

      setLoading(true);
      try {
        const res = await fetch(
          `/api/submitWorkout?userId=${session?.user.id}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await res.json();
        setDates(data.dates);
        setNames(data.names);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchSubmitted();
  }, [session]);

  const groupWorkoutsByDate = () => {
    const grouped = {};

    dates.forEach((date, idx) => {
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(names[idx]);
    });

    return grouped;
  };

  const formatWorkoutCountData = () => {
    const grouped = groupWorkoutsByDate();

    const chartLabels = Object.keys(grouped);
    const chartData = chartLabels.map((date) => ({
      x: date,
      y: grouped[date].length,
    }));

    return {
      labels: chartLabels,
      datasets: [
        {
          label: "Workout Count",
          data: chartData,
          borderColor: "rgba(75,192,192,1)",
          backgroundColor: "rgba(75,192,192,0.2)",
          fill: true,
        },
      ],
    };
  };

  const formatWorkoutNamesData = () => {
    const grouped = groupWorkoutsByDate();

    const chartLabels = Object.keys(grouped);
    const chartData = chartLabels.map((date) => grouped[date].length);

    return {
      labels: chartLabels,
      datasets: [
        {
          label: "Workouts Per Date",
          data: chartData,
          backgroundColor: "rgba(153,102,255,0.6)",
          borderColor: "rgba(153,102,255,1)",
          borderWidth: 1,
          tooltip: {
            callbacks: {
              label: (tooltipItem) => grouped[tooltipItem.label].join(", "),
            },
          },
        },
      ],
    };
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="loader border-4 border-t-4 border-gray-500 rounded-full w-12 h-12 animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        <p>Error: {error}</p>
      </div>
    );
  }

  const workoutCountData = formatWorkoutCountData();
  const workoutNamesData = formatWorkoutNamesData();

  return (
    <>
      <h1 className="text-center mb-5 bg-gradient-to-r from-blue-600 to-blue-800 p-3 text-white rounded shadow-lg">
        Your Workout Timeline
      </h1>

      <div className="chart-wrapper bg-gradient-to-b from-gray-900 to-black p-4 rounded-xl mb-6">
        <h2 className="text-center text-white mb-4">Workout Count</h2>
        <Line data={workoutCountData} options={{ responsive: true }} />
      </div>

      <div className="chart-wrapper bg-gradient-to-b from-gray-900 to-black p-4 rounded-xl">
        <h2 className="text-center text-white mb-4">Workout Names</h2>
        <Bar data={workoutNamesData} options={{ responsive: true }} />
      </div>
    </>
  );
}
