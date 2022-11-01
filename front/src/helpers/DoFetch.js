export const doFetch = async (url, body, method) => {
  const res = await fetch(url, {
    method: method,
    mode: "cors",
    credentials: "same-origin",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
  const data = await res.json();
  return data;
};
