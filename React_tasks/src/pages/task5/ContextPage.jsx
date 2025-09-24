import HelloWorld from "../../components/HelloWorld";
import "../../styles/pages/Context.css";
import { useCartContext } from "../../context/CartContextProvider";
import useFetchData from "../../hooks/useFetchData";
import ProductCard from "../../components/ProductCard";
import OrderItem from "../../components/OrderItem";
import { STORE_API_URL } from "../../@utils/constants";

// const cardData = [
//   { title: "Hello", subtitle: "Mr. XYZ", price: 100 },
//   {
//     title: "World",
//     subtitle: "Mr. ABC",
//     price: 200,
//   },
//   { title: "Test", subtitle: "Mr. Test", price: 150 },
// ];

const Context = () => {
  const { dispatch } = useCartContext();
  const { data, loading, error } = useFetchData(STORE_API_URL);

  // console.log("data", data);
  // console.log("state", state);
  return (
    <div className="context">
      <HelloWorld
        title="Task 5/6/7: Context Api / Data Fetching / Custom Hooks / Portals"
        description="Simple add to cart functionality"
      />
      <div className="context-body">
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error fetching data</div>
        ) : (
          <div className="products-container">
            {data?.map((product) => (
              <ProductCard
                key={product.id + product.title}
                img={product.image}
                title={product.title}
                category={product.category}
                price={product.price}
                onAddToCart={() =>
                  dispatch({
                    type: "add_to_cart",
                    payload: {
                      id: product.id,
                      title: product.title,
                      price: product.price,
                      img: product.image,
                    },
                  })
                }
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Context;
