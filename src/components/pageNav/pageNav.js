import Pagination from "react-bootstrap/Pagination";

function PageNav(props) {
  return (
    <Pagination className={props.className}>
      <Pagination.Prev
        onClick={props.onPrevClick}
        disabled={props.pageNo === props.minValue}
      />
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((elem) => (
        <Pagination.Item
          key={elem}
          onClick={() => {
            props.onClickSpecificNo(elem);
          }}
        >
          {elem}
        </Pagination.Item>
      ))}
      <Pagination.Item>...</Pagination.Item>
      <Pagination.Item>{props.pageNo}</Pagination.Item>
      <Pagination.Next onClick={props.onNextClick} />
    </Pagination>
  );
}

export default PageNav;
