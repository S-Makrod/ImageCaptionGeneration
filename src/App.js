import "./styles.css";
import { useState } from "react";
import { HfInference } from "@huggingface/inference";

export default function App() {
  // imageUrl holds the url entered in the input field
  const [imageUrl, setImageUrl] = useState(
    "https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp"
  );

  // TODO: Define a state to hold the image caption (similar to imageUrl above)
  const [caption, setCaption] = useState("");

  // TODO: Put huggingface API token here
  const HF_TOKEN = "KEY-HERE";

  async function getImageCaption() {
    // TODO: Get image caption from HuggingFace API
    // and set the image caption in state
    // https://huggingface.co/tasks/image-to-text
    try {
      const inference = new HfInference(HF_TOKEN);
      const res = await inference.imageToText({
        data: await (await fetch(imageUrl)).blob(),
        model: "Salesforce/blip-image-captioning-base",
      });
      setCaption(res.generated_text);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className="App">
      {console.log(imageUrl)}
      <h1>Image Captioning Tool</h1>
      <div className="image-container">
        <img src={imageUrl} />
      </div>
      <div>
        <h3>Caption: {caption}</h3>
        <input
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="Enter image URL here"
          type="text"
          name="imageUrl"
        />
        <div>
          <button onClick={getImageCaption}>Caption Image</button>
        </div>
      </div>
    </div>
  );
}
