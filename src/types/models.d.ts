export interface UserRegister {
    username: string;
    email: string;
    first_name:	string;
    last_name:	string;
    token: {
        refresh: string;
        access: string;   
    };
}

export interface UserLogin {
    username: string;
    password: string;
}