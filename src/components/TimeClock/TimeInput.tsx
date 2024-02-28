import { FC } from "react";

interface IProps {
  setCurrentTime: (datetime: string) => void;
}

const TimeInput: FC<IProps> = ({ setCurrentTime }) => {
  return (
    <div className="flex justify-center flex-col">
      <label htmlFor="time">Enter a time</label>
      <input
        type="time"
        id="time"
        onChange={({ target: { value } }) => setCurrentTime(value)}
      />
    </div>
  );
};

export default TimeInput;
