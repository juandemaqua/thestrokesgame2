import path from "path";
import express, { Express } from "express";
import cors from "cors";
import { WeatherResponse } from "@full-stack/types";
import fetch from "node-fetch";
import { db } from "./firebase";
import { collection, addDoc } from 'firebase/firestore';


const app = express();

app.use(cors()); // Enable CORS for all domains and methods
app.use(express.json()); // Parse JSON bodies

const usersCollection = db.collection("Users");

const hostname = "0.0.0.0";
const port = 8080;

type WeatherData = {
    latitude: number;
    longitude: number;
    timezone: string;
    timezone_abbreviation: string;
    current: {
        time: string;
        interval: number;
        precipitation: number;
    };
};

app.get('/get-everything', async (req, res) => {
    console.log("GET /api/get-everything was called");
    const doc = await usersCollection.get();
    
    const allOurShit: Record<string, any> = {};
    doc.forEach((d) => {
        console.log('d: ', d.id, d.data());
        allOurShit[d.id] = d.data();
    })

    res.json(allOurShit);
});

app.get('/get-usernames', async (req,res) => {
    const doc = await usersCollection.get();

    const allUsers: string[] = [];
    doc.forEach((d) => {
        console.log('d: ',d.id);
        allUsers.push(d.id);
    })

    res.json(allUsers)
});



app.post('/update-highscore', async (req, res) => {
  const { username, newScore } = req.body; // Extract data from the request body

  if (!username || typeof newScore !== 'number') {
    return res.status(400).json({ error: "Invalid input data." }); // Validate input
  }

  try {
    const userDoc = usersCollection.doc(username); // Reference to user's document

    const userSnapshot = await userDoc.get(); // Retrieve current document

    if (!userSnapshot.exists) {
      return res.status(404).json({ error: "User not found." }); // Check if user exists
    }

    const currentScore = userSnapshot.data()?.highest_score || 0; // Retrieve current score

    if (newScore > currentScore) { // Update only if new score is higher
      await userDoc.update({ highest_score: newScore });

      res.json({ message: "High score updated!" });
    } else {
      res.status(200).json({ message: "New score is not higher than current score." });
    }
  } catch (error) {
    console.error("Error updating high score:", error);
    res.status(500).json({ error: "An error occurred while updating the high score." });
  }
});

app.post('/create-account', async (req, res) => {
    const { username, email, password } = req.body; // Extract data from request body
  
    if (!username || !email || !password) {
      return res.status(400).json({ error: "Invalid input data." }); // Validate input
    }
  
    try {
      // Add a new document to the collection
      await db.collection("Users").doc(username).set({
        password, email, highest_score: 0
      })
  
      res.json({ message: "User account created successfully!" });
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ error: "An error occurred while creating the account." });
    }
  });

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const userRef = db.collection("Users").doc(username);
        const doc = await userRef.get();
        if (!doc.exists) {
            return res.status(404).json({ error: "User not found." });
        }

        const user = doc.data();
        if (password !== user!.password) { // Direct comparison (assuming plaintext for demonstration)
            return res.status(401).json({ error: "Invalid password." });
        }

        // Send back user ID along with other necessary details
        res.json({ message: "Login successful!", userId: doc.id, token: "YourGeneratedTokenHere" });
    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).json({ error: "An error occurred while trying to login." });
    }
});

app.listen(port, hostname, () => {
    console.log("Listening");
});
