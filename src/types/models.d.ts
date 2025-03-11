type GetParams = {
    count: number;
    next: string;
    previous: string;
}

export interface IUser {
    username: string;
    password: string;
    email: string;
    first_name:	string;
    last_name:	string;
    token: {
        refresh: string;
        access: string;   
    };
}

export type UserLogin = Pick<IUser, "username" | "password">;
export type UserRegister = Omit<IUser, "password">;
export type UserRegisterPost = Omit<IUser, "token">;

export interface IProducts {
    id: number;
    categorie: number;
    name: string;
    image?: string;
    price: number;
    description: string;
    stock: number;
    discount: string;
    created: string;
    updated: string;
}

export type ProductsPost = Omit<IProducts, "id" | "discount" | "created" | "updated">

export interface ICategories {
    id: number;
    name: string;
    created: string;
    updated: string;
}

export type CategoriesGet = {
    results: ICategories[];
} & GetParams;