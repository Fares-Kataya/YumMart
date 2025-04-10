import React from 'react'

export default function CheckModal({ prodName, itemID, onConfirm }) {
    const handleYesClick = () => {
		onConfirm(true);
		document.getElementById("my_modal_5").close();
	};

	const handleNoClick = () => {
		onConfirm(false);
		document.getElementById("my_modal_5").close();
	};
	return (
		<>
			{/* Open the modal using document.getElementById('ID').showModal() method */}
			<dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
				<div className="modal-box">
					<h3 className="font-bold text-lg">{prodName}</h3>
					<p className="py-4 font-bold">
						Are you sure you want to delete this product?
					</p>
					<div className="modal-action flex justify-around gap-5 w-full">
						<form method="dialog">
							<button className="btn btn-primary" onClick={handleYesClick}>
								Yes
							</button>
							{/* if there is a button in form, it will close the modal */}
							<button className="btn bg-red-600" onClick={handleNoClick}>
								No
							</button>
						</form>
					</div>
				</div>
			</dialog>
		</>
	);
}
