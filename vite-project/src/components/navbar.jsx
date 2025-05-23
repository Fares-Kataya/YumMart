import React from 'react'
import profileImg from '../assets/profile.png';
import { useNavigate } from "react-router-dom";
export default function Navbar({ cartCount, cartItems }) {
  const navigate = useNavigate();

  const goToCart = () => {
			navigate("/cart", { state: { cartItems } });
  };
  const goToAdmin = () => {
    navigate("/admin")
  }
  const goToHome = () => {
		navigate("/");
	};
  return (
		<div className="navbar bg-base-100 shadow-sm">
			<div className="flex-1">
				<a className="btn btn-ghost text-4xl font-extrabold">YumMart</a>
			</div>
			<div className="flex-1/100">
				<div className="flex gap-5">
					<a className="btn btn-ghost text-xl font-bold underline btn-active" onClick={goToHome}>
						Home
					</a>
					<a className="btn btn-ghost text-xl font-normal" onClick={goToAdmin}>
						Admin
					</a>
					<a className="btn btn-ghost text-xl font-normal">About</a>
				</div>
			</div>
			<div className="flex-none gap-3">
				<div className="dropdown dropdown-end">
					<button className="btn btn-ghost btn-circle">
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
								d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
							/>{" "}
						</svg>
					</button>
					<button className="btn btn-ghost btn-circle">
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
									d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
								/>{" "}
							</svg>
							<span className="badge badge-xs badge-primary indicator-item"></span>
						</div>
					</button>
					<div
						tabIndex={0}
						role="button"
						className="btn btn-ghost btn-circle"
						onClick={goToCart}>
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
							<span className="badge badge-xs badge-primary indicator-item">
								{cartCount}
							</span>
						</div>
					</div>
					<div
						tabIndex={0}
						className="card card-compact dropdown-content bg-base-100 z-1 mt-3 w-52 shadow">
						<div className="card-body">
							<span className="text-lg font-bold">8 Items</span>
							<span className="text-info">Subtotal: $999</span>
							<div className="card-actions">
								<button className="btn btn-primary btn-block">View cart</button>
							</div>
						</div>
					</div>
				</div>
				<div className="dropdown dropdown-end">
					<div
						tabIndex={0}
						role="button"
						className="btn btn-ghost btn-circle avatar">
						<div className="w-8 rounded-full">
							<img alt="Tailwind CSS Navbar component" src={profileImg} />
						</div>
					</div>
					<ul
						tabIndex={0}
						className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
						<li>
							<a className="justify-between">
								Profile
								<span className="badge">New</span>
							</a>
						</li>
						<li>
							<a>Settings</a>
						</li>
						<li>
							<a>Logout</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
}
