class DataFetchingError extends Error {
    constructor() {
        super("Network error in fetching data")
    }
}

class UnknownError extends Error {
}

class WrongResponseError extends Error {
}

class InvalidDataError extends Error {
    constructor(
        message: string
    ) {
        super(message)
    }
}

export { InvalidDataError, DataFetchingError, UnknownError, WrongResponseError }

