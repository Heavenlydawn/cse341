const path = require("path");

const getDashboard = async (req, res) => {
    res.sendFile(path.join(__dirname, '../utils/dashboard.html'));
};

module.exports = {
    getDashboard
}; 