export type LoginState = {
    errors?: {
        username?: string[];
        email?: string[];
        password?: string[];
    };
    message?: string | null;
};

export type RegisterState = {
    errors?: {
        first_name?: string[];
        last_name?: string[];
        username?: string[];
        email?: string[];
        password?: string[];
        passwordConfirm?: string[];
    };
    message?: string | null;
};