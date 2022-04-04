import axios from "axios";

export default axios.create({
    baseURL: "https://api.dev.captainwordsapp.com/react-test/",
    headers: {
        "Content-type": "application/json"
    }
});
