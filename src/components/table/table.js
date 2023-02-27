import Table from "react-bootstrap/Table";

function BasicTable({ tableHead = [], data, onRowClick }) {
  const renderCell = (dataObj, dataDescription) => {
    if (dataDescription.type === "img") {
      return (
        <img
          src={dataObj[dataDescription.key]}
          alt={""}
          style={{ width: 60 }}
        />
      );
    } else if (dataDescription.type === "text") {
      return dataObj[dataDescription.key];
    } else if (dataDescription.type === "number") {
      return (
        <input type="number" defaultValue={dataObj[dataDescription.key]} />
      );
    }
  };

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          {tableHead.map((colObj) => (
            <th key={colObj.name}>{colObj.name}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((obj) => (
          <tr key={obj.name} onClick={() => onRowClick(obj.id)}>
            {tableHead.map((colObj) => (
              <td key={colObj.key}>{renderCell(obj, colObj)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default BasicTable;
