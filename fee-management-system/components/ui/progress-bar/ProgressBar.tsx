const ProgressBar = ({ progress = 10 }: { progress: number }) => {
  return (
    <div className="relative min-w-20 w-full   h-1.5 bg-border text-muted z-10 rounded-sm ">
      <div
        className={`absolute left-0 top-0 h-1.5 bg-primary rounded-sm`}
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
