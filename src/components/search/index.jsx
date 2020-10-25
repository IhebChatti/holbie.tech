import _ from "lodash";
import React, { Component } from "react";
import { Search, Grid, Header, Segment } from "semantic-ui-react";

const initialState = { isLoading: false, results: [], value: "" };

export default class SearchExampleStandard extends Component {
  state = initialState;

  handleResultSelect = (e, { result }) =>
    this.setState({ value: result.first_name });
  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value });

    setTimeout(() => {
      if (this.state.value.length < 1) return this.setState(initialState);

      const re = new RegExp(_.escapeRegExp(this.state.value), "i");
      const isMatch = (result) => re.test(result.first_name);

      this.setState({
        isLoading: false,
        results: _.filter(this.props.source, isMatch),
      });
    }, 300);
  };

  render() {
    const { isLoading, value, results } = this.state;

    return (
      <Search
        input={{ icon: "search", iconPosition: "left" }}
        loading={isLoading}
        onResultSelect={this.handleResultSelect}
        onSearchChange={_.debounce(this.handleSearchChange, 500, {
          leading: true,
        })}
        results={results}
        value={value}
      />
    );
  }
}
