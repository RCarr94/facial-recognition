import { useState, Component } from 'react';
import './App.css';
import ParticlesBg from 'particles-bg';
// Components
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FacialRecognition from './components/FacialRecognition/FacialRecognition';

const returnClarifaiRequestOptions = (imageUrl) => {
  // Your PAT (Personal Access Token) can be found in the portal under Authentification
  const PAT = 'acc4aa909106499898274556d6e65e32';
  // Specify the correct user_id/app_id pairings
  // Since you're making inferences outside your app's scope
  const USER_ID = 'e6w87g7iwoic';
  const APP_ID = 'facial-recognition-app';
  // Change these to whatever model and image URL you want to use
  const MODEL_ID = 'face-detection';
  const IMAGE_URL = imageUrl;

  const raw = JSON.stringify({
    user_app_id: {
      user_id: USER_ID,
      app_id: APP_ID,
    },
    inputs: [
      {
        data: {
          image: {
            url: IMAGE_URL,
          },
        },
      },
    ],
  });
  const requestOptions = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: 'Key ' + PAT,
    },
    body: raw,
  };

  return requestOptions;
}

class App extends Component {
// export default function App() {
  // const [input, setInput] = useState({
  //   input: '',
  //   imageUrl: '',
  // });

  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: ''
    }
  }

  // function onInputChange(evt) {
  //   console.log(evt);
  // }

  onInputChange = (evt) => {
    this.setState({input: evt.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});


    // app.models.predict('face-detection', this.state.input)
    fetch('https://api.clarifai.com/v2/models/' + 'face-detection' + '/outputs', returnClarifaiRequestOptions(this.state.input))
    .then(response => response.json())
    .then(
      function (response) {
        console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
      },
      function (err) {}
    );
  }

  // async function onButtonSubmit() {
  //   const { imageUrl } = input;

  //   const res = await fetch('https://api.clarifai.com/v2/models/' + 'face-detection' + '/outputs', returnClarifaiRequestOptions(input))
  //   const data = await res.json();
  //   console.log(data);
    
  // }

  render() {
  return (
    <div className="App">
      <ParticlesBg type="cobweb" bg={true} />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
      <FacialRecognition imageUrl={this.state.imageUrl}/>
    </div>
  );
}
}

export default App;