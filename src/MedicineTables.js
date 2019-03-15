import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Paper, IconButton, Button } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import InputField from "@material-ui/core/TextField";
import DeleteIcon from "@material-ui/icons/Delete";
import { withRouter } from "react-router-dom";

import axios from "axios";

class EditForm extends React.Component {
  constructor(props) {
    super(props);
    // this.selectClick = this.selectClick.bind(this);
    this.handelChangeName = this.handelChangeName.bind(this);
    this.handelChangequantity = this.handelChangequantity.bind(this);
    this.handelChangeAmount = this.handelChangeAmount.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    axios
      .get(
        `https://find-hospital.herokuapp.com/api/hospitals/${
          this.props.match.params.id
        }`
      )
      .then(res => {
        this.setState({
          medicine: res.data.medicines,
          hospital: res.data
        });
      });
  }

  state = {
    doctor: [],
    select: {
      name: "Medicine Name",
      quantity: 0,
      amount: 0
    },
    select2: [],
    hospital: ""
  };

  selectClick(item) {
    this.setState({
      select: item,
      select2: item
    });
  }
  deleteValue(item) {
    console.log(item._id);

    axios
      .delete(
        `https://find-hospital.herokuapp.com/api/hospitals/medicine/${
          this.state.hospital._id
        }+${item._id}`
      )
      .then(function(response) {
        console.log(response.data);
      })
      .catch(function(error) {
        console.log(error);
        alert(
          "Sorry! Server is not able to process this request at the moment."
        );
      });
    window.location.reload();
  }

  handelChangeName(event) {
    this.setState({
      select: {
        name: event.target.value,
        quantity: this.state.select.quantity,
        amount: this.state.select.amount
      }
    });
  }
  handelChangequantity(event) {
    this.setState({
      select: {
        name: this.state.select.name,
        quantity: event.target.value,
        amount: this.state.select.amount
      }
    });
  }
  handelChangeAmount(event) {
    this.setState({
      select: {
        name: this.state.select.name,
        quantity: this.state.select.quantity,
        amount: event.target.value
      }
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    if (this.state.select2._id) {
      console.log(this.state.select);
      console.log(this.state.select2);
      console.log(this.state.hospital);
      axios
        .put(
          `https://find-hospital.herokuapp.com/api/hospitals/medicine/${
            this.state.hospital._id
          }+${this.state.select2._id}`,
          {
            name: this.state.select.name,
            quantity: this.state.select.quantity,
            amount: this.state.select.amount
          }
        )
        .then(function(response) {
          console.log(response.data);
        })
        .catch(function(error) {
          console.log(error);
          alert(
            "Sorry! Server is not able to process this request at the moment."
          );
        });
    } else {
      console.log(this.state.select);
      axios
        .post(
          `https://find-hospital.herokuapp.com/api/hospitals/${
            this.state.hospital._id
          }/medicine`,
          {
            name: this.state.select.name,
            quantity: this.state.select.quantity,
            amount: this.state.select.amount
          }
        )
        .then(function(response) {
          console.log(response.data);
        })
        .catch(function(error) {
          console.log(error);
          alert(
            "Sorry! Server is not able to process this request at the moment."
          );
        });
    }
    this.props.history.push("/");
  }

  render(props) {
    if (this.state.hospital.length != 0)
      return (
        <div>
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align="right">quantity</TableCell>
                  <TableCell align="right">Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.medicine.map((item, i) => (
                  <TableRow>
                    <TableCell>{item.name}</TableCell>
                    <TableCell align="right">{item.quantity}</TableCell>
                    <TableCell align="right">{item.amount}</TableCell>

                    <IconButton aria-label="Comments" button>
                      <EditIcon onClick={() => this.selectClick(item)} />
                    </IconButton>
                    <IconButton
                      aria-label="Comments"
                      button
                      onClick={() => this.deleteValue(item)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
          <form onSubmit={this.handleSubmit}>
            <div style={{ margin: "30px" }}>
              <InputField
                value={this.state.select.name}
                variant="outlined"
                onChange={this.handelChangeName}
              />
              <InputField
                value={this.state.select.quantity}
                type="number"
                variant="outlined"
                onChange={this.handelChangequantity}
              />
              <InputField
                value={this.state.select.amount}
                variant="outlined"
                type="number"
                onChange={this.handelChangeAmount}
              />

              {
                <Button
                  style={{ margin: "auto", width: "210px" }}
                  color="primary"
                  variant="outlined"
                  type="submit"
                >
                  Edit/Create
                </Button>
              }
            </div>
          </form>
        </div>
      );
    return <div>Loading</div>;
  }
}

export default withRouter(EditForm);
