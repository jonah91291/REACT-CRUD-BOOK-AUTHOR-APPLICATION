import React from 'react';
import axios from "axios";
import { Link } from "react-router-dom";
import toastr from 'toastr';

const Table = (props) => (
    <tr>
        {props.children}
    </tr>
)



//1st construstor will run
class Bookinfotable extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            arrayInfo: [],
            test:''
        };
    }

    //userdefined method
    getData = () => {
        axios
            .get("http://localhost:3000/book")
            .then(response =>
                this.setState({ arrayInfo: response.data })
            )
            .catch(function (error) {
                console.log(error);
            });
    }


    //when you click on delete
    handleDelete = (id) => {

        console.log("deleted", id)
        axios.delete(`http://localhost:3000/book/${id}`)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });

        toastr.success("book removed")
    }

    //2nd step it will come here

    componentWillMount() {
        setInterval(this.getData, 900)
    }

    render() {
        return (
            <div>
                <button type="Button" className="btn btn-primary">
                    <Link to="/" >
                        <span style={{ color: "white" }}>Go Back </span>
                    </Link>
                </button>
                <table className="table table-striped table-dark">
                    <thead>
                        <tr>
                            <th scope="col">BOOK</th>
                            <th scope="col">AUTHOR</th>
                            <th scope="col">DELETE</th>
                            <th scope="col">UPDATE</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.arrayInfo.map(data => {
                                return (<Table key={data.id}>

                                    <td>{data.bookname}</td>

                                    <td>{data.authorname}</td>

                                    <td onClick={() => this.handleDelete(data.id)} >
                                    <span aria-hidden="true">&times;</span>
                                    </td>

<td>
    <Link to={{ pathname: '/', state: { id: data.id,bookname: data.bookname,authorname: data.authorname }}} >
        <span className="glyphicon glyphicon-print">
        edit
        </span>
    </Link>
</td>
                                </Table>)
                            })
                        }
                    </tbody>
                </table>
            </div>
        );
    }



}
export default Bookinfotable;