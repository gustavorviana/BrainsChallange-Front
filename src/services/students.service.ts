import { apiClient } from './config/api.config'
import type {
	GetStudentsParams,
	StudentResponsePagedResult,
} from './types/student.types'

export const studentsService = {
	async getStudents(params?: GetStudentsParams): Promise<StudentResponsePagedResult> {
		const response = await apiClient.get<StudentResponsePagedResult>('/api/Students', {
			params,
		})
		return response.data
	},
}

export type { GetStudentsParams, StudentResponsePagedResult } from './types/student.types'
export type { StudentResponse } from './types/student.types'

