import { Request, Response } from 'express';
import { config } from '../config';

export const compileNaturalLanguage = async (req: Request, res: Response) => {
  try {
    const { prompt } = req.body;

    if (!prompt || typeof prompt !== 'string') {
      return res.status(400).json({ error: 'Valid prompt required' });
    }

    const lower = prompt.toLowerCase();
    const steps: string[] = [];

    // Simple rule-based parser (expand later)
    if (lower.includes('buy') || lower.includes('purchase')) steps.push('Buy Token');
    if (lower.includes('sell')) steps.push('Sell Token');
    if (lower.includes('stake') || lower.includes('farm')) steps.push('Stake');
    if (lower.includes('rwa') || lower.includes('bond') || lower.includes('treasury')) steps.push('Invest in RWA Bond');
    if (lower.includes('optimize') || lower.includes('agent')) steps.push('AI Agent Optimize');

    // Future: Chainlink Functions integration here

    res.json({
      steps,
      metadata: {
        source: 'natural-language',
        originalPrompt: prompt,
        compiledAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('NL compile error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};