import {AiOutlinePlus, AiOutlineMinus} from 'react-icons/ai'
import './index.css'

const DishItem = ({
  dishDetails,
  addItemToCart,
  removeItemFromCart,
  cartItems,
}) => {
  const {
    dishId,
    dishName,
    dishPrice,
    dishImage,
    dishCurrency,
    dishCalories,
    dishDescription,
    dishAvailability,
    dishType,
    addOnCat,
  } = dishDetails

  const onIncreaseQuantity = () => addItemToCart(dishDetails)
  const onDecreaseQuantity = () => removeItemFromCart(dishDetails)

  const getQuantity = () => {
    const cartItem = cartItems.find(each => each.dishId === dishId)
    return cartItem ? cartItem.quantity : 0
  }

  const renderDishAvailability = () => {
    if (dishAvailability === true) {
      return (
        <div className="add-remove-container">
          <button
            className="add-remove-button"
            type="button"
            onClick={onDecreaseQuantity}
          >
            <AiOutlineMinus className="add-remove-icon" />
          </button>
          <p>{getQuantity()}</p>
          <button
            type="button"
            className="add-remove-button"
            onClick={onIncreaseQuantity}
          >
            <AiOutlinePlus className="add-remove-icon" />
          </button>
        </div>
      )
    }
    return <p>Not available</p>
  }

  const renderVegNonVeg = () => {
    const box = dishType === 2 ? 'veg-box' : 'non-veg-box'
    const circle = dishType === 2 ? 'veg-circle' : 'non-veg-circle'
    console.log(dishType)

    return (
      <div className={`${box}`}>
        <div className={`${circle}`}> </div>
      </div>
    )
  }

  return (
    <>
      <li className="dish-item" key={dishId}>
        <div className="first-box">
          {renderVegNonVeg()}
          <div className="dish-details">
            <h1 className="dish-name">{dishName}</h1>
            <p className="price-currency">
              {dishCurrency} {dishPrice}
            </p>
            <p className="description">{dishDescription}</p>
            {renderDishAvailability()}
            {addOnCat.length > 0 ? (
              <p className="addons">Customizations available</p>
            ) : (
              ''
            )}
          </div>
        </div>
        <p className="calories">{dishCalories} calories</p>
        <img src={dishImage} alt={dishName} className="dish-image" />
      </li>
    </>
  )
}

export default DishItem
