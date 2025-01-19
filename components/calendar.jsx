"use client";
import Calendar from "react-calendar/dist/cjs/Calendar.js";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export default function CalendarComponent() {
  const [dates, setDates] = useState([]);
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [names, setNames] = useState([]);

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

  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      const dateStr = new Date(
        date.getTime() - date.getTimezoneOffset() * 60000
      )
        .toISOString()
        .split("T")[0];
      return dates.includes(dateStr) ? "highlight" : null;
    }
  };

  const tileContent = ({ date, view }) => {
    if (view === "month") {
      const dateStr = new Date(
        date.getTime() - date.getTimezoneOffset() * 60000
      )
        .toISOString()
        .split("T")[0];
      const idx = dates.indexOf(dateStr);
      if (idx > -1) {
        const name = names[idx];
        return (
          <div className="text-center text-xs font-semibold text-white bg-green-500 rounded-full w-6 h-6 flex items-center justify-center mx-auto">
            {name.slice(0, 2)}..
          </div>
        );
      }
    }
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

  return (
    <>
      <h1 className="text-center mb-5 bg-gradient-to-r from-blue-600 to-blue-800 p-3 text-white rounded shadow-lg">
        Your workout timeline
      </h1>
      <div className="react-calendar-wrapper bg-gradient-to-b from-gray-900 to-black p-4 rounded-xl">
        <Calendar
          locale="en"
          tileClassName={tileClassName}
          tileContent={tileContent}
          className="react-calendar rounded-xl shadow-md  bg-gradient-to-b from-gray-900 to-black text-white"
        />
      </div>
    </>
  );
}
