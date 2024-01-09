export interface ProgressState {
	isLoading: boolean;
	isSuccess: boolean;
	isError: boolean;
	isComplete?: boolean;
	message: string;
}
