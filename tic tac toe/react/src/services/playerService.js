import axios from 'axios';

export default {
    // Get all players
    getPlayers() {
        return axios.get('http://localhost:9000/players');  // Ensure the correct full URL
    },

    // Get a player by username (assuming 'id' is username here)
    getPlayerByUsername(id) {
        return axios.get(`http://localhost:9000/players/${id}`);  // Use string interpolation to insert id
    },

    // Update a player's data
    updatePlayer(player) {
        return axios.put(`http://localhost:9000/players/${player.username}`, player)
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
