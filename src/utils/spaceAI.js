const API_KEY = process.env.REACT_APP_HUGGINGFACE_API_KEY;

const SPACE_LABELS = ['space exploration', 'astronomy', 'satellites', 'NASA', 'cosmos'];

export const isSpaceEvent = async (text) => {
  const response = await fetch("https://api-inference.huggingface.co/models/facebook/bart-large-mnli", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      inputs: text,
      parameters: {
        candidate_labels: SPACE_LABELS
      }
    })
  });

  const result = await response.json();
  return result?.labels?.[0] && result.scores[0] > 0.6;
};

export const summarizeEvent = async (text) => {
  const response = await fetch("https://api-inference.huggingface.co/models/facebook/bart-large-cnn", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ inputs: text })
  });

  const result = await response.json();
  return result?.[0]?.summary_text || text;
};
