import pool from "../../../../utlis/pgdb";



async function getUsername() {
  const { rows } = await pool.query("SELECT COUNT(uid) FROM userData");
  const userCount = rows[0].count;  // Get the count from the query result

  const userName = "U" + (parseInt(userCount) + 1);  // Increment the count to generate a new username

  return userName;
}

// Function to insert data into PostgreSQL
async function setData(username, name, email, password) {
  await pool.query(
    "INSERT INTO userData (uid, uname, email, password) VALUES ($1, $2, $3, $4)",
    [username, name, email, password]
  );
}

// Handle POST request
export async function POST(req) {
  try {
    console.log("Processing the request...");
    
    const body = await req.json();
    
    const username = await getUsername();
    console.log("username " + username);
    
    // Destructure the fields correctly
    const { name, email, password } = body;

    // Call the function to store data
    await setData(username, name, email, password);

    return new Response(JSON.stringify({ message: 'Data Stored and UserName is :- '+ username }), { status: 200 });
  } 
  catch (error) {
    console.error('Error storing data:', error);
    return new Response(JSON.stringify({ message: 'Error storing data' }), { status: 500 });
  }
}