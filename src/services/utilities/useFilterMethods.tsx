export default function useFilterMethods() {
  const searchFilters = (value, newUsers) => {
    let users = newUsers.filter((item: any) =>
      item.username.toLowerCase().includes(value.toLowerCase())
    );
    return users;
  };

  const hobbiesFilters = (value, newUsers) => {
    if (value && value?.length > 0) {
      let users = newUsers.filter((item: any) =>
        item.hobby.includes(value?.toString())
      );
      return users;
    }
    return newUsers;
  };

  const dateFilters = (value, newUsers) => {
    let users = newUsers.filter(
      (item: any) => new Date(item?.date) >= new Date(value)
    );
    return users;
  };

  const emailFilters = (value, newUsers) => {
    let users = newUsers.filter((item: any) =>
      item.email.toLowerCase().includes(value.toLowerCase())
    );
    return users;
  };
  return [searchFilters, hobbiesFilters, dateFilters, emailFilters];
}
