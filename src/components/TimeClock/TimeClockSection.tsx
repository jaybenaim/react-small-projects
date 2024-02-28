"use client";

import { useState } from "react";
import TimeInput from "./TimeInput";
import moment from "moment";
import Progress from "./Progress";

const TIME_FORMAT = "h:mm A";

const TimeClockSection = () => {
  const [currentTime, setCurrentTime] = useState<string>("");

  return (
    <div className="flex justify-center flex-col">
      {currentTime && (
        <>
          <h2>
            Current Time:{" "}
            {moment()
              .set("hour", +currentTime.split(":")[0])
              .set("minute", +currentTime.split(":")[1])
              .format(TIME_FORMAT)}
          </h2>
          <Progress currentTime={currentTime} />
        </>
      )}

      <TimeInput setCurrentTime={setCurrentTime} />
    </div>
  );
};

export default TimeClockSection;
