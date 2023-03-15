import { useEffect } from 'react'
import './styles/App.css'
import useTelegram from './hooks/useTelegram'
import Header from './components/Header'
import { Route, Routes } from 'react-router-dom'
import ProductList from './components/ProductList'
import Form from './components/Form'

export default function App() {
	const { tg } = useTelegram()

	useEffect(() => {
		tg.ready()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<div>
			<Header />
			<Routes>
				<Route index element={<ProductList />} />
				<Route path='form' element={<Form />} />
			</Routes>
		</div>
	)
}
