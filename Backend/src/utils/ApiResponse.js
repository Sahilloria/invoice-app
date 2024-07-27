export const ApiResponse = (status, data = [], message) => {
    const res = {
        status: status,
        data: data,
        success: status < 400,
        message:message
    };
    return res
};
