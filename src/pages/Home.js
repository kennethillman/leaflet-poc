

import { useNavigate } from 'react-router-dom';


import imageSpeechBubble from "../assets/images/speechBubble.png";
import image1233 from "../assets/images/1233.png";
import imageMapPin from "../assets/images/mapPin.png";


const Home = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/map');
  };


  return (
    <div className='wrapper'>
     <div className='btn' onClick={() => handleClick('MyLocation')}>To Map</div>

    </div>
  );
};

export default Home;