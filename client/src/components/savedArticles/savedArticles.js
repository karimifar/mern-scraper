import React, { Component } from "react"
import "./savedArticles.css"
import Axios from 'axios';

class ArticleCard extends Component {
    state = {
        articles:[],
        note: {}
    }

    componentDidMount = () =>{
        this.getArticles();
    }

    handleInputNote = (e) =>{
        
        const { value, name } = e.target;
        console.log(e.target.name)
        this.setState({
            note : {
                [name]: value,
            }
        });
    }

    noteclicked = (e) =>{
        let theDiv = e.target.parentNode.parentNode.querySelector('.note-div');
        if (theDiv.className=== "note-div invisible"){
            theDiv.className = "note-div visible"
        }else{
            theDiv.className = "note-div invisible"
        }
        console.log(theDiv)
    }

    noteSubmit = (e) =>{
        e.preventDefault();
        let btn = e.target;
        const id = btn.getAttribute("data")
        const note = {
            body: btn.parentNode.querySelector("#note").value
        };
        console.log(id,note)
        Axios.post("/note/"+id, note)
        .then(
            function(result){
                console.log(result)
            }
        ) 

    }

    getArticles = () =>{
        Axios.get("/saved-articles").then(res =>{
            console.log(res)
            this.setState({articles:res.data})
        } )
    }

    likeArticle = (e) =>{
            const icon = e.target;
            let save= {saved:true};
            
            let id = icon.parentNode.parentNode.getAttribute("data-id")
            console.log(id)
        
            if (icon.className ==="heart far fa-heart"){
                icon.className = "heart fas fa-heart"
                save.saved= true
                console.log(save)
            }else{
                icon.className = "heart far fa-heart"
                save.saved=false;
                console.log(save)
            }
            console.log("THISSSS", save)
            Axios.post("/article/save/"+id, save).then(result =>{
                console.log(result)
            })
            .catch(error => {
                console.log(error.response)
            });
        
    }



    render = () => {
        return (
            this.state.articles.map(article => {
                const note= article.note
                const saved = article.saved
                
                return (
                    <div key={article._id} className="article-card" data-id={article._id}>
                        <p className="title-text">{article.title}</p>
                        <a className="link" href={article.link}><p>[Read Article]</p></a>
        
                        <h2>
                            {note?
                                <i className="note fas fa-sticky-note" onClick={this.noteclicked}></i>:
                                <i className="note far fa-sticky-note" onClick={this.noteclicked}></i>
                            }
                            {saved ?
                                <i className="heart fas fa-heart" onClick={this.likeArticle}></i>: 
                                <i className="heart far fa-heart" onClick={this.likeArticle}></i>
                            }
                            
                        </h2>
                        <div className="note-div invisible">
                            <form>
                                <div className="form-group">
                                    <div className="form-group">
                                        <label>Jot down something</label>
                                        <textarea className="form-control" id="note" rows="3" name="note" disabled={note? true : false} name={article._id} value={ note? note.body: this.state.note[article._id]||"" } onChange= {this.handleInputNote} ></textarea>
                                    </div>
                                    {note?
                                    <div>
                                        <button type="submit" className="btn btn-sm note-edit" data={article._id}>Edit</button>
                                        <button type="submit" className="btn btn-sm note-delete" data={article._id}>Delete note</button>
                                    </div>:
                                    <button type="submit" className="btn btn-sm note-delete" data={article._id} onClick={this.noteSubmit}>Add note</button>
                                    }
                                    
                                </div>
                            </form>
                        </div> 
                    </div>
                )
            })

        )
    
    }
}
export default ArticleCard;