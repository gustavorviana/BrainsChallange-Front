export enum EEventResponseType {
	None = 'None',
	Organizer = 'Organizer',
	TentativelyAccepted = 'TentativelyAccepted',
	Accepted = 'Accepted',
	Declined = 'Declined',
	NotResponded = 'NotResponded',
}

export interface StudentEventResponse {
	id: string
	subject: string | null
	start: string | null
	end: string | null
	studentId: string
	status: string | null
	studentName: string | null
	studentEmail: string | null
}

export interface StudentEventResponsePagedResult {
	items: StudentEventResponse[] | null
	totalCount: number
	totalPages: number
}

export interface GetStudentEventsParams {
	page?: number
	studentId?: string
	startDate?: string
	endDate?: string
	status?: EEventResponseType
}

