// Cart.jsx
import React from "react";
import CartItem from "./cartitem";

export default function Cart({ cartItems, handleInc, handleDec, handleDel }) {
	return (
		<div className="p-4">
			<h1 className="text-4xl font-bold mb-4">Your Cart</h1>
			{cartItems.length === 0 ? (
				<p>No items in the cart.</p>
			) : (
				cartItems.map((item, index) => (
					<CartItem
						key={index}
						name={item.name}
						count={item.count || 1}
						handleInc={() => handleInc(item.id)}
						handleDec={() => handleDec(item.id)}
						handleDel={() => handleDel(item.id)}
					/>
				))
			)}
		</div>
	);
}
