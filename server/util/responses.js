module.exports = {
    errorResponse: (res, message, status_code = 400) => {
        return res.status(status_code).json({
            status: 'error',
            message
        });
    },

    successResponse: (res, message, status_code = 200) => {
        return res.status(status_code).json({
            status: 'success',
            message
        })
    }
}