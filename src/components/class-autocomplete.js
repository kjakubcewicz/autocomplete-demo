import React from "react";
import { getCustomersByName } from "../api/customers";
import "./class-autocomplete.css";

export class ClassAutocomplete extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      customers: [],
      searchQuery: "",
    };
  }

  async handleChange(event) {
    const query = event.target.value;

    this.setState({ loading: true, searchQuery: query });

    const customers = await getCustomersByName(query);

    this.setState({
      loading: false,
      customers,
    });
  }

  render() {
    const { customers, loading, searchQuery } = this.state;

    return (
      <div className="class-autocomplete--wrapper">
        {loading && searchQuery.length > 1 ? (
          <p className="class-autocomplete--loading-indicator">
            Loading customers...
          </p>
        ) : null}

        <label
          className="class-autocomplete--label"
          htmlFor="customer-class-autocomplete"
        >
          Search customers by name
        </label>
        <input
          id="customer-class-autocomplete"
          className="class-autocomplete--input"
          placeholder="Search customers"
          onChange={(event) => this.handleChange(event)}
          value={searchQuery}
        />
        {customers.length > 0 ? (
          <ul className="class-autocomplete--results-list">
            {customers.map((customer) => (
              <li
                key={customer.id}
              >{`${customer.first_name} ${customer.last_name}`}</li>
            ))}
          </ul>
        ) : null}
      </div>
    );
  }
}
