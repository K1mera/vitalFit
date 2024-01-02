const postPreference = require ("../../Controllers/MercadoPago/postPreferenceController")

const postPreferenceHandler = async (req, res) => {
    const data = req.body
    try {
        const response = await postPreference(data)
        res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

module.exports = postPreferenceHandler