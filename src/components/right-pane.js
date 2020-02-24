import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addNewOption ,editQuestion, removeOption} from '../actions/index';
import uuid from 'uuid4';

class RightPane extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      imageURL: "",
       removeMode: false
    }
    this.addOption = this.addOption.bind(this);
    this.toggleRemoveMode = this.toggleRemoveMode.bind(this);
    
  }
   _handleChangeEvent(val) {
        return val;
      }
       
  addOption(){
    var maxOptions = this.props.data.currentquestion.options.length + 1;
    var data = {
      id: uuid(),
      Option: "<label className='form-label'>Option 1" + (maxOptions++) + "</label><input className='form-control' type='text' />"
    };
    this.props.addNewOption(data);
  }
  removeOption(id){
    this.props.removeOption(id);
  }
  toggleRemoveMode(){
    this.setState({
      removeMode: !this.state.removeMode
    })
  }
  fileInputHandler(e){
    var file = e.target.files[0];
    var reader = new FileReader();
    var url = reader.readAsDataURL(file);
    reader.onloadend = function (e) {
        this.setState({ imageURL: [reader.result] })
    }.bind(this);
    console.log(url)
  }

  render(){
    if (!this.props.data.currentquestion) {
      return (
        <div className="right-pane">
          <div className="container">
            <div className="page-title">
              <h2>Please choose a question to design</h2>
            </div>
          </div>
        </div>
      )
    }
    return(
      <div className="right-pane">
        <div className="container">
          <div className="page-title">
            <h2>Design Question</h2>
          </div>
          <div className="edit-question">
            <div className="form-group">
              <label className="form-label">Question</label>
              <input className="form-control" type="text" defaultValue={this.props.data.currentquestion.question}
              onChange={()=>{this._handleChangeEvent(this.state.data);}} 
               />
                        
            </div>
            <div className="form-group">
              <label className="form-label">Image</label>
              <div className="custom-file-input-wrapper">
                <input className="custom-file-input" type="file" id="image" onChange={this.fileInputHandler.bind(this)}/>
                <label htmlFor="image">
                  <i className="material-icons"></i> Add Image
                </label>
                <img className="image-preview" src={this.state.imageURL} />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Option 1</label>
              <input className="form-control" type="text" defaultValue={this.props.data.currentquestion.options ? this.props.data.currentquestion.options.a : "No option"}
              onChange={()=>{this._handleChangeEvent(this.state.data);}} />
               <a href="#" className="remove-question" onClick={this.removeOption.bind(this, this.state.id)} title="Remove this question">
            <i className="material-icons">close</i>
          </a>
            </div>
            <div className="form-group">
              <label className="form-label">Option 2</label>
              <input className="form-control" type="text" defaultValue={this.props.data.currentquestion.options ? this.props.data.currentquestion.options.b : "No option"}  onChange={()=>{this._handleChangeEvent(this.state.data);}} />
            </div>
            <div className="form-group">
              <label className="form-label">Option 3</label>
              <input className="form-control" type="text" defaultValue={this.props.data.currentquestion.options ? this.props.data.currentquestion.options.c : "No option"}  onChange={()=>{this._handleChangeEvent(this.state.data);}} />
            </div>
          </div>
          <div className="action-block">
            <button className="button-primary" onClick={this.addOption}><i className="material-icons"></i> ADD </button>
            <button className={this.state.removeMode ? "remove-button-active" : ""} onClick={this.toggleRemoveMode}><i className="material-icons" ></i>{this.state.removeMode ? "DONE" : "DELETE"}</button>
          </div>
        </div>
      </div>
    )
  }
}
function mapStateToProps(state) {
  return {
    data: state
  };
}
function mapDispatchToProps(dispatch) {
  return (
    bindActionCreators({
      editQuestion: editQuestion,
      addNewOption: addNewOption,
      removeOption: removeOption
    }, dispatch)
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(RightPane);