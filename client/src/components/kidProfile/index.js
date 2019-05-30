import React, { Component } from "react"
import { FormContainer, FormAction, FormTitle, FormLabel, FormButton, Dropdown, OptionForDropdown } from "../form";
import API from "../../utils/API";
import gradeLevel from "../../gradeLevel.json"

class KidProfile extends Component {
    state = {
        disabled: true,
        kidInfo:
            [
                {
                    for: "name",
                    label: "Please Update Child's Name",
                    value: this.props.name,
                },
                {
                    for: "grade",
                    label: "Current Grade kid is in :",
                    value: this.props.grade,
                    options: gradeLevel
                },
                {
                    for: "school",
                    label: "Current School :",
                    value: this.props.school,
                    options: []
                }
            ], 
            kidId: this.props.kidId
    }

    handleInputChange = event => {
        const value = event.target.value;
        const key = event.target.getAttribute("data-id")
        let copy = [...this.state.kidInfo]
        copy[key].value = value
        this.setState({
            kidInfo: copy
        })
    }

    handleEditButtonClick = event => {
        event.preventDefault();
        this.setState({
            disabled: false
        })
    }

    handleUpdateButtonClick = event => {
        event.preventDefault()
        const kidUpdatedData = {
            name: this.state.kidInfo[0].value,
            gradeLevel: this.state.kidInfo[1].value,
            schoolId: this.state.kidInfo[2].value
        }

        console.log("Kid Details ", kidUpdatedData, "ID", this.state.kidId);

        //Updates the kid profile 
        API.updateKidForAParent(kidUpdatedData, this.state.kidId)
            .then(res => {
                console.log("Kid data - upd", res);
                window.location.reload();
            })
            .catch(err => console.log(err));
    }

    handleDeleteInfo = event => {
        event.preventDefault();
        console.log("Delete KID INFO");
        API.deleteKidForAParent(this.state.kidId)
            .then(res => {
                console.log("Kid deleted");
                window.location.reload();
            })
            .catch(err => console.log(err));
    }

    componentDidMount() {
        console.log("Grade", this.props.grade); 
        console.log("Kid ID", this.props.kidId); 
        API.getAllSchools()
            .then(
                res => {
                    let copy = [...this.state.kidInfo]
                    copy[2].options = res.data
                    this.setState({
                        kidInfo: copy
                    })
                }
            )
            .catch(err => console.log(err));
    }

    render() {
        return (
            <div>
                <FormTitle
                    title="View Kid Info"
                />
                <FormAction>
                    {this.state.kidInfo.map((info, i) => {
                        if (info.for === "name") {
                            return (
                                <FormLabel
                                    key={i}
                                    data={i}
                                    for={info.for}
                                    label={info.label}
                                    value={info.value}
                                    disabled={this.state.disabled}
                                    handleChange={this.handleInputChange}
                                />
                            )
                        }
                        else {
                            return (
                                <Dropdown
                                    key={i}
                                    data={i}
                                    for={info.for}
                                    label={info.label}
                                    value={info.value}
                                    disabled={this.state.disabled}
                                    handleChange={this.handleInputChange}
                                >
                                    {info.options.map((item, j) => {
                                        return (
                                            <OptionForDropdown
                                                option={item.name}
                                                value={item.id}
                                                // selected value={kid.schoolId}
                                                key={j}
                                            />
                                        )
                                    })}
                                </Dropdown>
                            )
                        }

                    })}

                    {this.state.disabled ? (
                        <FormButton
                            nameButton="Edit Kid Info"
                            handleButtonClick={this.handleEditButtonClick}
                        />
                    ) :
                        (
                            <div>
                                <FormButton
                                    nameButton="Update Child"
                                    className="btn-success"
                                    handleButtonClick={this.handleUpdateButtonClick}
                                />
                                <FormButton
                                    nameButton="Remove Child"
                                    className="btn-warning"
                                    handleButtonClick={this.handleDeleteInfo}
                                />
                            </div>
                        )}
                </FormAction>
            </div>
        )
    }
}

export default KidProfile;