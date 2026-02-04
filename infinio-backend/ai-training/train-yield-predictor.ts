import * as tf from '@tensorflow/tfjs-node';

// Mock training data (replace with real Polygon API data via The Graph)
const xs = tf.tensor2d([[0.1, 0.2, 0.15, 0.3, 0.25], [0.05, 0.1, 0.08, 0.15, 0.12]]);  // Features: historical APYs
const ys = tf.tensor2d([[0.22], [0.13]]);  // Labels: predicted next APY

const model = tf.sequential();
model.add(tf.layers.dense({ units: 64, activation: 'relu', inputShape: [5] }));
model.add(tf.layers.dense({ units: 1, activation: 'linear' }));

model.compile({ optimizer: 'adam', loss: 'meanSquaredError' });

async function train() {
  await model.fit(xs, ys, { epochs: 100 });
  await model.save('file://../ai-models/yield-predictor-weights');  // Save weights separately
  console.log('Model trained and saved.');
}

train();