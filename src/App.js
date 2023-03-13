import { useEffect } from 'react'
import './styles/App.css'
import useTelegram from './hooks/useTelegram'
import Header from './components/Header'

export default function App() {
	const { tg, onToggleButton } = useTelegram()

	useEffect(() => {
		tg.ready()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<div>
			<Header />
			<button onClick={onToggleButton}>Toggle</button>
		</div>
	)
}
