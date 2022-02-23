import React from "react";

const UserPageById = (props) => {
	return (
		<div>
			<h1>UserPageById</h1>
			<p>{props.id}</p>
		</div>
	);
};

export default UserPageById;

export const getServerSideProps = async (context) => {
	const { params } = context;

	const userid = params.uid;

	return {
		props: {
			id: `userId : ${userid}`
		}
	};
};
