import { Request, Response, NextFunction } from "express";

enum ResponseStatus {
    SUCCESS = 200,
    CREATED = 201,
    NO_CONTENT = 204,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    Validator =422,
    INTERNAL_ERROR = 500,

}

export class ApiResponse {

    constructor() { }
    // 200 REQUEST
    successHandler = (
        res: Response,
        data: unknown,
        message?: string
    ): void => {
        res.status(ResponseStatus.SUCCESS).json({ message, data, success: true });
    };

    notFoundHandler = (res: Response, message?: string): void => {
        res.status(ResponseStatus.NOT_FOUND).json({ message });
    };

    noContent = (res: Response, message?: string): void => {
        res.status(ResponseStatus.NO_CONTENT).json({ message });
    };
    //400 REQUSET
    badRequestHandler = (res: Response, message: string): void => {
        res.status(ResponseStatus.BAD_REQUEST).json({ message: message });
    };

    unauthorizedHandler = (res: Response, error: Error): void => {
        res.status(ResponseStatus.UNAUTHORIZED).json({ error: error.message });
    };

    validationHandler = (res: Response, message: string): void => {
        res.status(ResponseStatus.Validator).json({ error: message });
    };

    serverErrorHandler = (
        res: Response,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        error: Error | any,
        data?: unknown
    ): void => {
        res.status(ResponseStatus.INTERNAL_ERROR).json({ error: error.message, data });
    };
    
    // errorHandler = (
    //     error: { status: number; message: string },
    //     req: Request,
    //     res: Response,
    //     // eslint-disable-next-line @typescript-eslint/no-unused-vars
    //     next: NextFunction
    // ): void => {
    //     const { status = 500, message } = error;
    //     res.status(status).json(message);
    // };

}