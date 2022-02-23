import fs from "fs";
import path from "path";
import { Fragment } from "react/cjs/react.production.min";

const ProductById = (props) => {
	const { loadedProduct } = props;

	// by url got this error and fallback to true
	if (!loadedProduct) {
		return <p>Loading....!!</p>;
	}

	return (
		<Fragment>
			<h1>{loadedProduct.title}</h1>
			<p>{loadedProduct.description}</p>
		</Fragment>
	);
};

const getData = async () => {
	const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
	const jsonData = fs.readFileSync(filePath);

	const data = JSON.parse(jsonData);

	return data;
};

export const getStaticProps = async (context) => {
	const data = await getData();
	const { params } = context;
	const productId = params.pid;
	const product = data.products.find((product) => product.id === productId);

	if (!product) {
		return {
			notFound: true
		};
	}

	if (data.products.length === 0) {
		return {
			notFound: true
		};
	}

	if (!data) {
		return {
			redirect: {
				destination: "/no-data"
			}
		};
	}

	return {
		props: {
			loadedProduct: product
		},
		revalidate: 10
	};
};

export const getStaticPaths = async () => {
	const data = await getData();
	const ids = data.products.map((product) => product.id);

	// paths: [{ params: { pid: "p1" } }],
	const paths = ids.map((id) => ({ params: { pid: id } }));

	return {
		paths: paths,
		fallback: true // this must be true(</) false(X) or blocking(if u don't want to add some instent loading in dynamic page)
	};
};

export default ProductById;
