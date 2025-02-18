import {useState, useEffect} from 'react'
import Header from '../Header'
import DishItem from '../DishItem'
import './index.css'

const Home = () => {
  const [data, setData] = useState([])
  const [activeTabID, setActiveTabId] = useState('')
  const [cartItems, setCartItem] = useState([])

  const addItemToCart = dish => {
    const isItemInCart = cartItems.find(
      item => item.menuCategoryId === dish.dishId,
    )

    if (!isItemInCart) {
      const newDish = {...dish, quantity: 1}
      setCartItem(prev => [...prev, newDish])
    } else {
      setCartItem(prev =>
        prev.map(item =>
          item.dishId === dish.dishId
            ? {...item, quantity: item.quantity + 1}
            : item,
        ),
      )
    }
  }

  const removeItemFromCart = dish => {
    const isItemInCart = cartItems.find(
      item => item.menuCategoryId === dish.dishId,
    )

    if (isItemInCart) {
      setActiveTabId(prev =>
        prev
          .map(item =>
            item.dishId === dish.dishId
              ? {...item, quantity: item.quantity - 1}
              : item,
          )
          .filter(item => item.quantity > 0),
      )
    }
  }

  const getDataFromApi = async () => {
    const url =
      'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details'
    const response = await fetch(url)

    const fetchedData = await response.json()
    const parsedData = fetchedData[0].table_menu_list.map(eachTab => ({
      menuCategory: eachTab.menu_category,
      menuCategoryId: eachTab.menu_category_id,
      menuCategoryImage: eachTab.menu_category_image,
      categoryDishes: eachTab.category_dishes.map(each => ({
        dishId: each.dish_id,
        dishName: each.dish_name,
        dishPrice: each.dish_price,
        dishImage: each.dish_image,
        dishCurrency: each.dish_currency,
        dishCalories: each.dish_calories,
        dishDescription: each.dish_description,
        dishAvailability: each.dish_Availability,
        dishType: each.dish_Type,
        addOnCat: each.addonCat,
      })),
    }))

    setData(parsedData)
    setActiveTabId(parsedData[0].menuCategoryId)
  }

  useEffect(() => {
    getDataFromApi()
  }, [])

  const updateActiveTabId = menuCategoryId => {
    setActiveTabId(menuCategoryId)
  }

  const renderDishes = () => {
    const category = data.find(each => each.menuCategoryId === activeTabID)

    if (category !== undefined) {
      console.log(category)
      console.log(category.categoryDishes)
      console.log(category.menuCategory)
      return (
        <ul className="dishes-list">
          {category.categoryDishes.map(eachDish => (
            <DishItem
              key={eachDish.dishId}
              dishDetails={eachDish}
              addItemToCart={addItemToCart}
              removeItemFromCart={removeItemFromCart}
              cartItems={cartItems}
            />
          ))}
        </ul>
      )
    }
  }

  const renderTabsMenuList = () =>
    data.map(each => {
      const onClickTab = () => updateActiveTabId(each.menuCategoryId)
      return (
        <li
          className={`${
            each.menuCategoryId === activeTabID ? 'active-tab-id' : ''
          }`}
          key={each.menuCategoryId}
          onClick={onClickTab}
        >
          <button className="tab-button" type="button">
            {each.menuCategory}
          </button>
        </li>
      )
    })

  return (
    <div className="home-container">
      <Header />
      <hr className="line" />
      <ul className="tabs-list">{renderTabsMenuList()}</ul>
      <hr className="line-2" />
      {renderDishes()}
    </div>
  )
}

export default Home


