const parseError = (error) => {
    if (error.response?.data?.message) {
        return error.response?.data?.message;
    }

    if (error.response?.data?.error) {
        return error.response?.data?.error;
    }

    if (error.message) {
        return error.message;
    }

    return "An error occurred. Please try again.";
};

export default parseError;
