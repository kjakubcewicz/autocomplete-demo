// TODO: This constant could be moved to a config file, if there will be more API-related files
const API_ENDPOINTS = {
  USERS: "data/customers.json",
};

export const getCustomersByName = async (query) => {
  const users = await fetch(`${API_ENDPOINTS.USERS}`).then((response) => {
    return response.json().then((data) => {
      const matchedCustomers = data.filter((customer) => {
        const standarizedCustomerName = `${customer.first_name.toLowerCase()} ${customer.last_name.toLowerCase()}`;
        const standarizedQuery = query.trim().toLowerCase();

        return standarizedCustomerName.includes(standarizedQuery);
      });

      return matchedCustomers;
    });
  });

  return users;
};
