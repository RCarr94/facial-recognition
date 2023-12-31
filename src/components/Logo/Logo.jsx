import Tilt from 'react-parallax-tilt';
import logoImg from './ai-logo.png';
import './Logo.css';

export default function Logo() {
  return (
    <div className="ma4 mt0">
      <Tilt className='Tilt br2 shadow-2' options={{ max : 50 }} style={{ height: 150, width: 150 }}>
        <div className='Tilt-inner pa2'><img style={{paddingTop: '5px'}} src={logoImg} alt="logo" /></div>
      </Tilt>
    </div>
  );
}
