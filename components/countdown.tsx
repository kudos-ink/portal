"use client";

import { useEffect, useState } from "react";

interface Props {
  date: string;
}

const CountdownRenderer = (data: {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}) => {
  const { days, hours, minutes, seconds } = data;
  return (
    <div>
      <div className="grid auto-cols-max grid-flow-col gap-5 text-center">
        {days > 0 && (
          <div className="bg-neutral flex flex-col rounded-xl border border-[#ffffff4d] bg-transparent bg-card p-2 text-card-foreground shadow-sm">
            <span className="text-xl sm:text-5xl">
              <span>{`${days > 9 ? "" : "0"}${days}`}</span>
            </span>
            {`day${days > 1 ? "s" : ""}`}
          </div>
        )}
        {(days > 0 || hours > 0) && (
          <div className="bg-neutral flex flex-col rounded-xl border border-[#ffffff4d] bg-transparent bg-card p-2 text-card-foreground shadow-sm">
            <span className="text-xl sm:text-5xl">
              <span>{`${hours > 9 ? "" : "0"}${hours}`}</span>
            </span>
            {`hour${hours > 1 ? "s" : ""}`}
          </div>
        )}
        {(days > 0 || hours > 0 || minutes > 0) && (
          <div className="bg-neutral flex flex-col rounded-xl border border-[#ffffff4d] bg-transparent bg-card p-2 text-card-foreground shadow-sm">
            <span className="text-xl sm:text-5xl">
              <span>{`${minutes > 9 ? "" : "0"}${minutes}`}</span>
            </span>
            min
          </div>
        )}
        <div className="bg-neutral flex flex-col rounded-xl border border-[#ffffff4d] bg-transparent bg-card p-2 text-card-foreground shadow-sm">
          <span className="text-xl sm:text-5xl">
            <span>{`${seconds > 9 ? "" : "0"}${seconds}`}</span>
          </span>
          sec
        </div>
      </div>
    </div>
  );
};

const Countdown = (props: Props) => {
  const { date } = props;
  const [state, setState] = useState({
    seconds: 0,
    hours: 0,
    minutes: 0,
    days: 0,
    isItBday: false,
  });

  useEffect(() => {
    setInterval(() => {
      // Getitng Current Time
      const currentTime = new Date().getTime();
      // Getting Birthdays Time
      const ddateTime = new Date(date).getTime();

      // Time remaining for the Birthday
      const timeRemaining = ddateTime - currentTime;

      const countdown = () => {
        let seconds = Math.floor(timeRemaining / 1000);
        let minutes = Math.floor(seconds / 60);
        let hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        seconds %= 60;
        minutes %= 60;
        hours %= 24;

        // Setting States
        setState((prevState) => ({
          ...prevState,
          seconds,
          minutes,
          hours,
          days,
        }));
      };

      if (timeRemaining > 0) {
        countdown();
      }
    }, 1000);
  }, [date]);

  return (
    <div>
      {CountdownRenderer({
        days: state.days,
        hours: state.hours,
        minutes: state.minutes,
        seconds: state.seconds,
      })}
    </div>
  );
};

export default Countdown;
