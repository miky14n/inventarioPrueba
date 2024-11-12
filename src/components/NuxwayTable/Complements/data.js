export const columns = [
  { name: "ID", uid: "id", sortable: true },
  { name: "Model", uid: "model", sortable: true },
  { name: "Brand", uid: "brand", sortable: true },
  { name: "Serial Number", uid: "serial_number", sortable: true },
  { name: "Status", uid: "status", sortable: true },
  { name: "Client", uid: "client", sortable: true },
  { name: "Observations", uid: "observations" },
  { name: "Date", uid: "date", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];

export const statusOptions = [
  { name: "Active", uid: "active" },
  { name: "Paused", uid: "paused" },
  { name: "Vacation", uid: "vacation" },
];
export const data = [
  {
    id: 1,
    model: "Model X",
    brand: "Tesla",
    serial_number: "1234ABC",
    status: "active",
    client: "John Doe",
    observations: "None",
    date: "2024-09-15",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
  },
  {
    id: 2,
    model: "Mustang",
    brand: "Ford",
    serial_number: "5678XYZ",
    status: "paused",
    client: "Jane Smith",
    observations: "In repair",
    date: "2024-08-12",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
  },
  {
    id: 3,
    model: "Civic",
    brand: "Honda",
    serial_number: "9101DEF",
    status: "vacation",
    client: "Carlos Santana",
    observations: "Pending delivery",
    date: "2024-07-10",
    avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
  },
];

export const statusColorMapDefault = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

export const props = {
  columns: columns,
  data: data,
  statusOptions: statusOptions,
  statusColorMap: statusColorMapDefault,
  selectFind: "model",
};
