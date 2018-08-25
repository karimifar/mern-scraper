import React, { Component } from "react"
import "./header.css"
import Axios from 'axios';

class Header extends Component{
    scrape = (e) =>{
        e.preventDefault();
        Axios.get("/scrape").then(res => console.log(res));
        document.location.href = '/articles'
    }
    showSaved = (e) =>{
        e.preventDefault();
        Axios.get("/saved-articles").then(res => console.log(res));
        document.location.href = '/saved-articles'
    }
    render = () => {
        return (
            <div className= "header">
                <div className="home-p main-title">
                    <h1>
                        FastCo/<span id="light">Design</span><br/> Scraper
                    </h1>
                </div>
                <div id="btn-div">
                    <button onClick={this.scrape} id="scrape-btn" className="btn btn-sm">Scrape</button>
                    <button onClick={this.showSaved} className="btn btn-sm">Saved articles</button>
                </div>
            </div>
        )
        
    }
}

export default Header;