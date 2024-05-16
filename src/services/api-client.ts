import axios from "axios";

export default axios.create({
  baseURL: "https://api.rawg.io/api",
  params: {
    key: "2a77b745121c412d92b949a1e9e58db8",
  },
});
