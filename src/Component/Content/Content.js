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
  const [ filter , setFilter] = useState('') ; 
  const [ res , setRes] = useState([])

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
            setRes(response.data.articles) ; 
      });
  }, []);

  let  filterDate = []
  if (res && res.length>0) {
      filterDate = res.filter( list => list.author !== null ).map ( list => list.author)      
      filterDate =  [... new Set(filterDate) ];  
      filterDate.unshift('ALL')   
  }
  console.log('filterDate' , filterDate)

  const SelectHandler = ( event )=>{
      console.log("insied Handler" , event.currentTarget.value);      
      let filter = event.currentTarget.value ;
      let newsList = res.filter(list => list.author === filter) ;
      console.log('res' , res) ; 
      console.log("newsList" , newsList) ; 
      filter==='ALL' ? setNewsList(res) :setNewsList ( newsList) ; 
      setFilter(filter); 
  }

   
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
                  <div                  
                     
                    title={list.description}
                  >
                   {utility.ellipses(list.description)} 
                  </div>
                </a>
              </div>
              <div className="date__details">
                {list.author}                 
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
      { filterDate && 
        <div className="filter__options">
          <select  value={filter} onChange={SelectHandler}>
            { filterDate.map( list => <option  key={list} value={list}> {list}</option>)}
          </select>
        </div>
      }     
      
      {newsList && newsList.length > 0 && displayNews(newsList)}
      {newsList && newsList.length > 0 && <Footer />}
    </div>
  );
};

export default Content;


 