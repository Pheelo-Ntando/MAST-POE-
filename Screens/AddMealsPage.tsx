import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import { TextInput, Button, Card } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import { useMenu } from './MenuContext'; 

const AddMealsPage = () => {
    const [mealName, setMealName] = useState('');
    const [mealPrice, setMealPrice] = useState('');
    const [mealCategory, setMealCategory] = useState(null);

    const [open, setOpen] = useState(false);
    const [categories, setCategories] = useState([
        { label: 'Main Course', value: 'Main Course' },
        { label: 'Dessert', value: 'Dessert' },
        { label: 'Starter', value: 'Starter' },
    ]);

    const { menuItems, addMeal, removeMeal } = useMenu(); 

    const handleAddMeal = () => {
        if (!mealName || !mealPrice || !mealCategory) {
            alert('Please fill all fields!');
            return;
        }

        const newMeal = {
            id: Math.random().toString(),
            name: mealName,
            course: mealCategory, 
            price: parseFloat(mealPrice),
        };

        addMeal(newMeal);
        setMealName('');
        setMealPrice('');
        setMealCategory(null);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Add a Meal</Text>
            <TextInput
                label="Meal Name"
                value={mealName}
                onChangeText={setMealName}
                style={styles.input}
            />
            <TextInput
                label="Price (R)"
                value={mealPrice}
                onChangeText={setMealPrice}
                keyboardType="numeric"
                style={styles.input}
            />
            <DropDownPicker
                open={open}
                value={mealCategory}
                items={categories}
                setOpen={setOpen}
                setValue={setMealCategory}
                setItems={setCategories}
                placeholder="Select a Category"
                style={styles.dropdown}
                dropDownContainerStyle={styles.dropdownContainer}
            />
            <Button mode="contained" onPress={handleAddMeal} style={styles.button}>
                Add Meal
            </Button>

            <Text style={styles.subtitle}>Added Meals</Text>
            <FlatList
                data={menuItems}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Card style={styles.card}>
                        <Card.Title
                            title={`${item.name} (R${item.price.toFixed(2)})`}
                            subtitle={item.course}
                        />
                        <Card.Actions>
                            <Button onPress={() => removeMeal(item.id)}>Remove</Button>
                        </Card.Actions>
                    </Card>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 18,
        fontWeight: '600',
        marginTop: 20,
        marginBottom: 10,
    },
    input: {
        marginBottom: 15,
    },
    dropdown: {
        marginBottom: 15,
        borderColor: '#ccc',
        borderWidth: 1,
    },
    dropdownContainer: {
        borderColor: '#ccc',
    },
    button: {
        marginTop: 10,
    },
    card: {
        marginBottom: 10,
        backgroundColor: '#ffffff',
        borderRadius: 8,
    },
});

export default AddMealsPage;
