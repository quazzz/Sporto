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
          <div title={name}>
            <span title={name}></span>
          </div>
        );
      }
    }
  };

  if (loading) {
    return <div className="loader w-50 h-50"></div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <h1 className="text-center mb-5 bg-white p-3 shadow-lg rounded">
        Your workout timeline
      </h1>
      <Calendar
        locale="en"
        tileClassName={tileClassName}
        tileContent={tileContent}
      />
    </>
  );
}
