export async function GET(req, res) {
    const url = 'https://exercisedb.p.rapidapi.com/exercises?limit=100&offset=0';
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': process.env.RAPIDAPI_KEY, 
        'x-rapidapi-host': 'exercisedb.p.rapidapi.com',
      },
    };
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      return new Response(JSON.stringify(data), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      console.log(error)
    }
  }
  