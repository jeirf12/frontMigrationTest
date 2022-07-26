export class ApiResponse<T> {
    public success: boolean;
    public body: T;
    public code: number;
}