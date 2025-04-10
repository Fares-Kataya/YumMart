import React, { useState, useRef } from "react";
import axios from "axios";
import CheckModal from "./CheckModal";
import { useNavigate } from "react-router-dom";

export default function ManageItems({
	category,
	items,
	handleDelProd,
	handleUpdateProd,
}) {
	const [isEditing, setIsEditing] = useState(false);
	const [editingItemId, setEditingItemId] = useState(null);
	const [upToast, setupToast] = useState(false);
	const [delToast, setdelToast] = useState(false);
	const [itemToDelete, setItemToDelete] = useState(null);
	const nameInputRef = useRef(null);
	const priceInputRef = useRef(null);
	const navigate = useNavigate();

	const distinctCategories = category.filter((cat) => cat.id !== 0);

	const toggleEditMode = (itemId) => {
		setIsEditing(true);
		setEditingItemId(itemId);
	};

	const saveChanges = async () => {
		const newName = nameInputRef.current.value;
		const newPrice = priceInputRef.current.value;

		const { data } = await axios.patch(
			`http://localhost:3000/menu/${editingItemId}`,
			{
				name: newName,
				price: newPrice,
			}
		);
		setIsEditing(false);
		setEditingItemId(null);
		handleUpdateProd(editingItemId, {
			name: data.name,
			price: data.price,
		});

		setupToast(true);
		setTimeout(() => setupToast(false), 3000);
	};

	const cancelEdit = () => {
		setIsEditing(false);
		setEditingItemId(null);
	};
	const handleDelete = async (item) => {
		console.log(item.id);
		await axios.delete("http://localhost:3000/menu/" + item.id);
		handleDelProd(item.id);
		setdelToast(true);
		setTimeout(() => setdelToast(false), 3000);

		setItemToDelete(null);
	};
	// const handleConfirmDelete = (confirmed, item) => {
	// 	setItemToDelete(item);
	// 	if (confirmed) {
	// 		handleDelete(item);
	// 	}
	// };
	const handleAdd = () => {
		navigate("/admin/add-item", {
			state: { categories: distinctCategories },
		});
	};
	return (
		<>
			{distinctCategories.map((cat) => (
				<div
					key={cat.id}
					className="collapse collapse-arrow bg-base-100 border border-base-300 mb-2 bg-gray-50">
					<input type="radio" name="my-accordion-2" />
					<div className="collapse-title text-xl font-semibold">{cat.name}</div>
					<div className="collapse-content">
						<table className="w-full table">
							<thead>
								<tr className="border-b">
									<th className="text-left py-2 font-semibold w-1/2">Name</th>
									<th className="text-left py-2 font-semibold w-1/4">Price</th>
									<th className="text-center py-2 font-semibold w-1/8">Edit</th>
									<th className="text-center py-2 font-semibold w-1/8">
										Delete
									</th>
								</tr>
							</thead>
							<tbody>
								{items
									.filter((item) => item.category == cat.id)
									.map((fil) => (
										<tr key={fil.id} className="border-b hover:bg-gray-50">
											<td className="py-3">
												{isEditing && editingItemId === fil.id ? (
													<input
														type="text"
														ref={nameInputRef}
														defaultValue={fil.name}
														className="input input-bordered w-full"
													/>
												) : (
													<span className="font-bold text-1xl">{fil.name}</span>
												)}
											</td>
											<td className="py-3">
												{(isEditing && editingItemId === fil.id && (
													<input
														type="text"
														ref={priceInputRef}
														defaultValue={fil.price}
														className="input input-bordered w-full"
													/>
												)) || (
													<span className="text-gray-600 font-bold">
														{fil.price}$
													</span>
												)}
											</td>
											<td className="py-3 text-center">
												{isEditing && editingItemId === fil.id ? (
													<button
														className="p-1 hover:bg-green-100 rounded btn btn-success btn-sm"
														onClick={saveChanges}>
														Save
													</button>
												) : (
													<button
														className="p-1 hover:bg-gray-100 rounded btn btn-ghost btn-sm"
														onClick={() => toggleEditMode(fil.id)}>
														<svg
															xmlns="http://www.w3.org/2000/svg"
															fill="none"
															viewBox="0 0 24 24"
															strokeWidth={1.5}
															stroke="currentColor"
															className="size-5 text-blue-600">
															<path
																strokeLinecap="round"
																strokeLinejoin="round"
																d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
															/>
														</svg>
													</button>
												)}
											</td>
											<td className="py-3 text-center">
												{isEditing && editingItemId === fil.id ? (
													<button
														className="p-1 hover:bg-red-100 rounded btn btn-error btn-sm"
														onClick={cancelEdit}>
														Cancel
													</button>
												) : (
													<button
														className="btn"
														onClick={ () => handleDelete(fil)}>
														<svg
															xmlns="http://www.w3.org/2000/svg"
															fill="none"
															viewBox="0 0 24 24"
															strokeWidth={1.5}
															stroke="currentColor"
															className="size-5 text-red-500">
															<path
																strokeLinecap="round"
																strokeLinejoin="round"
																d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
															/>
														</svg>
													</button>
												)}
											</td>
										</tr>
									))}
							</tbody>
						</table>
						{items.filter((item) => item.category == cat.id).length === 0 && (
							<p className="text-gray-500 py-3 text-center italic">
								No items in this category
							</p>
						)}
					</div>
				</div>
			))}
			<div className="text-end mr-5">
				<button className="btn btn-accent" onClick={handleAdd}>
					Add
				</button>
			</div>
			{upToast && (
				<div className="toast fixed bottom-4 right-4">
					<div className="alert alert-info">
						<span>Update successful!</span>
					</div>
				</div>
			)}
			{delToast && (
				<div className="toast fixed bottom-4 right-4">
					<div className="alert alert-error">
						<span>Deleted successful!</span>
					</div>
				</div>
			)}
		</>
	);
}
