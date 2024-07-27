export const ApiError = ( status, message) =>{

    const error = new Error();
    error.status=status
    error.message=message
    error.data=null
    error.success=status<400

    return error

}