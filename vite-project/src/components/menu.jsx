import React from "react";

export default function Menu({ category, selected, handleSel }) {
	return (
		<div className="ml-5 h-85">
			<h2 className="text-4xl mt-1 font-semibold">Menu</h2>
			<ul className="menu bg-gray-300 rounded-box w-60 h-full mt-1">
				{category.map((categoryItem) => (
					<li key={categoryItem.id}>
						<a
							className={`text-3xl ${
								categoryItem.id === selected && "bg-black text-amber-50"
							}`}
							onClick={() => handleSel(categoryItem.id)}
						>
							{categoryItem.name}
						</a>
					</li>
				))}
			</ul>
		</div>
	);
}
