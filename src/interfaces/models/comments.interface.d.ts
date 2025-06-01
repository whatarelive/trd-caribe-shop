export interface ICommentsAPI {
    text: string;
    active: boolean;
}

export interface IResponseAPI {
    username: string;
    response: string;
}

export interface IComments {
    id: number;	
    user: string;
    text: string;
    active: boolean;
    created: string;
    update: string;
}

export interface CommentsResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: any[];
}