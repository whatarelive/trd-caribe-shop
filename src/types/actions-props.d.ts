export type LoginState = {
    errors?: {
        username?: string[];
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

export type CreateProductState = {
    errors?: {
        name?: string[];
        description?: string[];
        category?: string[];
        price?: string[]; 
        stock?: string[];
    };
    message?: string | null;
}