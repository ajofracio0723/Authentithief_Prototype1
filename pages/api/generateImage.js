// pages/api/generateDynamicImage.js

import { NextApiRequest, NextApiResponse } from 'next';
import { generateDynamicImage } from '../../utils/imageUtils'; 

export default async function handler(req, res) {
  try {
    const imageData = await generateDynamicImage(req.query);
    res.setHeader('Content-Type', 'image/jpeg');
    res.send(imageData);
  } catch (error) {
    console.error('Error generating dynamic image:', error);
    res.status(500).end();
  }
}
