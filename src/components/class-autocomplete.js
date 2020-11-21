import React from "react";
import { getCustomersByName } from "../api/customers";
import "./class-autocomplete.css";

export class ClassAutocomplete extends React.Component {
  constructor() {
    super();

    this.state = {
      searchQuery: "",
    };
  }

  async handleChange(event) {
    const query = event.target.value;

    this.setState({ searchQuery: query });

    const customers = await getCustomersByName(query);
  }

  render() {
    const { searchQuery } = this.state;

    return (
      <div className="class-autocomplete--wrapper">
        <label htmlFor="customer-class-autocomplete">
          Search customers by name
        </label>
        <input
          id="customer-class-autocomplete"
          placeholder="Search customers"
          onChange={(event) => this.handleChange(event)}
          value={searchQuery}
        />
      </div>
    );
  }
}