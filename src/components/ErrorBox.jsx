

const ErrorBox = ({ error }) => {
  return (
    <div className="text-center">
      <span className="text-danger">{error}</span>
    </div>
  );
};

export default ErrorBox;