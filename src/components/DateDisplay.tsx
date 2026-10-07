"use client";

const DateDisplay = () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
    timeZone: "Asia/Dhaka",
  });

  return <>{date}</>;
};

export default DateDisplay;