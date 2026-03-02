import fs from 'fs/promises';
import path from 'path';

const MODELS_DIR = path.join(__dirname, '../../ai-models');

export async function loadModelRegistry() {
  const data = await fs.readFile(path.join(MODELS_DIR, 'models.json'), 'utf-8');
  return JSON.parse(data);
}

export async function getModelConfig(modelName: string) {
  const registry = await loadModelRegistry();
  return registry.models.find((m: any) => m.name === modelName);
}