

export default function FacialRecognition({ imageUrl }) {
  return (
    <div className="center ma">
      <div className="absolute mt2">
        <img src={imageUrl} alt="img example" width='500px' height='auto'/>
      </div>
    </div>
  )
}