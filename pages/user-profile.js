import React from "react";

const UserProfile = (props) => {
	const { userName } = props;
	return (
		<div>
			<h1>UserProfile</h1>
			<p>{userName}</p>
		</div>
	);
};

export default UserProfile;

export const getServerSideProps = async (context) => {
	const { params, req, res } = context;

	return {
		props: {
			userName: "Anmol"
		}
	};
};
