import { useState, Component } from 'react';
import './App.css';
import ParticlesBg from 'particles-bg';
// Components
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FacialRecognition from './components/FacialRecognition/FacialRecognition';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';

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
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false
    }
  }

  // function onInputChange(evt) {
  //   console.log(evt);
  // }

  calculateFaceLocation = (data) => {
   const clarifaiFace =  data.outputs[0].data.regions[0].region_info.bounding_box;
   const image = document.getElementById('inputimage');
   const width = Number(image.width);
   const height = Number(image.height);
   console.log(width, height);
   return {
    leftCol: clarifaiFace.left_col * width,
    topRow: clarifaiFace.top_row * height,
    rightCol: width - (clarifaiFace.right_col * width),
    bottomRow: height - (clarifaiFace.bottom_row * height)
   }
  }

  displayFaceBox = (box) => {
    this.setState({box: box});
  }

  onInputChange = (evt) => {
    this.setState({input: evt.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});


    // app.models.predict('face-detection', this.state.input)
    fetch('https://api.clarifai.com/v2/models/' + 'face-detection' + '/outputs', returnClarifaiRequestOptions(this.state.input))
    .then(response => response.json())
    .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
    .catch(err => console.log(err));
  }

  // async function onButtonSubmit() {
  //   const { imageUrl } = input;

  //   const res = await fetch('https://api.clarifai.com/v2/models/' + 'face-detection' + '/outputs', returnClarifaiRequestOptions(input))
  //   const data = await res.json();
  //   console.log(data);
    
  // }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({isSignedIn: false})
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

  render() {
    const { isSignedIn, imageUrl, route, box} = this.state;
    return (
    <div className="App">
      <ParticlesBg type="cobweb" bg={true} />
      <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn}/>
      { route === 'home' ?
        <>
        <Logo />
        <Rank />
        <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
        <FacialRecognition box={box} imageUrl={imageUrl}/>
        </>
        : (
          route === 'signin' ?
            <SignIn onRouteChange={this.onRouteChange} />
            :
            <Register onRouteChange={this.onRouteChange} />
        )
      }
    </div>
  );
}
}

export default App;