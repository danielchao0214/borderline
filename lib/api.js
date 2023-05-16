export const sendResetEmail = async (data) =>
    fetch("/api/resetpasswordlink", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
    });