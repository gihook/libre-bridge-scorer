const controllerHandler = (controller, parametersProvider) => {
    return async (request, response, next) => {
        try {
            const parameters = parametersProvider ? parametersProvider(request, response, next) : [];
            const result = await controller(...parameters);

            response.send(result);
        } catch (error) {
            const errorData = errorHandler(error);
            response.status(errorData.status);
            next(errorData);
        }
    }
} 

const errorHandler = (error) => {
    return {
        error,
        status: 500
    }
}

module.exports = controllerHandler;