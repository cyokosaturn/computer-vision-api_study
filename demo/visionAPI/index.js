import C from '../config';
import speak from '../speak';

export default (imageData, contentType) => {

  const SUBSCRIPTION_KEY = localStorage.getItem('SUBSCRIPTION_KEY');

  contentType = contentType || 'application/json';

  const params = [
    'visualFeatures=Categories,Tags, Description, Faces, ImageType, Color, Adult',
    'details=Celebrities, Landmarks',
    'language=en'
  ].join('&');

  return fetch(C.VISION_API.URL + '?' + params, {
    method: 'POST',
    body: imageData,
    headers: {
      'Content-Type': contentType,
      'Ocp-Apim-Subscription-Key': SUBSCRIPTION_KEY
    }
  }).then(function(response) {
    return response.json();
  });
};

export function displayVisionApiResult(state){
  return (json) => {
    if (json && json.description && json.description.captions) {
      state.resultText = json.description.captions[0].text;
      speak(state.resultText);
    }
    state.resultJson = JSON.stringify(json, null, 2);
  };
}
