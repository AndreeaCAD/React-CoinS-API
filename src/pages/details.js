import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BasicTable from "../components/table/table";
import { getCoinDetails } from "../services/api";

const Details = () => {
  // const [params] = useSearchParams();
  // const id = params.get("id");
  // console.log(id); asta  folosita la rutarea clasica care a fost comentata in cealalta pagina
  //doar ca trebuie folosit sus useSearchParams care e un hook

  //mai jos am folosit ruta dinamica
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const params = useParams();
  console.log(params); // {id: coinId}  asa arata in consola params

  const tableHead = [
    {
      name: "Name",
      key: "name",
      type: "img",
    },
    {
      name: "Symbol",
      key: "symbol",
      type: "text",
    },
    {
      name: "Hashing Algorytm",
      key: "hashingAlgorythm",
      type: "text",
    },
    {
      name: "Description",
      key: "description",
      type: "text",
    },
    {
      name: "Market Cap Eur",
      key: "marketCapEur",
      type: "text",
    },
    {
      name: "Genesis Date",
      key: "genesisDate",
      type: "text",
    },
  ];

  useEffect(() => {
    setLoading(true);
    getCoinDetails(params.id)
      .then((res) => {
        const obj = {
          name: res.data.name,
          symbol: res.data.symbol,
          hashingAlgorythm: res.data.hashingAlgorythm,
          description: res.data.description.en,
          marketCapEur: res.data.market_data.market_cap.eur,
          homePage: res.data.links.homepage,
          genesisDate: res.data.genesis_date,
          image: res.data.image.small,
        };
        setData(obj);
        setLoading(false);
      })
      .catch((error) => console.log(error));
    setLoading(false);
  }, []);

  // console.log(data);

  return (
    <div className="m-4">
      {/* {loading ? (
        <p>...loading, please wait!</p>
      ) : (
        <img src={data?.image?.large} alt="..." />
      )} */}
      <div className="d-flex align-itmes-center gap-2">
        <img src={data?.image} alt=" " />
        <h1 className="m-0">{data?.name}</h1>
      </div>
      <div>
        <iframe
          sandbox=""
          srcDoc={data?.description}
          style={{ width: "100%", minHeight: "15rem" }}
        ></iframe>
        {/* <p dangerouslySetInnerHTML={{ __html: data?.description }}></p>{" "} */}
        {/* pentru a pune un text in care avem taguri de html */}
      </div>

      <div className="mt-3">
        {data && <BasicTable tableHead={tableHead} data={[data]} />}
      </div>
      <div>
        {data &&
          data.homePage.map(
            (link) =>
              link && (
                <li>
                  <a href={link} target="_blank">
                    {link}
                  </a>
                </li>
              )
          )}
      </div>
    </div>
  );
};

export default Details;
