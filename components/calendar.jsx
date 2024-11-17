"use client";
import Calendar from "react-calendar/dist/cjs/Calendar.js";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export default function CalendarComponent() {
    const [dates, setDates] = useState([]);
    const { data: session } = useSession();
    const [loading, setLoading] = useState(true);  
    const [error, setError] = useState(null);     
    useEffect(() => {
        const fetchSubmitted = async () => {
            if (!session) return;

            setLoading(true);  
            try {
                const res = await fetch(`/api/submitWorkout?userId=${session?.user.id}`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                });
                if (!res.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await res.json();
                setDates(data.dates);
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
        if (view === 'month') {
            const dateStr = date.toISOString().split('T')[0];
            return dates.includes(dateStr) ? 'highlight' : null;
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
        <h1>Your workout timeline</h1>
        <Calendar locale="en" tileClassName={tileClassName} />

        </>
    );
}
