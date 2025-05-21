export interface IComplaints {
    id: number;	
    user: string
    text: string
    active: boolean;
    created: string;
    upate: string;
}

export interface ComplaintsResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: IComplaints[];
}