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
    this.handelChangeExperience = this.handelChangeExperience.bind(this);
    this.handelChangeEducation = this.handelChangeEducation.bind(this);
    this.handelChangeSpecialties = this.handelChangeSpecialties.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    axios
      .get(
        `https://find-hospital.herokuapp.com/api/hospitals/${
          this.props.match.params.id
        }`
      )
      .then(res => {
        this.setState({
          doctor: res.data.doctors,
          hospital: res.data
        });
      });
  }

  state = {
    doctor: [],
    select: {
      name: "Doctor Name",
      experience: 0,
      eduction: "Education",
      specialties: "Specialties"
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
        `https://find-hospital.herokuapp.com/api/hospitals/doctors/${
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
        experience: this.state.select.experience,
        eduction: this.state.select.eduction,
        specialties: this.state.select.specialties
      }
    });
  }
  handelChangeExperience(event) {
    this.setState({
      select: {
        name: this.state.select.name,
        experience: event.target.value,
        eduction: this.state.select.eduction,
        specialties: this.state.select.specialties
      }
    });
  }
  handelChangeEducation(event) {
    this.setState({
      select: {
        name: this.state.select.name,
        experience: this.state.select.experience,
        eduction: event.target.value,
        specialties: this.state.select.specialties
      }
    });
  }
  handelChangeSpecialties(event) {
    this.setState({
      select: {
        name: this.state.select.name,
        experience: this.state.select.experience,
        eduction: this.state.select.eduction,
        specialties: event.target.value
      }
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.select2._id) {
      axios
        .put(
          `https://find-hospital.herokuapp.com/api/hospitals/doctors/${
            this.state.hospital._id
          }+${this.state.select._id}`,
          {
            name: this.state.select.name,
            experience: this.state.select.experience,
            eduction: this.state.select.eduction,
            specialties: this.state.select.specialties
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
      axios
        .post(
          `https://find-hospital.herokuapp.com/api/hospitals/${
            this.state.hospital._id
          }/doctors`,
          {
            name: this.state.select.name,
            experience: this.state.select.experience,
            eduction: this.state.select.eduction,
            specialties: this.state.select.specialties
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
                  <TableCell align="right">Experience</TableCell>
                  <TableCell align="right">Eduction</TableCell>
                  <TableCell align="right">Specialties</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.doctor.map((item, i) => (
                  <TableRow>
                    <TableCell>{item.name}</TableCell>
                    <TableCell align="right">{item.experience}</TableCell>
                    <TableCell align="right">{item.eduction}</TableCell>
                    <TableCell align="right">{item.specialties}</TableCell>
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
                value={this.state.select.experience}
                type="number"
                variant="outlined"
                onChange={this.handelChangeExperience}
              />
              <InputField
                value={this.state.select.eduction}
                variant="outlined"
                onChange={this.handelChangeEducation}
              />
              <InputField
                value={this.state.select.specialties}
                variant="outlined"
                onChange={this.handelChangeSpecialties}
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
