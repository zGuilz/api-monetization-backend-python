import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Button, CardImage } from '@material-tailwind/react'
import { useGlobalState, setAlert } from '../store'
import { payWithEthers } from '../shared/ApiMonetization'

const Product = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(
    []
    )
  const [buyer] = useGlobalState('connectedAccount')
  const [ethToUsd] = useGlobalState('ethToUsd')

  const handlePayWithEthers = () => {
    const item = { ...product, buyer, price: 0 , account: '0x7a0ad64A592EA533C911A063228CfE00BE1C688A'}
    console.log(item)
    payWithEthers(item).then((res) => {
        if (res) setAlert('Vendido')
    })
  }

  const toCurrency = (num) =>
    num.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    })

    useEffect(() => {
        setProduct({ imgURL: 'https://images.emojiterra.com/google/android-11/512px/1f9f8.png', qty: 1, name: 'UrsinhoAPI', price: 3 })
      }, [id])

  return (
    <div className="product">
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
                  {toCurrency(3)}
                </span>
                <span className="text-xs mx-4">
                  {product.stock} left in stock
                </span>
              </div>

              <div className="mt-2 space-y-6">
                <p className="text-base text-gray-900">{product.description}</p>
              </div>
            </div>

            <div className="mt-4 flex flex-row justify-start items-center space-x-2">
                    <Button
                      onClick={handlePayWithEthers}
                      color="amber"
                      size="md"
                      ripple="light"
                    >
                      Buy with ETH
                </Button>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Product