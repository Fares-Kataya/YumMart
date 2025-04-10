import React from 'react'

export default function mangageItems({ category, currentItems }) {
	console.log(currentItems);
	const distinctCategories = category.filter((cat) => cat.id !== 0);
	return (
		<>
			{distinctCategories.map((cat) => (
				<div
					key={cat.id}
					className="collapse collapse-arrow bg-base-100 border border-base-300 mb-2">
					<input type="radio" name="my-accordion-2" />
					<div className="collapse-title text-xl font-semibold">{cat.name}</div>
					<div className="collapse-content">
						{currentItems
							.filter((item) => item.category === cat.id)
							.map((fil) => (
								<div
									key={fil.id}
									className="flex justify-between items-center py-2 border-b">
									{console.log(fil)}
								</div>
							))}
					</div>
				</div>
			))}
		</>
	);
}

