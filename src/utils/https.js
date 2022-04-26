import axios from "axios";
import queryString from "querystring";

const defaultConfig = () => {
    const token = localStorage.getItem("auth-token");
    return {
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
        },
    };
};

const http = {
    get: async (url, query = {}) => {
        if (!url) throw new Error("URL is required");
        const param = queryString.stringify(query);
        if (param) url += `?${param}`;

        try {
            return await axios.get(url, defaultConfig());
        } catch (error) {
            throw error;
        }
    },
    post: async (url, data = {}) => {
        if (!url) throw new Error("URL is required");
        try {
            return await axios.post(url, data, defaultConfig());
        } catch (error) {
            throw error;
        }
    },
    put: async (url, data = {}) => {
        if (!url) throw new Error("URL is required");
        try {
            return await axios.put(url, data, defaultConfig());
        } catch (error) {
            throw error;
        }
    },
    _delete: async (url, data = {}) => {
        if (!url) throw new Error("URL is required");
        try {
            return await axios.delete(url, defaultConfig());
        } catch (error) {
            throw error;
        }
    },
};

export default http;
