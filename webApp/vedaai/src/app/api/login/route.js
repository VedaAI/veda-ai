import pool from "../../../../utlis/pgdb";

async function getData(username, password) {
  const { rows } = await pool.query("SELECT * FROM userData WHERE UID = $1 and password = $2",[username,password]);
  
  
  return rows;
}

// Named export for POST request handler
export async function POST(req) {
  try {
    const body = await req.json(); // Parse the request body
    const { username, password } = body;

  

    const rows = await getData(username, password);
   

    if (rows.length > 0) {
      return new Response(
        JSON.stringify({
          message: "user",
          data: rows,
        }),
        { status: 200 }
      );
    }

    return new Response(
      JSON.stringify({
        message: "Invalid Username",
      }),
      { status: 401 }
    );
  } catch (error) {
    console.error("Error fetching data from PostgreSQL:", error);
    return new Response(
      JSON.stringify({
        message: "Invalid username or name",
      }),
      { status: 500 }
    );
  }
}
