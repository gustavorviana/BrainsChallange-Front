export interface StudentResponse {
	id: string
	name: string | null
	email: string | null
}

export interface StudentResponsePagedResult {
	items: StudentResponse[] | null
	totalCount: number
	totalPages: number
}

export interface GetStudentsParams {
	page?: number
	search?: string
}

