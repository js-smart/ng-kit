import { ProgressState } from '../types/progress-state';
import { signal, WritableSignal } from '@angular/core';

/**
 * Initialize Loading or Update ProgressState
 *
 * @return Updated State Object
 *
 * @author Pavan Kumar Jadda
 * @since 2.7.16
 */
export const initializeState = (): WritableSignal<ProgressState> => {
	return signal<ProgressState>({
		isLoading: false,
		isSuccess: false,
		isError: false,
		isComplete: false,
		message: '',
	});
};

/**
 * Initialize Loading or Update ProgressState
 *
 * @param progressState Object to initialize
 * @return ProgressState Updated State Object
 *
 * @author Pavan Kumar Jadda
 * @since 2.7.16
 */
export const markLoading = (progressState: WritableSignal<ProgressState>) => {
	progressState.update((state) => {
		return {
			...state,
			isLoading: true,
			isSuccess: false,
			isError: false,
			isComplete: false,
			message: '',
		};
	});
};

/**
 * Update state as isSuccess
 *
 * @return ProgressState Updated State Object
 *
 * @author Pavan Kumar Jadda
 * @since 2.7.16
 */
export const markSuccess = (progressState: WritableSignal<ProgressState>, message?: string) => {
	progressState.update((state) => {
		return {
			...state,
			isLoading: false,
			isSuccess: true,
			isError: false,
			isComplete: true,
			message: message || '',
		};
	});
};

/**
 * Update state as failure or isError
 *
 * @return ProgressState Updated State Object
 *
 * @author Pavan Kumar Jadda
 * @since 2.7.16
 */
export const markError = (progressState: WritableSignal<ProgressState>, message?: string) => {
	progressState.update((state) => {
		return {
			...state,
			isLoading: false,
			isSuccess: false,
			isError: true,
			isComplete: true,
			message: message || '',
		};
	});
};
