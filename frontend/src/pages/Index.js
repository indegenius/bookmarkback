import {useState} from "react"
import {Link} from "react-router-dom"

function Index(props) {
  // state to hold formData
  const [newForm, setNewForm] = useState({
    title: "",
    url: "",
    //countryOfOrigin: "",
  });

  // handleChange function for form
  const handleChange = (event) => {
    setNewForm({ ...newForm, [event.target.name]: event.target.value });
  };

  // handle submit function for form
  const handleSubmit = (event) => {
    event.preventDefault();
    props.createCheese(newForm);
    setNewForm({
      title: "",
      url: "",
      //countryOfOrigin: "",
    });
  };

  // loaded function
  const loaded = () => {
    return props.cheese.map((cheeseon) => (
      <div key={cheeseon._id} className="cheeseon">
        <Link to={`/cheese/${cheeseon._id}`}>
          <h1>{cheeseon.title}</h1>
        </Link>
        <img src={cheeseon.url} alt={cheeseon.title} />
        <h3>{cheeseon.countryOfOrigin}</h3>
      </div>
    ));
  };

  const loading = () => {
    if (props.cheese){
        return props.cheese.map((cheeseon) => {
            return <div key={cheeseon._id} className="cheeseon">
                <Link to={`/cheese/${cheeseon._id}`}>
                    <h1>{cheeseon.title}</h1>
                </Link>
                <img src={cheeseon.url} alt={cheeseon.title}/>
                <h3>{cheeseon.countryOfOrigin}</h3>
            </div>
        })
    } else {
    return <h1>Loading...</h1>; 
    }
  };
  return (
    <section>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newForm.title}
          name="title"
          placeholder="title"
          onChange={handleChange}
        />
        <input
          type="text"
          value={newForm.url}
          name="url"
          placeholder="url URL"
          onChange={handleChange}
        />
        
        <input type="submit" value="Create Bookmark" />
      </form>
      {props.cheese ? loaded() : loading()}
    </section>
  );
}

export default Index;