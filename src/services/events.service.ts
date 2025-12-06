import { apiClient } from './config/api.config'
import type {
	GetStudentEventsParams,
	StudentEventResponsePagedResult,
} from './types/event.types'
import { EEventResponseType } from './types/event.types'

export const eventsService = {
	async getStudentEvents(
		params?: GetStudentEventsParams
	): Promise<StudentEventResponsePagedResult> {
		const response = await apiClient.get<StudentEventResponsePagedResult>(
			'/api/StudentEvents',
			{
				params,
			}
		)
		return response.data
	},
}

export { EEventResponseType }
export type {
	GetStudentEventsParams,
	StudentEventResponsePagedResult,
} from './types/event.types'
export type { StudentEventResponse } from './types/event.types'

