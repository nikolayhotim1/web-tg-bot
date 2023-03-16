import { useState } from 'react'
import '../styles/ProductList.css'
import ProductItem from './ProductItem'
import useTelegram from '../hooks/useTelegram'
import { useCallback, useEffect } from 'react'

const products = [
	{ id: '1', title: 'Jeans', price: 5000, description: 'Of blue color' },
	{ id: '2', title: 'Jacket', price: 12000, description: 'Of green color, warm' },
	{ id: '3', title: 'Jeans 2', price: 5000, description: 'Of blue color, straight' },
	{ id: '4', title: 'Jacket 2', price: 122, description: 'Of green color, warm' },
	{ id: '5', title: 'Jeans 3', price: 5000, description: 'Of blue color, straight' },
	{ id: '6', title: 'Jacket 3', price: 600, description: 'Of green color, warm' },
	{ id: '7', title: 'Jeans 4', price: 5500, description: 'Of blue color, straight' },
	{ id: '8', title: 'Jacket 4', price: 12000, description: 'Of green color, warm' }
]

function getTotalPrice(items = []) {
	return items.reduce((acc, item) => {
		return (acc += item.price)
	}, 0)
}

export default function ProductList() {
	const [addedItems, setAddedItems] = useState([])
	const { tg, queryId } = useTelegram()

	const onSendData = useCallback(() => {
		const data = {
			products: addedItems,
			totalPrice: getTotalPrice(addedItems),
			queryId
		}
		fetch('http://85.119.146.179:8000/web-data', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})
	}, [addedItems, queryId])

	useEffect(() => {
		tg.onEvent('mainButtonClicked', onSendData)

		return () => {
			tg.offEvent('mainButtonClicked', onSendData)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [onSendData])

	function onAdd(product) {
		const alreadyAdded = addedItems.find(item => item.id === product.id)
		let newItems = []

		if (alreadyAdded) {
			newItems = addedItems.filter(item => item.id !== product.id)
		} else {
			newItems = [...addedItems, product]
		}

		setAddedItems(newItems)

		if (newItems.length === 0) {
			tg.MainButton.hide()
		} else {
			tg.MainButton.show()
			tg.MainButton.setParams({ text: `Buy ${getTotalPrice(newItems)}$` })
		}
	}

	return (
		<div className='list'>
			{products.map(item => (
				<ProductItem product={item} onAdd={onAdd} className='item' />
			))}
		</div>
	)
}
