export const updateItem = (id: string, data: any[], newValues: Partial<any>): any[] => {
  return data.map((item) => {
    if (item.id === id) {
      return {
        ...item,
        ...newValues,
      };
    }
    if (item.children) {
      return {
        ...item,
        children: updateItem(id, item.children, newValues),
      };
    }
    return item;
  });
};
