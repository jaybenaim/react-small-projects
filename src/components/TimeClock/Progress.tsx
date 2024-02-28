import { FC } from "react";

interface IProps {
  currentTime: string;
}

const MAX_PROGRESS = 1440;

const Progress: FC<IProps> = ({ currentTime }) => {
  const progressValue = () => {
    const splitTime = currentTime.split(":");
    const hours = +splitTime[0];
    const minutes = +splitTime[1];

    const totalMinutes = hours * 60 + minutes;

    return totalMinutes;
  };

  return (
    <div>
      <progress max={MAX_PROGRESS} value={progressValue()} />{" "}
      {((progressValue() / MAX_PROGRESS) * 100).toFixed(2)}% of the day
      completed
    </div>
  );
};

export default Progress;
