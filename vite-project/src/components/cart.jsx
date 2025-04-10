// Cart.jsx
import React, { useState, useEffect } from "react";
import CartItem from "./cartitem";

export default function Cart({ cartItems, handleInc, handleDec, handleDel }) {
	const [Total, setTotal] = useState(0)
	console.log(cartItems)
	const uniqueCartItems = cartItems.filter(
		(value, index, item) => index === item.findIndex((t) => t.id === value.id)
	);
	useEffect(() => {
			const newTotal = cartItems.reduce(
				(acc, item) => {
					return acc + item.count * item.price
				}, 0);
			setTotal(newTotal);
		}, [cartItems]);
	return (
		<div className="p-4">
			<div className="flex justify-between">
				<h1 className="text-4xl font-bold mb-4">My Cart</h1>
				<h1 className="text-4xl font-bold mb-4">{cartItems.length} Items</h1>
			</div>
			<table className="table grid">
				<thead>
					<tr>
						<th>product Details</th>
						<th>Quantity</th>
						<th>Price</th>
						<th>Total</th>
					</tr>
				</thead>
				<tbody>
					{uniqueCartItems.length === 0 ? (
						<tr>
							<td>
								<p>No items in the cart.</p>
							</td>
						</tr>
					) : (
						uniqueCartItems.map((item, index) => (
							<CartItem
								key={index}
								name={item.name}
								count={item.count || 0}
								price={item.price}
								handleInc={() => handleInc(item.id)}
								handleDec={() => handleDec(item.id)}
								handleDel={() => handleDel(item.id)}
							/>
						))
					)}
				</tbody>
			</table>
			{uniqueCartItems.length != 0 && (
				<h4 className="text-end text-3xl font-semibold flex justify-between mt-5">
					<p className="ml-4">Total Cost:</p>
					<p className="mr-15">{Total}$</p>
				</h4>
			)}
		</div>
	);
}
