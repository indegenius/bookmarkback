import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Index from "../pages/Index";
import Show from "../pages/Show";

function Main(props) {
  const [bookmark, setBookmark] = useState(null);

  const URL = "https://groupbookmark.herokuapp.com/bookmark/";

  const getBookmark = async () => {
    const response = await fetch(URL);
    const data = await response.json();
    setBookmark(data);
  };

  // function that will later be passed data from our new/create form and make the post request to create a new bookmarkon
  const createBookmark = async (bookmarkon) => {
    // make the post request to our API
    await fetch(URL, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(bookmarkon)
    })

    // get updated list of Bookmark
    getBookmark()
}

  // function to update a bookmarkon
  const updateBookmark = async (Bookmarkon, id) => {
    // make the put request
    await fetch(URL + id, {
        method: "put",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(bookmarkon)
    })
    // update the list of Bookmark
    getBookmark()
}

// create function to delete a Bookmarkon
const deleteBookmark = async (id) => {
    // make the delete request
    await fetch(URL + id, {
        method: "delete"
    })
    // update the list of Bookmark
    getBookmark()
}

  useEffect(() => getBookmark(), []);

  return (
    <main>
      <Routes>
        <Route path="/" element={
          <Index bookmark={bookmark} 
            createBookmark={createBookmark}
          />
        }/>
        <Route path="/bookmark/:id" element={
          <Show 
          bookmark={bookmark} 
          updateBookmark={updateBookmark} 
          deleteBookmark={deleteBookmark}
          />
        }/>
      </Routes>
    </main>
  );
}

export default Main;