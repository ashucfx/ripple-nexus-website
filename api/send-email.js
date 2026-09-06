import contactHandler from './contact.js';

export default async function handler(req, res) {
  return contactHandler(req, res);
}
