const Status = ({ text, icon: Icon, bg, color }) => {
  return (
    <div className={`${bg} ${color} flex items-center gap-2 px-2 py-1 font-medium rounded`}>
      {text} <Icon size={15} />
    </div>
  );
};


export default Status;