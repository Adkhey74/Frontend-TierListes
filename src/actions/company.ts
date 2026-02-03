"use server"

export const addCompany = async (name: string) => {
  
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/logos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data
};