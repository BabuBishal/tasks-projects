const ProgressBar = ({
  progress = 0,
  color = "bg-green-300",
}: {
  progress: number;
  color?: string;
}) => {
  return (
    <div className="w-full bg-border rounded-full h-2">
      <div
        className={`${color} h-2 rounded-full transition-all duration-300`}
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
