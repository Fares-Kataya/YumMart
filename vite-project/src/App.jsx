import Navbar from "./components/navbar";
import Menu from "./components/menu";
import Items from "./components/Items";
import Cart from "./components/cart";
import Admin from "./components/admin";
import ManageItems from "./components/manageItems";
import AddItem from "./components/AddItem";
import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
function App() {
	//states
	const [allItems, setAllItems] = useState([]);
	const [items, setitems] = useState([]);
	const [category, setcategory] = useState([]);
	const [selected, setselected] = useState(0);
	const [currentPage, setCurrentPage] = useState(1);
	const [cartCount, setCartCount] = useState(0);
	const [cartItems, setCartItems] = useState([]);
	const [Loading, setLoading] = useState(false);
	const location = useLocation();
	// backend fetch
	useEffect(() => {
		axios
			.get("http://localhost:3000/categories")
			.then(({ data }) => setcategory(data))
			.catch(console.error);
	}, []);
	useEffect(() => {
		if (
			location.pathname === "/" ||
			location.pathname === "/admin/Menu-Items"
		) {
			setLoading(true);
			axios
				.get("http://localhost:3000/menu?_delay=1500")
				.then(({ data }) => {
					setAllItems(data);
					setitems(data);
				})
				.catch(console.error)
				.finally(() => setLoading(false));
		}
	}, [location.pathname]);

	//handlers
	const handleSel = (id) => {
		setCurrentPage(1);
		setselected(id);
	};
	const handlePage = (event, pageNo) => {
		const parent = event.target.parentElement;
		const buttons = parent.querySelectorAll("button");
		buttons.forEach((btn) => btn.classList.remove("btn-active"));
		event.target.classList.add("btn-active");
		setCurrentPage(pageNo);
	};
	const handleSearch = (input) => {
		const searchQry = input.target.value;
		const searchedItems = allItems.filter((item) =>
			item.name.toLowerCase().includes(searchQry.toLowerCase())
		);
		setitems(searchedItems);
	};
	const handleCart = (event, item) => {
		setCartItems([...cartItems, item]);
		setCartCount(cartCount + 1);
		event.target.closest(
			"svg"
		).outerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
  <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
</svg>
`;
	};
	const handleInc = (id) => {
		setCartItems((previtems) =>
			previtems.map((item) =>
				item.id === id ? { ...item, count: item.count + 1 } : item
			)
		);
	};
	const handleDec = (id) => {
		setCartItems((previtems) =>
			previtems.map((item) =>
				item.id === id && item.count > 0
					? { ...item, count: item.count - 1 }
					: item
			)
		);
	};
	const handleDel = (id) => {
		setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
	};
	const handleDelProd = (id) => {
		setAllItems((prev) => prev.filter((item) => item.id !== id));
	};
	const handleUpdateProd = (id, updates) => {
		setAllItems((prev) =>
			prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
		);
	};

	//filter
	const filteredItems =
		selected === 0 ? items : items.filter((item) => item.category == selected);
	//pagination
	const itemsPerPage = 4;
	const noOfPages = Math.ceil(filteredItems.length / itemsPerPage);
	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	const currentItems = filteredItems.slice(startIndex, endIndex);

	return (
		<>
			<Navbar cartCount={cartCount} cartItems={cartItems} />
			<Routes>
				<Route
					path="/"
					element={
						<div className="flex space-x-5">
							<div className="w-1/5">
								<Menu
									category={category}
									selected={selected}
									handleSel={handleSel}
									loading={Loading}
								/>
							</div>
							<div className="flex-1">
								<Items
									items={currentItems}
									pages={noOfPages}
									handlePage={handlePage}
									handleSearch={handleSearch}
									handleCart={handleCart}
									loading={Loading}
								/>
							</div>
						</div>
					}
				/>
				<Route
					path="/cart"
					element={
						<Cart
							cartItems={cartItems}
							handleInc={handleInc}
							handleDec={handleDec}
							handleDel={handleDel}></Cart>
					}
				/>
				<Route path="/Admin" element={<Admin />} />
				<Route
					path="/admin/Menu-Items"
					element={
						<ManageItems
							category={category}
							items={allItems}
							handleDelProd={handleDelProd}
							handleUpdateProd={handleUpdateProd}
						/>
					}
				/>
				<Route path="/admin/add-item" element={<AddItem />} />
				<Route path="*" element={<Navigate to="/" />} />
			</Routes>
		</>
	);
}

export default App;
