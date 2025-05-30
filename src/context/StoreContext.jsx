import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const url = "http://localhost:4000";
    const [token, setToken] = useState("");
    const [userId, setUserId] = useState("");
    const [cartItems, setCartItems] = useState({});
    const [food_list, setFoodList] = useState([]);

    // Fetch food items from backend
    const fetchFoodList = async () => {
        try {
            const response = await fetch(`${url}/api/food/list`);
            const data = await response.json();
            if (data.success) {
                setFoodList(data.foods);
            } else {
                console.error("Failed to fetch food items:", data.message);
            }
        } catch (error) {
            console.error("Error fetching food list:", error);
        }
    };

    // Fetch user's cart items from backend
    const fetchCartItems = async () => {
        try {
            if (!userId) return;
            const response = await axios.post(`${url}/api/cart/get`, { userId });
            if (response.data.success) {
                setCartItems(response.data.cartData || {});
            } else {
                console.warn("No cart data found");
            }
        } catch (error) {
            console.error("Error fetching cart:", error);
        }
    };

    // Add item to cart (frontend and backend)
    const addToCart = async (itemId) => {
        setCartItems(prev => ({
            ...prev,
            [itemId]: (prev[itemId] || 0) + 1
        }));

        if (!token || !userId) return;

        try {
            await axios.post(`${url}/api/cart/add`, {
                userId,
                itemId,
                quantity: 1
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                }
            });
        } catch (error) {
            console.error("Error adding to backend cart:", error.response?.data || error.message);
        }
    };

    // Remove item from cart (frontend and backend)
    const removeFromCart = async (itemId) => {
        setCartItems(prev => {
            const updated = { ...prev };
            if (updated[itemId] > 1) {
                updated[itemId] -= 1;
            } else {
                delete updated[itemId];
            }
            return updated;
        });

        if (!token || !userId) return;

        try {
            await axios.post(`${url}/api/cart/remove`, {
                userId,
                itemId
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        } catch (error) {
            console.error("Error removing from backend cart:", error.response?.data || error.message);
        }
    };

    // Get total cart amount
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                const itemInfo = food_list.find(product => product._id === item);
                if (itemInfo) {
                    totalAmount += itemInfo.price * cartItems[item];
                }
            }
        }
        return totalAmount;
    };

    // Initial data load
    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        const storedUserId = localStorage.getItem("userId");
        if (storedToken) setToken(storedToken);
        if (storedUserId) setUserId(storedUserId);
        fetchFoodList();
    }, []);

    // Fetch cart when userId is available
    useEffect(() => {
        if (userId) fetchCartItems();
    }, [userId]);

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken,
        userId,
        setUserId
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
