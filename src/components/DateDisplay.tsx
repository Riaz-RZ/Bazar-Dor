"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};
const getDate = () =>
  new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
    timeZone: "Asia/Dhaka",
  });
const getServerDate = () => "";

const DateDisplay = () => {
  const date = useSyncExternalStore(subscribe, getDate, getServerDate);

  return <>{date}</>;
};

export default DateDisplay;