const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// Server Fetch
export const serverFetch = async (path) => {
  const res = await fetch(`${baseUrl}${path}`);
  return res.json()
};

// Server Mutation
export const serverMutation = async (path, data, method = "POST") => {
  const options = {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
  }

  if (data !== null && data !== undefined) {
    options.body = JSON.stringify(data);
  }
  
  const res = await fetch(`${baseUrl}${path}`, options);
  console.log('response data - ',res)
  
  return res.json();
};






