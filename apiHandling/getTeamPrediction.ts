import * as tf from "@tensorflow/tfjs";
import { Tensor } from "@tensorflow/tfjs";
import { APIURL } from "./APIURL";

const getModelPredictionTeam = async (playerData: any) => {
  let totalpts = 0;

  for (let playerObj of playerData) {
    const player = playerObj[0];
    const modelData = playerObj[1];

    const playerDir = player.split(" ")[0] + player.split(" ")[1];
    //console.log(`${APIURL}/models/${playerDir}/model.json`);
    const fullPath = `${APIURL}/models/${playerDir}/model.json`;

    try {
      const model = await tf.loadLayersModel(fullPath);
      const modelDataTensor = tf.tensor(modelData);

      const prediction = model.predict(
        modelDataTensor.reshape([13, 1, 1]).reshape([1, 1, 13])
      );

      const predictionArr = (prediction as Tensor).arraySync()[0];

      console.log(player, predictionArr[0]);

      totalpts += predictionArr[0];
    } catch {
      continue;
    }
  }

  return Math.round(totalpts);
};

export default getModelPredictionTeam;
