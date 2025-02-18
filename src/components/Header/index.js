import {AiOutlineShoppingCart} from 'react-icons/ai'
import './index.css'

const Header = () => (
  <div className="header">
    <h1 className="logo">UNI Resto Cafe</h1>
    <div className="cart-container">
      <h1 className="my-orders-text">My Orders</h1>
      <AiOutlineShoppingCart className="cart-icon" />
    </div>
  </div>
)

export default Header
