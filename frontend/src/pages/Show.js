import { useState } from "react";
import {useParams, useNavigate} from "react-router-dom"

function Show(props) {
  const params = useParams()
  const navigate = useNavigate()
  const id = params.id;
  const cheese = props.cheese;
  const cheeseon = cheese.find((p) => p._id === id);

  const [editForm, setEditForm] = useState(cheeseon);

  // handleChange function for form
  const handleChange = (event) => {
    setEditForm({ ...editForm, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.updateCheese(editForm);
    navigate("/");
  };

  const removeCheeseon = () => {
    props.deleteCheese(cheeseon._id);
    navigate("/");
  };

  return (
    <div className="cheeseon">
      <h1>{cheeseon.name}</h1>
      <h2>{cheeseon.countryOfOrigin}</h2>
      <img src={cheeseon.image} alt={cheeseon.name} />
      <button id="delete" onClick={removeCheeseon}>
        DELETE
      </button>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={editForm.name}
          name="name"
          placeholder="name"
          onChange={handleChange}
        />
        <input
          type="text"
          value={editForm.image}
          name="image"
          placeholder="image URL"
          onChange={handleChange}
        />
        <input
          type="text"
          value={editForm.countryOfOrigin}
          name="countryOfOrigin"
          placeholder="countryOfOrigin"
          onChange={handleChange}
        />
        <input type="submit" value="Update Cheeseon" />
      </form>
    </div>
  );
}

export default Show;