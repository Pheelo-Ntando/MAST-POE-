import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useMenu } from './MenuContext'; 

const FilterPage = () => {
  const { menuItems } = useMenu(); 
  const [filteredItems, setFilteredItems] = useState(menuItems);

  
  const filterByCourse = (course: string) => {
    const filtered = menuItems.filter((item) => item.course === course);
    setFilteredItems(filtered);
  };

  
  const resetFilter = () => {
    setFilteredItems(menuItems);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Filter Menu Items</Text>

      {/* Filter Buttons */}
      <View style={styles.filterButtonsContainer}>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => filterByCourse('Starters')}
        >
          <Text style={styles.filterButtonText}>Starters</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => filterByCourse('Main Course')}
        >
          <Text style={styles.filterButtonText}>Main Course</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => filterByCourse('Dessert')}
        >
          <Text style={styles.filterButtonText}>Desserts</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.resetButton} onPress={resetFilter}>
          <Text style={styles.filterButtonText}>Reset</Text>
        </TouchableOpacity>
      </View>

      {/* Filtered Results */}
      <FlatList
        data={filteredItems}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#e3f2fd', 
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
    color: '#0d47a1',
  },
  filterButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  filterButton: {
    flex: 1,
    padding: 10,
    backgroundColor: '#64b5f6', 
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  resetButton: {
    flex: 1,
    padding: 10,
    backgroundColor: '#ffab00', 
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  filterButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  item: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    elevation: 2,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  details: {
    fontSize: 14,
    color: '#666',
  },
});

export default FilterPage;
