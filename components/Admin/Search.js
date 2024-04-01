import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Search = ({ users, setFilteredUsers }) => {
  const handleSearch = (event) => {
    const searchQuery = event.target.value.toLowerCase();
    const filteredResults = users.filter((user) =>
      user.userRegistration?.username.toLowerCase().includes(searchQuery)
    );
    setFilteredUsers(filteredResults);
  };

  return (
    <div className="search-container relative">
      <input
        type="text"
        placeholder="Search users..."
        id="search-input"
        onChange={handleSearch}
        className="border border-gray-300 rounded-md px-3 py-1 pl-8 outline-none focus:border-2 focus:border-blue-500"
      />
      <span className="absolute inset-y-0 left-0 pl-2 flex items-center">
        <FontAwesomeIcon icon={faSearch} className="text-gray-500" />
      </span>
       {/* add cancel button */}
       <button className="absolute inset-y-0 right-0 pr-2 flex items-center"
       onClick={() =>
        {
          setFilteredUsers(users);
          document.getElementById("search-input").value = "";
        }
        }>
       <FontAwesomeIcon icon={faTimes} className="text-gray-500" />
       </button>

    </div>
  );
};

export default Search;
