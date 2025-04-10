import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function AddItem() {
	const location = useLocation();
	const navigate = useNavigate();
	const { categories } = location.state || { categories: [] };
    console.log(location.state)
	const [formData, setFormData] = useState({
		name: "",
		price: "",
		category: categories.length > 0 ? categories[0].id : "",
	});

	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");

		if (!formData.name.trim()) {
			setError("Name is required");
			return;
		}

		if (!formData.price.trim()) {
			setError("Price is required");
			return;
		}

		if (isNaN(Number(formData.price))) {
			setError("Price must be a number");
			return;
		}

		if (!formData.category) {
			setError("Category is required");
			return;
		}

		try {
			setLoading(true);
			await axios.post("http://localhost:3000/menu", {
				name: formData.name,
				price: formData.price,
                category: Number(formData.category),
                count: 0,
                isInCart: false
			});
			navigate(-1);
		} catch (error) {
			setError("Failed to add item. Please try again.");
			console.error("Error adding item:", error);
		} finally {
			setLoading(false);
		}
	};

	const handleCancel = () => {
		navigate(-1);
	};

	return (
		<div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow-md">
			<h2 className="text-2xl font-bold mb-6 text-center">Add New Item</h2>

			{error && (
				<div className="alert alert-error mb-4">
					<span>{error}</span>
				</div>
			)}

			<form onSubmit={handleSubmit}>
				<div className="form-control mb-4">
					<label className="label">
						<span className="label-text font-medium">Name</span>
					</label>
					<input
						type="text"
						name="name"
						value={formData.name}
						onChange={handleChange}
						className="input input-bordered w-full"
						placeholder="Enter item name"
					/>
				</div>

				<div className="form-control mb-4">
					<label className="label">
						<span className="label-text font-medium">Price</span>
					</label>
					<input
						type="text"
						name="price"
						value={formData.price}
						onChange={handleChange}
						className="input input-bordered w-full"
						placeholder="Enter price"
					/>
				</div>

				<div className="form-control mb-6">
					<label className="label">
						<span className="label-text font-medium">Category</span>
					</label>
					<select
						name="category"
						value={formData.category}
						onChange={handleChange}
						className="select select-bordered w-full">
						{categories.map((cat) => (
							<option key={cat.id} value={cat.id}>
								{cat.name}
							</option>
						))}
					</select>
				</div>

				<div className="flex justify-between">
					<button
						type="button"
						onClick={handleCancel}
						className="btn btn-outline">
						Cancel
					</button>
					<button type="submit" className="btn btn-accent" disabled={loading}>
						{loading ? "Adding..." : "Add Item"}
					</button>
				</div>
			</form>
		</div>
	);
}
