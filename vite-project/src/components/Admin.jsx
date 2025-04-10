import { useNavigate } from "react-router-dom";
export default function Admin() {
    const navigate = useNavigate();

    const manage = () => {
		navigate("/admin/Menu-Items");
	};
    return (
		<div className="p-4">
			<h1 className="text-4xl font-bold mb-4">Admin Dashboard</h1>
			<div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-5">
				<div className="card h-50 bg-base-100 shadow-xl">
					<div className="card-body">
						<h2 className="card-title">Manage Menu</h2>
						<p>Add, edit, or remove menu items</p>
						<div className="card-actions justify-end">
							<button className="btn bg-black text-white" onClick={manage}>Manage</button>
						</div>
					</div>
				</div>
				<div className="card h-50 bg-base-100 shadow-xl">
					<div className="card-body">
						<h2 className="card-title">Manage Categories</h2>
						<p>Add, edit, or remove categories</p>
						<div className="card-actions justify-end">
							<button className="btn btn-primary bg-black text-white">
								Manage
							</button>
						</div>
					</div>
				</div>
				<div className="card h-50 bg-base-100 shadow-xl">
					<div className="card-body">
						<h2 className="card-title">Orders</h2>
						<p>View and manage customer orders</p>
						<div className="card-actions justify-end">
							<button className="btn btn-primary bg-black text-white">
								View
							</button>
						</div>
					</div>
				</div>
				<div className="card h-50 bg-base-100 shadow-xl">
					<div className="card-body">
						<h2 className="card-title">Analytics</h2>
						<p>View sales and customer analytics</p>
						<div className="card-actions justify-end">
							<button className="btn btn-primary bg-black text-white">
								View
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
