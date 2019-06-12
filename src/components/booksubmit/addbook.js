import React from 'react';
import axios from "axios";
import { Link } from "react-router-dom";
import _ from 'lodash';
import  './addbook.css';

class Addbook extends React.Component {
    constructor(props) {
        super(props);
        //1st fields will be empty and will be updated by update method from 
        this.state = {
            bookname: "",
            authorname: "",
            button:true,
            form:false,
            noColor:"form-control",
            noColor1:"form-control"
            };
    }

    //as CONSTRUCTOR is the 1st method to run, ComponentntWillMount will be the 2nd

    ComponentntWillMount() {
        if ( this.props.location.state) 
        {
            const { bookname, authorname } = this.props.location.state
            this.setState({
                bookname,
                authorname
            })
        }
        this.showForm ();
    }

    //when the button is clicked the data will be taken into handlesubmit  button to post it into the server 
    //which is userdefined method
    handleSubmit = (event) => {
        const { bookname, authorname } = this.state;
        if (this.props.location && this.props.location.state) {

            axios.put(`http://localhost:3000/book/${this.props.location.state.id}`,
                {
                    bookname,
                    authorname
                })
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
        else {

            axios.post("http://localhost:3000/book",
                {
                    bookname,
                    authorname
                })
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });

        }


    }
    //2nd step from data will get updated from inputform to update method and the state is changed
        update = (event) => {
            const regularExpression_1= /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
            const regularExpression_2= /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
            const valid1 = regularExpression_1.test(event.target.value);
            const valid2 = regularExpression_2.test(event.target.value);

                if(event.target.name ==="bookname"){
              if(!valid1)
                    {
                    this.setState({ noColor : "form-control is-invalid"})
                    } 
                    else{
                    this.setState({ noColor : "form-control is-valid"})
                    }
                }
                if(event.target.name ==="authorname"){

                if(!valid2)
                    {
                    this.setState({ noColor1 : "form-control is-invalid"})
                    } 
                    else{
                    this.setState({ noColor1 : "form-control is-valid"})
                    }
                }
                    this.setState({ [event.target.name]:event.target.value });
            
        }
      
        
    //Inorder to show form 
        showForm=()=>{
            this.setState({ button:false, form:true })  
            console.log(this.state.button, this.state.form ,"in form ///////////")
        }
   

    render() {
        const button=(<div>
                        <button type="Button" className="btn btn-primary"  onClick={this.showForm} >
                            Click to Enter
                        </button>
                     </div>)

        const form=(<div>
            <form className="formClass">
                <div className="form-group">
                    <label for="validationServer03">ENTER BOOK NAME</label>
                    <input 
                    type="text"
                    className={this.state.noColor}            
                    placeholder="BOOK"
                    name="bookname" 
                    value={this.state.bookname} 
                    onChange={this.update.bind(this)}
                    required
                    id="validationServer03"
                    />
                    {this.state.noColor === "form-control is-invalid" ?
                    (<div class="in-valid-feedback">
                        <b>Your input should be 8 characters in length and 
                        it should contain alphabet,numerics and atleast 1 special character.
                   </b></div>) : (<div><i>*Please enter this mandatory field</i></div>)}
                    {/* value is assigned to the name in the input field and its state is changed */}
                </div>

                <div className="form-group">
                    <label for="validationServer04">ENTER AUTHOR NAME</label>
                    <input 
                    type="text"
                    className={this.state.noColor1}
                    placeholder="AUTHOR" 
                     name="authorname" 
                    value={this.state.authorname} 
                    onChange={this.update.bind(this)}                    
                    required
                    id="validationServer04"
                    />
                    {this.state.noColor1 === "form-control is-invalid" ?
                    (<div class="in-valid-feedback">
                        <b>Your text should contain only numerics and should only be 8 characters long.
                        </b></div>): (<div><i>*Please enter this mandatory field</i></div>)}
                    {/* value is assigned to the name in the input field and its state is changed */}
                </div>

                <label >CLICK ON BUTTON TO ADD THE BOOK DETAILS</label>
                <br/>
                 {this.state.noColor  === "form-control is-valid" && this.state.noColor1 === "form-control is-valid" ? 
                (<button 
                type="Button" 
                className="btn btn-primary" 
                onClick={this.handleSubmit} 
                >
                                <Link to="/books">
                                    <span style={{ color: "white" }}> Enter Info </span>
                                </Link>
                </button>):(false)}
                 
                    
            </form>

        </div>);
        
        return (
            <div className="body">
            {this.state.button? (button):(form)}
            </div>
            );
    }
}

export default Addbook;
//for testing GIT 1