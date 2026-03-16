import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function BackButton() {
  const navigate = useNavigate();

  return (
    <FaArrowLeft
      size={24}
      style={{ cursor: "pointer" }}
      onClick={() => navigate(-1)}
    />
  );
}

export default BackButton