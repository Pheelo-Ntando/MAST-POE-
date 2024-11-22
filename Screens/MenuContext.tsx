import React, { createContext, useState, useContext, ReactNode } from 'react';


interface MenuItem {
    id: string;
    name: string;
    course: string;
    price: number;
}


interface MenuContextValue {
    menuItems: MenuItem[];
    addMeal: (meal: MenuItem) => void;
    removeMeal: (id: string) => void;
    clearMenu: () => void;
    editMeal: (id: string, updatedMeal: Partial<MenuItem>) => void; 
}


export const MenuContext = createContext<MenuContextValue | undefined>(undefined);


export const MenuProvider = ({ children }: { children: ReactNode }) => {
    const [menuItems, setMenuItems] = useState<MenuItem[]>([
        { id: '1', name: 'Pizza', course: 'Main Course', price: 100 },
        { id: '2', name: 'Burger', course: 'Main Course', price: 90 },
        { id: '3', name: 'Wings', course: 'Dessert', price: 80 },
        { id: '4', name: 'Cheesecake', course: 'Dessert', price: 70 },
        { id: '5', name: 'Onion Rings', course: 'Starters', price: 60 },
        { id: '6', name: 'Red Velvet', course: 'Starters', price: 50 },
    ]);

    
    const addMeal = (meal: MenuItem) => {
        setMenuItems((prev) => [...prev, meal]);
    };

    
    const removeMeal = (id: string) => {
        setMenuItems((prev) => prev.filter((meal) => meal.id !== id));
    };

    
    const clearMenu = () => {
        setMenuItems([]);
    };

    
    const editMeal = (id: string, updatedMeal: Partial<MenuItem>) => {
        setMenuItems((prev) =>
            prev.map((meal) =>
                meal.id === id ? { ...meal, ...updatedMeal } : meal
            )
        );
    };

    return (
        <MenuContext.Provider
            value={{ menuItems, addMeal, removeMeal, clearMenu, editMeal }}
        >
            {children}
        </MenuContext.Provider>
    );
};


export const useMenu = () => {
    const context = useContext(MenuContext);
    if (!context) {
        throw new Error('useMenu must be used within a MenuProvider');
    }
    return context;
};
