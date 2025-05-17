
import axios from 'axios';

export default {

    // Get all players
    getPlayers() {
        return axios.get('http://localhost:9000/players');  // Ensure the correct full URL
    },

    // Get a player by username (assuming 'id' is username here)
    getPlayerById(id) {
        return axios.get(`http://localhost:9000/players/id/${id}`);  // Use string interpolation to insert id
    },

    // Get a player by username
    getPlayerByUsername(username) {
        return axios.get(`http://localhost:9000/players/username/${username}`)
            .then(response => response.data)
            .catch(error => {
                console.error('Error getting player by username:', error);
                throw error;
            });
    },

    // Update a player's data with win parameter
    updatePlayer(username, win = false) {
        return axios.put(`http://localhost:9000/players/username/${username}?win=${win}`)
            .then(response => {
                console.log('Player updated successfully', response.data);
                return response.data;  // Return the updated player data
            })
            .catch(error => {
                console.error('Error updating player:', error);
                throw error;  // Rethrow error to handle it in the component
            });
    },

    // Create a new player
    createPlayer(player) {
        return axios.post('http://localhost:9000/players', player)
            .then(response => {
                console.log('Player created successfully', response.data);
                return response.data;  // Return the created player data
            })
            .catch(error => {
                console.error('Error creating player:', error);
                throw error;  // Rethrow error to handle it in the component
            });
    }
};