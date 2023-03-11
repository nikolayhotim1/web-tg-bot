import { useEffect } from 'react'
import './App.css'
const tg = window.Telegram.WebApp

export default function App() {
	useEffect(() => {
		tg.ready()
	}, [])

	function onClose(params) {
		tg.close()
	}

	return (
		<div>
			Works <button onClick={onClose}>Close</button>
		</div>
	)
}
