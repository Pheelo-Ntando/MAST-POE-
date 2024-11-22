import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useMenu } from './MenuContext'; 

const HomePage = () => {
    const { menuItems } = useMenu(); 
    
    const calculateAverage = (course: string) => {
        const filtered = menuItems.filter((item) => item.course === course);
        const total = filtered.reduce((sum, item) => sum + item.price, 0);
        return filtered.length > 0 ? (total / filtered.length).toFixed(2) : '0.00';
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>The Chef App</Text>
            <Text style={styles.subheading}>Menu</Text>

            <FlatList
                data={menuItems}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Text style={styles.name}>{item.name}</Text>
                        <Text style={styles.details}>
                            {item.course} - R{item.price.toFixed(2)}
                        </Text>
                    </View>
                )}
            />

            <View style={styles.averageContainer}>
                <Text style={styles.averageText}>
                    Average Price (Starters): R{calculateAverage('Starters')}
                </Text>
                <Text style={styles.averageText}>
                    Average Price (Main Course): R{calculateAverage('Main Course')}
                </Text>
                <Text style={styles.averageText}>
                    Average Price (Desserts): R{calculateAverage('Dessert')}
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 10,
    },
    subheading: {
        fontSize: 18,
        fontWeight: '600',
        marginVertical: 10,
    },
    item: {
        marginBottom: 10,
        padding: 10,
        backgroundColor: '#f9f9f9',
        borderRadius: 5,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    details: {
        fontSize: 14,
        color: '#666',
    },
    averageContainer: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#e9e9e9',
        borderRadius: 5,
    },
    averageText: {
        fontSize: 16,
        fontWeight: '500',
        marginVertical: 5,
    },
});

export default HomePage;
