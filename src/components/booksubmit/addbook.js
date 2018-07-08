import React from 'react';
import axios from "axios";
import { Link } from "react-router-dom";
class Addbook extends React.Component {
    constructor(props) {
        super(props);
        //1st fields will be empty anf will be updated by update method from 
        this.state = {
            bookname: "",
            authorname: "",
                   };
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

        this.setState({ [event.target.name]: event.target.value })
    }

    componentWillMount() {
        if ( this.props.location.state) 
        {
            const { bookname, authorname } = this.props.location.state
            this.setState({
                bookname,
                authorname 
            })
        }
    }

    render() {
        // console.log(this.props.location, "link")
        return (
            <div className="body">
                <form>
                    <div className="form-group">
                        <label >ENTER BOOK NAME</label>
                        <input type="text" className="form-control" placeholder="BOOK" name="bookname" value={this.state.bookname} onChange={this.update} />
                        {/* value is assigned to the name in the input field and its state is changed */}

                    </div>
                    <div className="form-group">
                        <label >ENTER AUTHOR NAME</label>
                        <input type="text" className="form-control" placeholder="AUTHOR" name="authorname" value={this.state.authorname} onChange={this.update} />
                        {/* value is assigned to the name in the input field and its state is changed */}
                    </div>
                    <label >CLICK ON BUTTON TO ADD THE BOOK DETAILS</label>
                    <button type="Button" className="btn btn-primary" onClick={this.handleSubmit} >
                        <Link to="/books">
                            <span style={{ color: "white" }}>   Enter Info </span>
                        </Link>
                    </button>
                </form>
            </div>
        );
    }
}

export default Addbook;