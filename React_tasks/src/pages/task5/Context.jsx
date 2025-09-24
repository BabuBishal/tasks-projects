import HelloWorld from "../../components/HelloWorld";
import "../../styles/pages/Context.css";
import { useCartContext } from "../../context/CartContextProvider";
import useFetchData from "../../hooks/useFetchData";
import ProductCard from "../../components/ProductCard";
import OrderItem from "../../components/OrderItem";

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
  const { state, dispatch } = useCartContext();
  const { data, loading, error } = useFetchData(
    "https://fakestoreapi.com/products"
  );
  // console.log("data", data);
  // console.log("state", state);
  return (
    <>
      <div className="context">
        <HelloWorld title="Task 4: Context Api" description="" />
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
          <div className="cart-wrapper">
            <div className="cart-container">
              <h4 className="cart-title">Cart Items</h4>
              {!!state.cart.length ? (
                state?.cart.map((item) => (
                  <OrderItem
                    key={item.id}
                    item={item}
                    onRemove={() => {
                      dispatch({
                        type: "remove_from_cart",
                        payload: { id: item.id },
                      });
                    }}
                  />
                ))
              ) : (
                <div>No items in cart</div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* <div className="modal-backdrop"></div> */}
    </>
  );
};

export default Context;
