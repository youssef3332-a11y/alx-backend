import { createClient } from 'redis';
import redis from 'redis';

// Create a Redis client
const client = createClient();

// Handle successful connection
client.on('connect', () => {
  console.log('Redis client connected to the server');
});

// Handle connection error
client.on('error', (err) => {
  console.error(`Redis client not connected to the server: ${err.message}`);
});

// Function to set a new school in Redis
function setNewSchool(schoolName, value) {
  client.set(schoolName, value, redis.print); // use redis.print for callback confirmation
}

// Function to display the value of a school
function displaySchoolValue(schoolName) {
  client.get(schoolName, (err, reply) => {
    if (err) {
      console.error('Error retrieving value:', err);
      return;
    }
    console.log(reply); // Print the value to the console
  });
}

// Call the functions
displaySchoolValue('Holberton'); // Try to get value of Holberton
setNewSchool('HolbertonSanFrancisco', '100'); // Set the value for HolbertonSanFrancisco
displaySchoolValue('HolbertonSanFrancisco'); // Now try to get the newly set value
