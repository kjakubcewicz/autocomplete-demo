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
      selectedCustomer: null,
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

  handleSelection(value) {
    const selectedCustomer = this.state.customers.find(
      (customer) =>
        customer.id.toString() === value.getAttribute("data-customerid")
    );

    this.setState({
      searchQuery: `${selectedCustomer.first_name} ${selectedCustomer.last_name}`,
      selectedCustomer,
    });
  }

  handleButtonClick(event) {
    event.preventDefault();
    const customer = this.state.selectedCustomer;
    const customerFullName = `${customer.first_name} ${customer.last_name}`;
    const message = `This means that customer ${customerFullName} (ID: ${customer.id}) has been found and properly chosen. Imagine that instead of this alert, you can - for example - proceed to their details page. This needs further implementation.`;

    alert(message);
  }

  render() {
    const { customers, loading, searchQuery, selectedCustomer } = this.state;

    return (
      <div className="class-autocomplete--wrapper">
        {loading && searchQuery.length > 1 ? (
          <p className="class-autocomplete--notification">
            Loading customers...
          </p>
        ) : null}
        {!loading && !!searchQuery && customers.length === 0 ? (
          <p className="class-autocomplete--notification">
            No matching customers found
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
        {customers.length > 0 && !selectedCustomer ? (
          <ul className="class-autocomplete--results-list">
            {customers.map((customer) => (
              <li
                key={customer.id}
                data-customerid={customer.id}
                onClick={(event) => this.handleSelection(event.target)}
              >{`${customer.first_name} ${customer.last_name}`}</li>
            ))}
          </ul>
        ) : null}

        {selectedCustomer ? (
          <button
            className="class-autocomplete--button"
            onClick={(event) => this.handleButtonClick(event)}
          >
            Proceed with {selectedCustomer.first_name}{" "}
            {selectedCustomer.last_name}
          </button>
        ) : null}
      </div>
    );
  }
}
