import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Index from "../pages/Index";
import Show from "../pages/Show";

function Main(props) {
  const [cheese, setCheese] = useState(null);

  const URL = "https://cheesepenguin.herokuapp.com/cheese/";

  const getCheese = async () => {
    const response = await fetch(URL);
    const data = await response.json();
    setCheese(data);
  };

  // function that will later be passed data from our new/create form and make the post request to create a new cheeseon
  const createCheese = async (cheeseon) => {
    // make the post request to our API
    await fetch(URL, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(cheeseon)
    })

    // get updated list of Cheese
    getCheese()
}

  // function to update a cheeseon
  const updateCheese = async (cheeseon, id) => {
    // make the put request
    await fetch(URL + id, {
        method: "put",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(cheeseon)
    })
    // update the list of Cheese
    getCheese()
}

// create function to delete a cheeseon
const deleteCheese = async (id) => {
    // make the delete request
    await fetch(URL + id, {
        method: "delete"
    })
    // update the list of Cheese
    getCheese()
}

  useEffect(() => getCheese(), []);

  return (
    <main>
      <Routes>
        <Route path="/" element={
          <Index cheese={cheese} 
            createCheese={createCheese}
          />
        }/>
        <Route path="/cheese/:id" element={
          <Show 
          cheese={cheese} 
          updateCheese={updateCheese} 
          deleteCheese={deleteCheese}
          />
        }/>
      </Routes>
    </main>
  );
}

export default Main;