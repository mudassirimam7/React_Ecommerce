import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import './style.css'

const BackButton = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1)
  };

  return (
    <button type="button" className="btn bg-red" onClick={goBack}>
      GoBack
    <span><FontAwesomeIcon icon={faArrowLeft} /></span>
    </button>
  );
};

export default BackButton;
