const Spinner = () => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex flex-col items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="w-12 h-12 border-4 border-t-4 border-t-orange border-gray-200 rounded-full animate-spin" />
    </div>
  );
};

export default Spinner;
