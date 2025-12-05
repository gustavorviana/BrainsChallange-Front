interface AlertProps {
	message: string
	onClose: () => void
	type?: 'error' | 'success' | 'info'
}

export default function Alert({ message, onClose, type = 'error' }: AlertProps) {
	const bgColor = type === 'error' ? 'bg-red-50 border-red-200' : type === 'success' ? 'bg-green-50 border-green-200' : 'bg-blue-50 border-blue-200'
	const textColor = type === 'error' ? 'text-red-800' : type === 'success' ? 'text-green-800' : 'text-blue-800'

	return (
		<div className={`${bgColor} border ${textColor} px-4 py-3 rounded-lg mb-4 flex items-center justify-between`}>
			<div className="flex items-center">
				{type === 'error' && (
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
						<path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
					</svg>
				)}
				{type === 'success' && (
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
						<path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
					</svg>
				)}
				{type === 'info' && (
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
						<path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
					</svg>
				)}
				<p className="text-sm font-medium">{message}</p>
			</div>
			<button
				onClick={onClose}
				className={`ml-4 ${textColor} hover:opacity-75 transition-opacity cursor-pointer`}
				aria-label="Fechar alerta"
			>
				<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
					<path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
				</svg>
			</button>
		</div>
	)
}

