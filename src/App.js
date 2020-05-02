import React, { useState, useEffect } from 'react';
import { csv } from 'd3';
import data from './data.csv';
import RestaurantList from './components/RestaurantList';

function App() {
  const [restaurant_data, setRestData] = useState([]);
  const [cuisines, setCuisines] = useState([]);
  useEffect(() => {
    csv(data).then(data => {
      console.log(data);
      let cuisineSet = new Set();
      cuisineSet.add('All Types of cuisine')
      data.forEach(restaurant => {
        var cus = restaurant.Cuisines.split(",").map(item => item.trim());
        cus.forEach(type => {
          if (type !== "") {
            cuisineSet.add(type);
          }

        })

      })
      setRestData(data);
      setCuisines([...cuisineSet])

    })
  }, []);
  return (
    <div>
      <RestaurantList cuisines={cuisines} restData={restaurant_data} />
    </div>
  )
}


export default App;