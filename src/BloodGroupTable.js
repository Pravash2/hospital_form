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
    this.handelChangeName = this.handelChangeName.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    axios
      .get(
        `https://find-hospital.herokuapp.com/api/hospitals/5c760542a7d1b00d041d7494`
      )
      .then(res => {
        this.setState({
          bloodbank: res.data.bloodbank,
          hospital: res.data
        });
      });
  }

  state = {
    bloodbank: [],
    select: [],
    select2: [],
    hospital: ""
  };

  selectClick(item) {
    this.setState({
      select: item,
      select2: item
    });
  }

  handelChangeName(event) {
    this.setState({
      select: {
        stock: event.target.value
      }
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    if (this.state.select2._id) {
      console.log(this.state.select);
      console.log(this.state.select2);

      axios
        .put(
          `https://find-hospital.herokuapp.com/api/hospitals/bloodbank/${
            this.state.hospital._id
          }+${this.state.select2._id}`,
          {
            stock: this.state.select.stock,
            blood_group_name: this.state.select2.blood_group_name
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
                  <TableCell align="right">StocK</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.bloodbank.map((item, i) => (
                  <TableRow>
                    <TableCell>{item.blood_group_name}</TableCell>
                    <TableCell align="right">{`${item.stock} Bags`}</TableCell>

                    <IconButton aria-label="Comments" button>
                      <EditIcon onClick={() => this.selectClick(item)} />
                    </IconButton>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
          <form onSubmit={this.handleSubmit}>
            <div style={{ margin: "30px" }}>
              <InputField
                value={this.state.select.blood_group_name}
                variant="outlined"
                onChange={this.handelChangeName}
                InputProps={{
                  readOnly: true
                }}
              />
              <InputField
                value={this.state.select.stock}
                type="number"
                variant="outlined"
                onChange={this.handelChangeName}
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
