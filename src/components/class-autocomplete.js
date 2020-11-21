import React from "react";
import { getCustomersByName } from "../api/customers";
import "./class-autocomplete.css";

export class ClassAutocomplete extends React.Component {
  constructor() {
    super();

    this.state = {
      customers: [],
      searchQuery: "",
    };
  }

  async handleChange(event) {
    const query = event.target.value;

    this.setState({ searchQuery: query });

    const customers = await getCustomersByName(query);

    this.setState({
      customers,
    });
  }

  render() {
    const { customers, searchQuery } = this.state;
    console.log("customers: ", customers);

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
        {customers.length > 0 ? (
          <ul>
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
