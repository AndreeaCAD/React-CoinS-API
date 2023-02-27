import { useEffect, useState } from "react";
import { getCoinsMarkets } from "../services/api";
import BasicTable from "../components/table/table";
import PageNav from "../components/pageNav/pageNav";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const storedPageStr = localStorage.getItem("page"); // la fel se face si pt session storage si e retinut doar pe sesiune, daca inchidem pagina si o deschidem o ia de la 1
  const storedData = storedPageStr ? Number(storedPageStr) : 1; //daca storedPageStr nu exista intoarce 1, daca exista ne duce acolo

  const [coins, setCoins] = useState([]);
  const [page, setPage] = useState(storedData); //inainte de storedData aici a fost 1 :)
  const navigate = useNavigate();

  const tableHead = [
    {
      name: "Image",
      key: "image",
      type: "img",
    },
    {
      name: "Name",
      key: "name",
      type: "text",
    },
    {
      name: "Symbol",
      key: "symbol",
      type: "text",
    },
    {
      name: "Current Price",
      key: "currentPrice",
      type: "text",
    },
    {
      name: "High 24 hour Price",
      key: "highPrice",
      type: "text",
    },
    {
      name: "Low 24 hour Price",
      key: "lowPrice",
      type: "text",
    },

    //id ul nu ne trebuie l-am scris doar pt a arata cum putem adauga alte fielduri in cazul in care ne cerea ID-ul in tabel
    // {
    //   name: "ID",
    //   key: "id",
    //   type: "text",
    // },
  ];

  useEffect(() => {
    localStorage.setItem("page", page);
    getCoinsMarkets({
      vs_currency: "EUR",
      order: "market_cap_desc",
      page: page,
      per_page: 10,
    })
      .then((res) => {
        const list = res.data.map((coin) => {
          return {
            id: coin.id, //l-am adaugat aici pentru ca ne trebuie pt pagina de details, insa el nu trebuie afisat in tabel
            image: coin.image,
            name: coin.name,
            symbol: coin.symbol,
            currentPrice: coin.current_price,
            highPrice: coin.high_24h,
            lowPrice: coin.low_24h,
          };
        });
        setCoins(list);
      })
      .catch((error) => console.log(error));
  }, [page]);

  const handlePrevPage = () => {
    setPage((state) => {
      const newPage = state - 1;
      localStorage.setItem("page", String(newPage));
      return newPage;
    });
  };

  const handleNextPage = () => {
    setPage((state) => {
      const newPage = state + 1;
      localStorage.setItem("page", String(newPage));
      return newPage;
    });
  };

  const handleSetPage = (no) => {
    setPage(no);
  };

  const handleRedirectToDetails = (coinId) => {
    // console.log(coinId);
    // navigate(`/details?id=${coinId}`); o varianta iar alta e mai jos
    navigate(`/details/${coinId}`); //rutare dinamica mai folosita
  };

  return (
    <div className="m-3">
      <BasicTable
        tableHead={tableHead}
        data={coins}
        onRowClick={handleRedirectToDetails}
      />
      <PageNav
        className="d-flex justify-content-center"
        pageNo={page}
        onNextClick={handleNextPage}
        onPrevClick={handlePrevPage}
        onClickSpecificNo={handleSetPage}
        minValue={1}
      />
    </div>
  );
};

export default Home;
