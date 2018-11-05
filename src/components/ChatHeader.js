import React, { Component } from 'react'

export default class ChatHeader extends Component {
  state= {
    messageList: this.props.messageList,
  }
  componentDidUpdate = (prevProps, prevState) => {
    document.getElementById("intoView").scrollIntoView();
    let total = document.querySelectorAll(".searchResult").length;
    document.querySelector(".numberOfCoincidences").innerHTML = total;
  }
  componentDidMount = () => {
    this.setState({ messageList: this.props.messageList });
  }
  
  handleCloseButton = () => {
    this.deleteResultClasses();
    document.querySelector(".search-form .results").style.display = "none";
    document.querySelector(".search-form input").value = "";
    document.getElementById("intoView").scrollIntoView({ behavior: "smooth" });
  };

  deleteResultClasses = () => {
    let results = document.querySelectorAll(".searchResult");
    results.forEach(result => {
      if (result.getAttribute("class").indexOf("searchResult") !== -1) {
        result.classList.remove("searchResult");
      }
      if (result.getAttribute("class").indexOf("currentResult") !== -1) {
        result.classList.remove("currentResult");
      }
    });
  };

  render() {
    return (
      <div className="name">
        <strong>
          {this.props.interlocutor.userName
            ? this.props.interlocutor.userName
            : this.props.interlocutor.email}
        </strong>
        <div className="quote">
          <small>{this.props.interlocutor.quote}</small>
        </div>
        <form className="search-form" onSubmit={this.props.handleSearchForm}>
          <input type="text" />
          <button type="submit">
            <i className="fas fa-search" />
          </button>
          <div className="results">
            <button
              type="button"
              className="close-button"
              onClick={this.handleCloseButton}
            >
              <i className="far fa-window-close" />
            </button>
            <span className="numCoincidence" />
            <span className="textCoincidence"> of </span>
            <span className="numberOfCoincidences" />
            <span className="controller">
              <button type="button" onClick={this.props.handleSearchUp}>
                <i className="fas fa-sort-up" />
              </button>
              <button type="button" onClick={this.props.handleSearchDown}>
                <i className="fas fa-sort-down" />
              </button>
            </span>
          </div>
        </form>
      </div>
    )
  }
}
