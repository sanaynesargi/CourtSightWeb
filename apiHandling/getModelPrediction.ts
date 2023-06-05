import * as tf from "@tensorflow/tfjs";
import { APIURL } from "./APIURL";

const getModelPrediction = async (player: string, modelData: Array<number>) => {
  const playerDir = player.split(" ")[0] + player.split(" ")[1];

  //console.log(`${APIURL}/models/${playerDir}/model.json`);
  const fullPath = `${APIURL}/models/${playerDir}/model.json`;

  try {
    const model = await tf.loadLayersModel(fullPath);
    const modelDataTensor = tf.tensor(modelData);

    return model.predict(
      modelDataTensor.reshape([13, 1, 1]).reshape([1, 1, 13])
    );
  } catch {
    return null;
  }
};

export default getModelPrediction;
