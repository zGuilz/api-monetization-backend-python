import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, CardImage } from "@material-tailwind/react";
import { useGlobalState, setAlert } from "../store";
import { payWithEthers } from "../shared/ApiMonetization";

const Product = () => {
  const { id } = useParams();
  const [products, setProduct] = useState([]);
  const [buyer] = useGlobalState("connectedAccount");

  const handlePayWithEthers = (product) => {
    const item = {
      ...product,
      buyer,
      account: "0xC7df22411B80CA9EF708e2C48CA40Afabd764D73",
    };
    console.log(item);
    payWithEthers(item).then((res) => {
      if (res) setAlert("Vendido");
    });
  };

  const toCurrency = (num) =>
    num.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });

  useEffect(() => {
    setProduct([
      {
        imgURL:
          "https://www.outsystems.com/Forge_CW/_image.aspx/Q8LvY--6WakOw9afDCuuGR0Y7ssHcAhkEbEL8USHCjY=/viacep-enderecos-do-brasil-2022-09-20%2000-00-00-2022-09-27%2011-12-41",
        qty: 1,
        name: "viacep",
        price: 5,
      },
    ]);
  }, [id]);

  return (
    <div className="product">
      {products.map((product) => {
        return (
          <div className="flex flex-wrap justify-start items-center p-10">
            <div className="mt-4 w-64">
              <CardImage src={product.imgURL} alt={product.name} />
            </div>

            <div className="mt-4 lg:mt-0 lg:row-span-6 mx-4">
              <div>
                <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
                  {product.name}
                </h1>
                <h2 className="sr-only">Product information</h2>
                <div className="flex flex-row justify-start items-center">
                  <span className="text-xl font-bold text-green-500">
                    {toCurrency(product.price)}
                  </span>
                  <span className="text-xs mx-4">
                    {product.stock} left in stock
                  </span>
                </div>

                <div className="mt-2 space-y-6">
                  <p className="text-base text-gray-900">
                    {product.description}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex flex-row justify-start items-center space-x-2">
                <Button
                  onClick={() => {
                    handlePayWithEthers(product);
                  }}
                  color="amber"
                  size="md"
                  ripple="light"
                >
                  Buy with ETH
                </Button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Product;
