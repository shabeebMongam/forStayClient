import { Link } from "react-router-dom";
import "./searchItem.css";

const SearchItem = ({ hotelData }) => {
  return (
    <div className="searchItem">
      {/* {hotel.imaged[0]} */}
      <img src={hotelData.images[0]} alt="" className="siImg" />
      <div className="siDesc">
        <h1 className="siTitle">{hotelData.name}</h1>
        <span className=" siSubtitle">
          {hotelData.district}, {hotelData.city}
        </span>
      </div>
      <div className="siDetails">
        <div className="siRating">
        
        </div>
        <div className="siDetailTexts">
            <Link to={`/hotel/${hotelData._id}`}>
            <button className="siCheckButton "> SHOW  </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
