export async function GET(req, res) {
    // preparing for fetch, adding options and url
    const url = 'https://exercisedb.p.rapidapi.com/exercises?limit=100&offset=0';
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': process.env.RAPIDAPI_KEY, 
        'x-rapidapi-host': 'exercisedb.p.rapidapi.com',
      },
    };
    try {
      // fetching exercisesDB API
      const response = await fetch(url, options);
      // getting json from response
      const data = await response.json();
      // returning that json to client-side
      return new Response(JSON.stringify(data), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      // if error occures then we console it
      console.log(error)
    }
  }
  