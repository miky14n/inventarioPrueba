export const columns = [
    { name: "numserial", uid: "numserial", sortable: true },
    { name: "categoryname", uid: "categoryname", sortable: true },
    { name: "mark", uid: "mark", sortable: true },
    { name: "model", uid: "model", sortable: true },
    { name: "image", uid: "image", sortable: true },
    { name: "bar_code", uid: "bar_code", sortable: true },
    { name: "imei", uid: "imei" },
    { name: "numberport", uid: "numberport" },
    { name: "actions", uid: "actions" },
  ];
  
  export const statusOptions = [
    { name: "Active", uid: "active" },
    { name: "Paused", uid: "paused" },
    { name: "Vacation", uid: "vacation" },
  ];

 
  export const statusColorMapDefault = {
    active: "success",
    paused: "danger",
    vacation: "warning",
  };
  
  export const props = {
    columns: columns,
    statusOptions: statusOptions,
    statusColorMap: statusColorMapDefault,
    selectFind: "model",
  };
  