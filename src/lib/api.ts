import axios from "axios";


const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json", 
    "ngrok-skip-browser-warning": "69420" // this used only for ignoring a page on ngrok 
  },

});

export default api;
