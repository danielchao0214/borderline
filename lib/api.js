export const sendResetEmail = async (data) =>
    fetch("/api/resetpassword", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
    });