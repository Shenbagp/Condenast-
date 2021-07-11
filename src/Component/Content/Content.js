import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import "./Content.css";
import * as Constant from "./../../constants";
import Footer from "./../Footer/Footer";
import ReactTooltip  from "react-tooltip";
import * as utility from "./../../Utilities/Utility"

const Content = ( ) => {
  const [newsList, setNewsList] = useState([]);

  useEffect(() => {
    let uri = `https://newsapi.org/v2/everything?q=tesla&from=${moment().format(
      "YYYY-MM-DD"
    )}&sortBy=publishedAt&apiKey=${Constant.key}`;
    console.log(uri);
    axios
      .get(uri)
        .then((response) => {
            response &&
            response.data &&
            response.data.articles &&
            response.data.articles.length > 0 &&
            setNewsList(response.data.articles);
      });
  }, []);

  const displayNews = (newsList) => {
    return (
      <div className="content">
        {newsList.map((list,index) => {
          return (
            <div key={uuidv4()} className="card__display">
              <a href={list.url} className="image__link ">
                <img
                  src={list.urlToImage}
                  alt={list.content}
                  style={{ width: "100%", height: "250px" }}
                />
              </a>
              <div className="content__description">
                <a href={list.url}> 
                  <div>                    
                   {utility.ellipses(list.description)}  
                  </div>
                </a>
              </div>
             
              <div className="date__details">
                {" "}
                {moment(list.publishedAt).format("MMM DD YYYY")}{" "}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div>
      {newsList && newsList.length > 0 && displayNews(newsList)}
      {newsList && newsList.length > 0 && <Footer />}
    </div>
  );
};

export default Content;
