import React from 'react'

export default function Items({ items, pages, handlePage, handleSearch, handleCart, loading }) {
	const arr = [...Array(pages)].map((_, i) => i + 1);
	if (loading) {
		return (
			<>
				<div className="w-full h-screen flex items-center justify-center">
					<span className="loading loading-spinner loading-xl"></span>
				</div>
			</>
		);
	}
	return (
		<div className="overflow-x-auto">
			<div className="flex justify-between">
				<h2 className="text-4xl mt-5 ml-3 font-semibold">Items</h2>
				<input
					type="text"
					placeholder="Type here"
					className="input-xs p-2 border-1 rounded-2xl mt-10 mr-2 "
					onChange={() => handleSearch(event)}
				/>
			</div>
			<table className="table grid">
				{/* head */}
				<thead>
					<tr>
						<th>Name</th>
						<th>Price</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{items.map((item) => (
						<tr key={item.id}>
							<td className="font-semibold">{item.name}</td>
							<td className="font-semibold">{item.price + "$"}</td>
							<td>
								<div tabIndex={0} role="button" className="btn btn-ghost" onClick={()=> handleCart(event,item)}>
									<div className="indicator">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="h-5 w-5"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor">
											{" "}
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="2"
												d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
											/>{" "}
										</svg>
									</div>
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>
			<div className="join flex justify-end mr-70">
				<button
					className="join-item btn btn-active p-0 w-10"
					key="1"
					onClick={() => handlePage(event, 1)}>
					1
				</button>
				{arr.slice(1).map((page) => (
					<button
						className="join-item btn p-0 w-10"
						key={page}
						onClick={() => handlePage(event, page)}>
						{page}
					</button>
				))}
			</div>
		</div>
	);
}
