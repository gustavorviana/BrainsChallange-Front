import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

interface PaginationProps {
	currentPage: number
	totalPages: number
	onPageChange: (page: number) => void
}

export default function Pagination({
	currentPage,
	totalPages,
	onPageChange,
}: PaginationProps) {
	const handlePrevious = () => {
		if (currentPage > 1) {
			onPageChange(currentPage - 1)
		}
	}

	const handleNext = () => {
		if (currentPage < totalPages) {
			onPageChange(currentPage + 1)
		}
	}

	const handlePageClick = (page: number) => {
		if (page >= 1 && page <= totalPages) {
			onPageChange(page)
		}
	}

	const getPageNumbers = () => {
		const pages: (number | string)[] = []
		const maxVisible = 5

		if (totalPages <= maxVisible) {
			for (let i = 1; i <= totalPages; i++) {
				pages.push(i)
			}
		} else {
			if (currentPage <= 3) {
				for (let i = 1; i <= 4; i++) {
					pages.push(i)
				}
				pages.push('ellipsis')
				pages.push(totalPages)
			} else if (currentPage >= totalPages - 2) {
				pages.push(1)
				pages.push('ellipsis')
				for (let i = totalPages - 3; i <= totalPages; i++) {
					pages.push(i)
				}
			} else {
				pages.push(1)
				pages.push('ellipsis')
				for (let i = currentPage - 1; i <= currentPage + 1; i++) {
					pages.push(i)
				}
				pages.push('ellipsis')
				pages.push(totalPages)
			}
		}

		return pages
	}

	if (totalPages <= 1) {
		return null
	}

	return (
		<div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
			<div className="flex flex-1 justify-between sm:hidden">
				<button
					type="button"
					onClick={handlePrevious}
					disabled={currentPage === 1}
					className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
				>
					Anterior
				</button>
				<button
					type="button"
					onClick={handleNext}
					disabled={currentPage === totalPages}
					className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
				>
					Próxima
				</button>
			</div>
			<div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
				<div>
					<p className="text-sm text-gray-700">
						Página <span className="font-medium">{currentPage}</span> de{' '}
						<span className="font-medium">{totalPages}</span>
					</p>
				</div>
				<div>
					<nav
						className="isolate inline-flex -space-x-px rounded-md shadow-sm"
						aria-label="Pagination"
					>
						<button
							type="button"
							onClick={handlePrevious}
							disabled={currentPage === 1}
							className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
						>
							<span className="sr-only">Anterior</span>
							<ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
						</button>
						{getPageNumbers().map((page, index) => {
							if (page === 'ellipsis') {
								return (
									<span
										key={`ellipsis-${index}`}
										className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0"
									>
										...
									</span>
								)
							}

							const pageNumber = page as number
							const isCurrentPage = pageNumber === currentPage

							return (
								<button
									disabled={isCurrentPage}
									key={pageNumber}
									type="button"
									onClick={() => handlePageClick(pageNumber)}
									aria-current={isCurrentPage ? 'page' : undefined}
									className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${isCurrentPage
											? 'z-10 bg-blue-600 text-white focus:z-20 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-blue-600'
											: 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 cursor-pointer'
										}`}
								>
									{pageNumber}
								</button>
							)
						})}
						<button
							type="button"
							onClick={handleNext}
							disabled={currentPage === totalPages}
							className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
						>
							<span className="sr-only">Próxima</span>
							<ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
						</button>
					</nav>
				</div>
			</div>
		</div>
	)
}

